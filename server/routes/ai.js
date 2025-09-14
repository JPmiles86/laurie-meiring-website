import express from 'express';
import { db } from '../../src/lib/db.js';
import { encrypt, decrypt } from '../../src/lib/encryption.js';
import { authenticateToken } from '../middleware/auth.js';
import crypto from 'crypto';

const router = express.Router();

// OpenAI configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

// Middleware to ensure authentication
router.use(authenticateToken);

// Generate blog post
router.post('/generate', async (req, res) => {
  try {
    const { topic, tone, length, provider, styleBible } = req.body;
    
    if (!topic || !provider) {
      return res.status(400).json({
        success: false,
        message: 'Topic and provider are required'
      });
    }

    // Get API key from database
    const api_keysRecord = await db.api_keys.findFirst({
      where: {
        userId: req.userId,
        provider: provider,
        isActive: true
      }
    });

    if (!api_keysRecord) {
      return res.status(400).json({
        success: false,
        message: `No active API key found for ${provider}`
      });
    }

    const api_keys = decrypt(api_keysRecord.encryptedKey);

    // Get prompt template
    const prompt = createBlogPrompt(topic, tone, length, styleBible);
    
    let result;
    if (provider === 'openai') {
      result = await generateWithOpenAI(api_keys, prompt);
    } else if (provider === 'anthropic') {
      result = await generateWithAnthropic(api_keys, prompt);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid AI provider'
      });
    }

    // Track usage
    await trackUsage(req.userId, provider, 'blog_generation', result.tokensUsed || 0);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate blog post'
    });
  }
});

// Generate title suggestions
router.post('/titles', async (req, res) => {
  try {
    const { topic, content, provider, count = 5 } = req.body;
    
    // Get API key from database
    const api_keysRecord = await db.api_keys.findFirst({
      where: {
        userId: req.userId,
        provider: provider,
        isActive: true
      }
    });

    if (!api_keysRecord) {
      return res.status(400).json({
        success: false,
        message: `No active API key found for ${provider}`
      });
    }

    const api_keys = decrypt(api_keysRecord.encryptedKey);
    
    const prompt = `Generate ${count} engaging blog post titles for the following topic: ${topic}
    ${content ? `\nContent preview: ${content.substring(0, 500)}...` : ''}
    
    Return as a JSON array of strings.`;

    let result;
    if (provider === 'openai') {
      result = await generateWithOpenAI(api_keys, prompt, 0.8);
    } else if (provider === 'anthropic') {
      result = await generateWithAnthropic(api_keys, prompt, 0.8);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid AI provider'
      });
    }

    await trackUsage(req.userId, provider, 'title_generation', result.tokensUsed || 0);

    res.json({
      success: true,
      titles: result.titles || [],
      tokensUsed: result.tokensUsed
    });
  } catch (error) {
    console.error('Title generation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate titles'
    });
  }
});

// Generate social media variations
router.post('/social', async (req, res) => {
  try {
    const { blogContent, blogTitle, platform, provider } = req.body;
    
    if (!blogContent || !platform || !provider) {
      return res.status(400).json({
        success: false,
        message: 'Blog content, platform, and provider are required'
      });
    }

    // Get API key from database
    const api_keysRecord = await db.api_keys.findFirst({
      where: {
        userId: req.userId,
        provider: provider,
        isActive: true
      }
    });

    if (!api_keysRecord) {
      return res.status(400).json({
        success: false,
        message: `No active API key found for ${provider}`
      });
    }

    const api_keys = decrypt(api_keysRecord.encryptedKey);

    const prompt = createSocialMediaPrompt(blogContent, blogTitle, platform);
    
    let result;
    if (provider === 'openai') {
      result = await generateWithOpenAI(api_keys, prompt);
    } else if (provider === 'anthropic') {
      result = await generateWithAnthropic(api_keys, prompt);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid AI provider'
      });
    }

    await trackUsage(req.userId, provider, 'social_adaptation', result.tokensUsed || 0);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Social media generation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate social media content'
    });
  }
});

// Save API key (encrypted)
router.post('/keys', async (req, res) => {
  try {
    const { provider, api_keys, name } = req.body;
    
    if (!provider || !api_keys || !name) {
      return res.status(400).json({
        success: false,
        message: 'Provider, API key, and name are required'
      });
    }

    // Encrypt the API key
    const encryptedKey = encrypt(api_keys);
    
    // Save to database
    const savedKey = await db.api_keys.create({
      data: {
        userId: req.userId,
        provider,
        encryptedKey,
        name,
        keyHash: crypto.createHash('sha256').update(api_keys).digest('hex')
      }
    });

    res.json({
      success: true,
      key: {
        id: savedKey.id,
        provider: savedKey.provider,
        name: savedKey.name,
        createdAt: savedKey.createdAt
      }
    });
  } catch (error) {
    console.error('Save API key error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to save API key'
    });
  }
});

