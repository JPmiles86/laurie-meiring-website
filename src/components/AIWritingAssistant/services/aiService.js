// AI Service for blog generation
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_IMAGE_API_URL = 'https://api.openai.com/v1/images/generations';
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

// Image Generation Functions
export const generateImage = async ({ 
  provider, 
  apiKey, 
  prompt, 
  size = '1024x1024',
  style = 'vivid',
  quality = 'standard',
  variations = 1 
}) => {
  try {
    if (provider === 'openai') {
      return await generateImageWithOpenAI(apiKey, prompt, size, style, quality, variations);
    } else {
      throw new Error('Image generation is currently only supported with OpenAI');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

const generateImageWithOpenAI = async (apiKey, prompt, size, style, quality, variations) => {
  const images = [];
  
  // Generate multiple variations by making multiple API calls
  for (let i = 0; i < variations; i++) {
    const response = await fetch(OPENAI_IMAGE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1, // DALL-E 3 only supports n=1
        size: size,
        style: style,
        quality: quality,
        response_format: 'url'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate image');
    }

    const data = await response.json();
    images.push({
      url: data.data[0].url,
      revised_prompt: data.data[0].revised_prompt,
      variation: i + 1
    });
  }
  
  return images;
};

// Generate contextual images for blog content
export const generateBlogImages = async ({
  provider,
  apiKey,
  blogTitle,
  blogContent,
  imageTypes = ['featured', 'content'],
  variations = 2
}) => {
  const images = {};
  
  try {
    // Generate featured/hero image
    if (imageTypes.includes('featured')) {
      const featuredPrompt = await createImagePrompt(blogTitle, blogContent, 'featured');
      images.featured = await generateImage({
        provider,
        apiKey,
        prompt: featuredPrompt,
        size: '1792x1024', // Wider aspect ratio for hero images
        style: 'vivid',
        quality: 'hd',
        variations
      });
    }
    
    // Generate content images
    if (imageTypes.includes('content')) {
      const contentPrompts = await createContentImagePrompts(blogTitle, blogContent);
      images.content = [];
      
      for (const prompt of contentPrompts) {
        const contentImages = await generateImage({
          provider,
          apiKey,
          prompt: prompt,
          size: '1024x1024',
          style: 'natural',
          quality: 'standard',
          variations
        });
        images.content.push(contentImages);
      }
    }
    
    // Generate social media images
    if (imageTypes.includes('social')) {
      const socialPrompt = await createImagePrompt(blogTitle, blogContent, 'social');
      images.social = await generateImage({
        provider,
        apiKey,
        prompt: socialPrompt,
        size: '1024x1024', // Square for social media
        style: 'vivid',
        quality: 'standard',
        variations
      });
    }
    
    return images;
  } catch (error) {
    console.error('Error generating blog images:', error);
    throw error;
  }
};

// Helper function to create image prompts from blog content
const createImagePrompt = async (title, content, type = 'featured') => {
  // Extract key themes from the blog
  const themes = extractThemes(title, content);
  
  // Create different prompts based on image type
  switch (type) {
    case 'featured':
      return `A professional, eye-catching hero image for a blog post titled "${title}". ${themes}. High quality, vibrant colors, pickleball-themed, Costa Rica setting, professional photography style.`;
    
    case 'social':
      return `A square social media image for a blog post about "${title}". ${themes}. Bold, attention-grabbing, optimized for small screens, includes visual elements that represent the topic.`;
    
    case 'content':
      return `An informative illustration for a blog post about "${title}". ${themes}. Clear, educational, supports the written content, professional style.`;
    
    default:
      return `A high-quality image for a blog post titled "${title}". ${themes}. Professional, relevant, engaging.`;
  }
};

// Extract themes from blog content for better image generation
const extractThemes = (title, content) => {
  // Simple theme extraction - could be enhanced with AI
  const lowerContent = (title + ' ' + content).toLowerCase();
  const themes = [];
  
  // Pickleball-related themes
  if (lowerContent.includes('tournament')) themes.push('pickleball tournament');
  if (lowerContent.includes('paddle')) themes.push('pickleball paddles');
  if (lowerContent.includes('court')) themes.push('pickleball court');
  if (lowerContent.includes('player')) themes.push('pickleball players');
  
  // Location themes
  if (lowerContent.includes('costa rica')) themes.push('tropical Costa Rica setting');
  if (lowerContent.includes('beach')) themes.push('beach location');
  
  // Mood themes
  if (lowerContent.includes('win') || lowerContent.includes('victory')) themes.push('celebration, victory');
  if (lowerContent.includes('learn') || lowerContent.includes('tip')) themes.push('educational, instructional');
  
  return themes.join(', ');
};

// Create multiple content image prompts based on blog sections
const createContentImagePrompts = (title, content) => {
  const prompts = [];
  
  // Extract major sections from content (assuming HTML)
  const sections = content.match(/<h[2-3]>(.*?)<\/h[2-3]>/gi) || [];
  
  // Generate prompts for up to 3 major sections
  sections.slice(0, 3).forEach((section, index) => {
    const sectionTitle = section.replace(/<\/?h[2-3]>/gi, '');
    prompts.push(`An illustrative image for a blog section about "${sectionTitle}" in an article titled "${title}". Professional, informative, pickleball-related.`);
  });
  
  // If no sections found, create a general content image
  if (prompts.length === 0) {
    prompts.push(createImagePrompt(title, content, 'content'));
  }
  
  return prompts;
};