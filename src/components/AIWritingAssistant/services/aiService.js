// AI Service for blog generation
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export const generateBlogPost = async ({ provider, apiKey, idea, styleBible, temperature = 0.7 }) => {
  const systemPrompt = `You are Laurie Meiring, a professional pickleball coach and blogger based in Costa Rica. 
${styleBible ? `Follow these style guidelines:\n${styleBible}` : ''}

Generate a blog post based on the given idea. The post should:
- Be personal and engaging
- Include relevant pickleball insights
- Have a clear structure with headings
- Be approximately 800-1200 words
- Include a catchy title and excerpt

Format the response as JSON with the following structure:
{
  "title": "Blog post title",
  "excerpt": "Brief 2-3 sentence summary",
  "content": "Full HTML content with <p>, <h2>, <h3>, <ul>, <li> tags",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  try {
    if (provider === 'openai') {
      return await generateWithOpenAI(apiKey, systemPrompt, idea, temperature);
    } else if (provider === 'anthropic') {
      return await generateWithAnthropic(apiKey, systemPrompt, idea, temperature);
    }
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
};

const generateWithOpenAI = async (apiKey, systemPrompt, userPrompt, temperature) => {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Create a blog post about: ${userPrompt}` }
      ],
      temperature: temperature,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API error');
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch (e) {
    // If JSON parsing fails, try to extract the content
    console.error('Failed to parse JSON response:', e);
    return {
      title: 'Generated Blog Post',
      excerpt: 'AI-generated content',
      content: content,
      tags: ['pickleball', 'costa-rica']
    };
  }
};

const generateWithAnthropic = async (apiKey, systemPrompt, userPrompt, temperature) => {
  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      messages: [
        { 
          role: 'user', 
          content: `${systemPrompt}\n\nCreate a blog post about: ${userPrompt}` 
        }
      ],
      max_tokens: 2000,
      temperature: temperature
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Anthropic API error');
  }

  const data = await response.json();
  const content = data.content[0].text;
  
  try {
    return JSON.parse(content);
  } catch (e) {
    console.error('Failed to parse JSON response:', e);
    return {
      title: 'Generated Blog Post',
      excerpt: 'AI-generated content',
      content: content,
      tags: ['pickleball', 'costa-rica']
    };
  }
};

export const analyzeExistingBlogs = async ({ provider, apiKey, blogs, temperature = 0.7 }) => {
  if (!blogs || blogs.length === 0) {
    throw new Error('No blogs provided for analysis');
  }

  // Prepare blog content for analysis
  const blogSummaries = blogs.map(blog => ({
    title: blog.title,
    excerpt: blog.excerpt || blog.content?.substring(0, 200) + '...',
    categories: blog.categories?.join(', ') || '',
    tags: blog.tags?.join(', ') || '',
    wordCount: blog.content ? blog.content.split(' ').length : 0
  }));

  // Extract full content from up to 5 blogs for deeper analysis
  const detailedBlogs = blogs.slice(0, 5).map(blog => ({
    title: blog.title,
    content: blog.content?.substring(0, 2000) || '' // Limit content length
  }));

  const analysisPrompt = `Analyze the following blog posts to extract writing style patterns, voice, tone, and common themes. Create a comprehensive style guide.

Blog Summaries (${blogs.length} total):
${JSON.stringify(blogSummaries, null, 2)}

Detailed Content from Recent Posts:
${JSON.stringify(detailedBlogs, null, 2)}

Please analyze and return a style guide in the following format:

# Writing Style Bible

## Voice & Tone
- [Specific observations about the author's voice]
- [Tone characteristics]

## Common Themes
- [Recurring topics]
- [Subject matter patterns]

## Writing Patterns
- [Sentence structure]
- [Paragraph length]
- [Storytelling techniques]

## Language & Vocabulary
- [Common phrases]
- [Technical terms usage]
- [Emotional language]

## Content Structure
- [How posts typically begin]
- [Middle section patterns]
- [How posts typically end]

## Unique Style Elements
- [Any distinctive writing habits]
- [Recurring metaphors or analogies]
- [Personal touches]`;

  try {
    if (provider === 'openai') {
      return await analyzeWithOpenAI(apiKey, analysisPrompt, temperature);
    } else if (provider === 'anthropic') {
      return await analyzeWithAnthropic(apiKey, analysisPrompt, temperature);
    } else {
      throw new Error('Invalid AI provider');
    }
  } catch (error) {
    console.error('Error analyzing blogs:', error);
    throw error;
  }
};

const analyzeWithOpenAI = async (apiKey, prompt, temperature) => {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert writing analyst specializing in blog style analysis.' },
        { role: 'user', content: prompt }
      ],
      temperature: temperature,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API error');
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const analyzeWithAnthropic = async (apiKey, prompt, temperature) => {
  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      messages: [
        { 
          role: 'user', 
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: temperature
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Anthropic API error');
  }

  const data = await response.json();
  return data.content[0].text;
};