// Get API keys (masked)
router.get('/keys', async (req, res) => {
  try {
    const keys = await db.api_keys.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });

    // Get usage stats
    const stats = await db.aiUsage.aggregate({
      where: { userId: req.userId },
      _sum: {
        tokensUsed: true
      },
      _count: {
        id: true
      }
    });

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const monthlyStats = await db.aiUsage.aggregate({
      where: {
        userId: req.userId,
        createdAt: { gte: monthStart }
      },
      _sum: {
        tokensUsed: true
      },
      _count: {
        id: true
      }
    });

    // Decrypt keys and mask them
    const maskedKeys = await Promise.all(keys.map(async (key) => {
      try {
        const decryptedKey = decrypt(key.encryptedKey);
        const usage = await db.aiUsage.aggregate({
          where: {
            userId: req.userId,
            provider: key.provider
          },
          _sum: {
            tokensUsed: true
          },
          _count: {
            id: true
          }
        });

        const lastUsed = await db.aiUsage.findFirst({
          where: {
            userId: req.userId,
            provider: key.provider
          },
          orderBy: { createdAt: 'desc' },
          select: { createdAt: true }
        });

        return {
          id: key.id,
          provider: key.provider,
          name: key.name,
          key: decryptedKey, // Will be masked on frontend
          createdAt: key.createdAt,
          usage: {
            requests: usage._count.id,
            tokens: usage._sum.tokensUsed || 0,
            lastUsed: lastUsed?.createdAt
          }
        };
      } catch (err) {
        console.error('Error processing key:', err);
        return null;
      }
    }));

    res.json({
      success: true,
      keys: maskedKeys.filter(Boolean),
      stats: {
        totalUsage: {
          requests: stats._count.id,
          tokens: stats._sum.tokensUsed || 0
        },
        monthlyUsage: {
          requests: monthlyStats._count.id,
          tokens: monthlyStats._sum.tokensUsed || 0
        },
        estimatedCost: calculateEstimatedCost(stats._sum.tokensUsed || 0)
      }
    });
  } catch (error) {
    console.error('Get API keys error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch API keys'
    });
  }
});

// Delete API key
router.delete('/keys/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verify ownership
    const key = await db.api_keys.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!key) {
      return res.status(404).json({
        success: false,
        message: 'API key not found'
      });
    }

    await db.api_keys.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'API key deleted successfully'
    });
  } catch (error) {
    console.error('Delete API key error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete API key'
    });
  }
});

// Validate API key
router.post('/validate-key', async (req, res) => {
  try {
    const { provider, api_keys } = req.body;
    
    if (!provider || !api_keys) {
      return res.status(400).json({
        success: false,
        message: 'Provider and API key are required'
      });
    }

    let isValid = false;
    
    if (provider === 'openai') {
      isValid = await validateOpenAIKey(api_keys);
    } else if (provider === 'anthropic') {
      isValid = await validateAnthropicKey(api_keys);
    }

    res.json({
      success: true,
      valid: isValid
    });
  } catch (error) {
    console.error('Validate API key error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to validate API key'
    });
  }
});

// Get usage statistics
router.get('/usage', async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let startDate = new Date();
    if (period === 'month') {
      startDate.setDate(1);
    } else if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'day') {
      startDate.setDate(startDate.getDate() - 1);
    }
    startDate.setHours(0, 0, 0, 0);

    const usage = await db.aiUsage.findMany({
      where: {
        userId: req.userId,
        createdAt: { gte: startDate }
      },
      orderBy: { createdAt: 'desc' }
    });

    const grouped = usage.reduce((acc, item) => {
      const date = item.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = {
          date,
          requests: 0,
          tokens: 0,
          byAction: {},
          byProvider: {}
        };
      }
      
      acc[date].requests++;
      acc[date].tokens += item.tokensUsed;
      
      if (!acc[date].byAction[item.action]) {
        acc[date].byAction[item.action] = 0;
      }
      acc[date].byAction[item.action]++;
      
      if (!acc[date].byProvider[item.provider]) {
        acc[date].byProvider[item.provider] = 0;
      }
      acc[date].byProvider[item.provider]++;
      
      return acc;
    }, {});

    res.json({
      success: true,
      usage: Object.values(grouped),
      summary: {
        totalRequests: usage.length,
        totalTokens: usage.reduce((sum, item) => sum + item.tokensUsed, 0),
        estimatedCost: calculateEstimatedCost(usage.reduce((sum, item) => sum + item.tokensUsed, 0))
      }
    });
  } catch (error) {
    console.error('Get usage error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch usage statistics'
    });
  }
});

// Track usage
router.post('/track-usage', async (req, res) => {
  try {
    const { action, provider, tokens, timestamp } = req.body;
    
    await db.aiUsage.create({
      data: {
        userId: req.userId,
        action,
        provider,
        tokensUsed: tokens,
        createdAt: timestamp ? new Date(timestamp) : new Date()
      }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Track usage error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to track usage'
    });
  }
});

// Batch track usage
router.post('/track-usage/batch', async (req, res) => {
  try {
    const { usage } = req.body;
    
    if (!Array.isArray(usage)) {
      return res.status(400).json({
        success: false,
        message: 'Usage must be an array'
      });
    }

    await db.aiUsage.createMany({
      data: usage.map(item => ({
        userId: req.userId,
        action: item.action,
        provider: item.provider,
        tokensUsed: item.tokens,
        createdAt: new Date(item.timestamp)
      }))
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Batch track usage error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to track usage'
    });
  }
});

// Helper functions

function createBlogPrompt(topic, tone, length, styleBible) {
  const lengthGuide = {
    short: '500-1000 words',
    medium: '1000-2000 words',
    long: '2000-3000 words'
  };

  const toneGuide = {
    casual: 'friendly, conversational, and approachable',
    professional: 'formal, authoritative, and polished',
    expert: 'technical, detailed, and in-depth'
  };

  return `You are Laurie Meiring, a professional pickleball coach and blogger based in Costa Rica.
${styleBible ? `Follow these style guidelines:\n${styleBible}\n` : ''}

Write a ${lengthGuide[length] || '1000-2000 words'} blog post about: ${topic}

The tone should be ${toneGuide[tone] || 'professional and engaging'}.

The post should:
- Be personal and include relevant pickleball insights
- Have a clear structure with HTML formatting (<h2>, <h3>, <p>, <ul>, <li> tags)
- Include actionable tips and advice
- Engage readers with anecdotes or examples where appropriate
- End with a strong call-to-action

Return the response as a JSON object with this structure:
{
  "title": "Engaging blog post title",
  "excerpt": "2-3 sentence summary that hooks readers",
  "content": "Full HTML-formatted content",
  "tags": ["relevant", "tags", "for", "seo"]
}`;
}

function createSocialMediaPrompt(blogContent, blogTitle, platform) {
  const platformGuides = {
    linkedin: `Create a professional LinkedIn post (300-1300 characters) that:
- Starts with an attention-grabbing hook
- Shares key insights from the blog
- Includes a call-to-action to read the full post
- Uses professional language
- Ends with 3-5 relevant hashtags`,
    
    twitter: `Create a Twitter/X thread (multiple tweets of max 280 characters each) that:
- Starts with a compelling hook tweet
- Breaks down key points into digestible tweets
- Uses engaging language and emojis sparingly
- Includes relevant hashtags
- Ends with a call-to-action tweet`,
    
    facebook: `Create a Facebook post (optimal 500 characters) that:
- Starts with a conversational opener
- Shares the main value proposition
- Uses friendly, community-focused language
- Includes a question to encourage engagement
- Ends with relevant hashtags`,
    
    instagram: `Create an Instagram caption (max 2200 characters) that:
- Starts with an attention-grabbing first line
- Tells a story or shares insights
- Uses line breaks for readability
- Includes a call-to-action
- Ends with 10-15 relevant hashtags`
  };

  return `Convert this blog post into a ${platform} post:

Title: ${blogTitle}
Content: ${blogContent.substring(0, 2000)}...

${platformGuides[platform] || 'Create an engaging social media post.'}

Return as JSON:
{
  "content": "The social media post content",
  ${platform === 'twitter' ? '"thread": ["tweet1", "tweet2", "..."],' : ''}
  "hashtags": ["relevant", "hashtags"],
  "characterCount": 123
}`;
}

async function generateWithOpenAI(api_keys, prompt, temperature = 0.7) {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_keys}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant for blog writing.' },
        { role: 'user', content: prompt }
      ],
      temperature,
      max_tokens: 3000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API error');
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  const tokensUsed = data.usage?.total_tokens || 0;

  try {
    const parsed = JSON.parse(content);
    return { ...parsed, tokensUsed };
  } catch (e) {
    // Fallback for non-JSON responses
    return { content, tokensUsed };
  }
}

async function generateWithAnthropic(api_keys, prompt, temperature = 0.7) {
  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': api_keys,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 3000,
      temperature
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Anthropic API error');
  }

  const data = await response.json();
  const content = data.content[0].text;
  const tokensUsed = data.usage?.total_tokens || 0;

  try {
    const parsed = JSON.parse(content);
    return { ...parsed, tokensUsed };
  } catch (e) {
    return { content, tokensUsed };
  }
}

async function validateOpenAIKey(api_keys) {
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${api_keys}`
      }
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function validateAnthropicKey(api_keys) {
  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': api_keys,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 10
      })
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function trackUsage(userId, provider, action, tokens) {
  try {
    await db.aiUsage.create({
      data: {
        userId,
        provider,
        action,
        tokensUsed: tokens
      }
    });
  } catch (error) {
    console.error('Error tracking usage:', error);
  }
}

function calculateEstimatedCost(tokens) {
  // Rough estimates per 1000 tokens
  const costPer1000 = {
    'gpt-4': 0.03,
    'gpt-3.5-turbo': 0.002,
    'claude-3-opus': 0.015
  };
  
  // Default to GPT-4 pricing
  return (tokens / 1000) * costPer1000['gpt-4'];
}

export default router;