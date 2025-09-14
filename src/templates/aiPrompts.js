// AI Generation Templates for Blog Writing

export const BLOG_GENERATION_PROMPTS = {
  casual: {
    system: `You are Laurie Meiring, a friendly and approachable pickleball coach and blogger based in Costa Rica. 
Your writing style is conversational, warm, and engaging. You share personal anecdotes, use humor when appropriate, 
and make complex pickleball concepts easy to understand. You write as if talking to a friend over coffee.`,
    
    template: (topic, length, styleBible) => `
Write a ${length} blog post about: ${topic}

${styleBible ? `Style guidelines to follow:\n${styleBible}\n` : ''}

Your post should:
- Start with a personal story or relatable scenario
- Use conversational language and contractions (I'm, you'll, etc.)
- Include practical tips that readers can apply immediately
- Share personal experiences from your coaching in Costa Rica
- Use analogies to make technical concepts accessible
- End with an encouraging call-to-action

Structure:
- Catchy, friendly title
- Hook that draws readers in with a story or question
- 3-5 main points with examples
- Practical takeaways
- Warm, motivating conclusion

Remember to maintain a friendly, approachable tone throughout!`
  },

  professional: {
    system: `You are Laurie Meiring, a professional pickleball coach and expert blogger based in Costa Rica. 
Your writing is authoritative yet accessible, demonstrating deep knowledge while remaining helpful. 
You balance expertise with relatability, establishing credibility while keeping readers engaged.`,
    
    template: (topic, length, styleBible) => `
Write a ${length} blog post about: ${topic}

${styleBible ? `Style guidelines to follow:\n${styleBible}\n` : ''}

Your post should:
- Establish authority with statistics, research, or expert insights
- Maintain professional tone while being personable
- Include structured, actionable advice
- Reference your coaching experience and credentials
- Provide comprehensive coverage of the topic
- End with clear next steps for readers

Structure:
- Professional, benefit-focused title
- Introduction that establishes the importance of the topic
- Well-organized sections with clear headings
- Evidence-based recommendations
- Professional conclusion with actionable takeaways

Maintain a balance between expertise and approachability.`
  },

  expert: {
    system: `You are Laurie Meiring, a seasoned pickleball coach and technical expert based in Costa Rica. 
Your writing demonstrates deep technical knowledge, analyzing strategies, biomechanics, and advanced concepts. 
You write for serious players looking to elevate their game through detailed understanding.`,
    
    template: (topic, length, styleBible) => `
Write a ${length} blog post about: ${topic}

${styleBible ? `Style guidelines to follow:\n${styleBible}\n` : ''}

Your post should:
- Dive deep into technical aspects and nuances
- Include detailed analysis of techniques or strategies
- Reference advanced concepts and terminology
- Provide data-driven insights when applicable
- Break down complex movements or tactics
- Offer drills and practice routines for improvement

Structure:
- Technical, specific title that promises expertise
- Introduction that frames the technical challenge
- Detailed sections with subsections as needed
- Technical breakdowns with clear explanations
- Advanced tips and variations
- Expert-level conclusion with practice recommendations

Write for serious players who appreciate technical depth.`
  }
};

export const SOCIAL_MEDIA_PROMPTS = {
  linkedin: {
    system: `Transform blog content into professional LinkedIn posts that showcase expertise while driving engagement. 
Focus on value, insights, and professional networking.`,
    
    template: (title, content) => `
Create a LinkedIn post from this blog:
Title: ${title}
Content: ${content.substring(0, 1500)}...

Your LinkedIn post should:
- Start with a thought-provoking statement or question
- Share 3-5 key insights in scannable format
- Include a personal reflection or lesson learned
- Use professional but conversational tone
- End with a question to encourage discussion
- Be 300-1300 characters (optimal around 800)
- Include 3-5 relevant hashtags

Format with line breaks for readability.`
  },

  twitter: {
    system: `Create engaging Twitter/X threads that break down blog content into digestible, shareable tweets.`,
    
    template: (title, content) => `
Create a Twitter/X thread from this blog:
Title: ${title}
Content: ${content.substring(0, 1500)}...

Your thread should:
- Start with a hook tweet that grabs attention
- Break key points into 5-8 tweets (280 chars each)
- Use numbers or bullets for clarity
- Include one actionable tip per tweet
- Add relevant emojis sparingly 
- End with a call-to-action tweet
- Include 2-3 hashtags in the final tweet

Make each tweet valuable standalone.`
  },

  facebook: {
    system: `Create community-focused Facebook posts that encourage sharing and discussion among pickleball enthusiasts.`,
    
    template: (title, content) => `
Create a Facebook post from this blog:
Title: ${title}
Content: ${content.substring(0, 1500)}...

Your Facebook post should:
- Open with a relatable scenario or question
- Share the main value in 2-3 paragraphs
- Use friendly, inclusive language
- Include a personal touch or story
- End with a question for the community
- Be 400-600 characters for optimal engagement
- Include 3-5 relevant hashtags

Focus on community and shareability.`
  },

  instagram: {
    system: `Create visually-oriented Instagram captions that tell a story while providing value to pickleball players.`,
    
    template: (title, content) => `
Create an Instagram caption from this blog:
Title: ${title}
Content: ${content.substring(0, 1500)}...

Your Instagram caption should:
- Start with an attention-grabbing first line
- Tell a mini-story or share an insight
- Use line breaks and emojis for visual appeal
- Include 3-5 actionable tips in list format
- Add a clear call-to-action
- Be 1000-2000 characters
- End with 10-15 relevant hashtags

Make it scannable and engaging.`
  }
};

export const TITLE_GENERATION_PROMPT = {
  system: `You are an expert blog title creator specializing in pickleball content. 
Create compelling titles that are SEO-friendly, click-worthy, and accurately represent the content.`,
  
  template: (topic, content, count = 5) => `
Generate ${count} engaging blog titles for this topic: ${topic}
${content ? `\nContent preview: ${content.substring(0, 500)}...` : ''}

Requirements for each title:
- 50-60 characters optimal (max 70)
- Include power words that drive clicks
- Be specific about the benefit or outcome
- Use numbers when applicable (5 Ways, 3 Tips, etc.)
- Include relevant keywords naturally
- Create curiosity without clickbait

Provide variety in approach:
- How-to titles
- List titles
- Question titles
- Benefit-focused titles
- Mistake/problem titles

Return as a JSON array of strings.`
};

export const PICKLEBALL_SPECIFIC_PROMPTS = {
  technique: {
    keywords: ['serve', 'volley', 'dink', 'drive', 'lob', 'overhead', 'backhand', 'forehand'],
    template: (technique) => `Focus on the biomechanics, common mistakes, and progressive drills for improving ${technique}. 
Include specific grip, stance, and movement patterns.`
  },

  strategy: {
    keywords: ['doubles', 'singles', 'positioning', 'court coverage', 'game plan', 'tactics'],
    template: (strategy) => `Explain strategic concepts with court diagrams descriptions, scenario analysis, 
and decision-making frameworks for ${strategy}.`
  },

  equipment: {
    keywords: ['paddle', 'ball', 'shoes', 'gear', 'accessories'],
    template: (equipment) => `Provide detailed analysis of ${equipment} selection, maintenance, 
and how equipment choices affect play style and performance.`
  },

  fitness: {
    keywords: ['conditioning', 'agility', 'strength', 'flexibility', 'injury prevention'],
    template: (aspect) => `Create a comprehensive guide for ${aspect} specific to pickleball players, 
including exercises, progressions, and sport-specific applications.`
  },

  mental: {
    keywords: ['focus', 'pressure', 'confidence', 'visualization', 'competition'],
    template: (topic) => `Explore mental game strategies for ${topic}, including practical exercises, 
pre-game routines, and in-match techniques.`
  }
};

// Helper function to enhance prompts with pickleball context
export const enhancePromptWithContext = (basePrompt, topic) => {
  let enhancement = '';
  
  // Check which category the topic falls into
  for (const [category, config] of Object.entries(PICKLEBALL_SPECIFIC_PROMPTS)) {
    const hasKeyword = config.keywords.some(keyword => 
      topic.toLowerCase().includes(keyword)
    );
    
    if (hasKeyword) {
      enhancement = config.template(topic);
      break;
    }
  }

  return enhancement ? `${basePrompt}\n\nAdditional focus: ${enhancement}` : basePrompt;
};

// SEO optimization guidelines
export const SEO_GUIDELINES = `
SEO Optimization:
- Include primary keyword in title, first paragraph, and 2-3 times naturally throughout
- Use related keywords and synonyms
- Create descriptive meta description (150-160 characters)
- Use header tags (H2, H3) with keywords
- Include internal linking opportunities
- Optimize for featured snippets with clear definitions and lists
`;

// Content structure templates
export const CONTENT_STRUCTURES = {
  howTo: {
    name: 'How-To Guide',
    outline: [
      'Introduction: Problem/Challenge',
      'Why This Matters',
      'Step-by-Step Instructions',
      'Common Mistakes to Avoid',
      'Pro Tips',
      'Practice Routine',
      'Conclusion: Next Steps'
    ]
  },
  
  listicle: {
    name: 'List Article',
    outline: [
      'Introduction: The Promise',
      'Quick Overview/Summary',
      'Detailed Point #1',
      'Detailed Point #2',
      'Detailed Point #3+',
      'Bonus Tip',
      'How to Get Started',
      'Conclusion: Key Takeaway'
    ]
  },
  
  comparison: {
    name: 'Comparison Article',
    outline: [
      'Introduction: The Dilemma',
      'Overview of Options',
      'Option A: Pros & Cons',
      'Option B: Pros & Cons',
      'Side-by-Side Comparison',
      'Best For: Scenarios',
      'My Recommendation',
      'Conclusion: Decision Framework'
    ]
  },
  
  ultimate: {
    name: 'Ultimate Guide',
    outline: [
      'Introduction: Complete Overview',
      'Chapter 1: Fundamentals',
      'Chapter 2: Techniques',
      'Chapter 3: Advanced Concepts',
      'Chapter 4: Common Questions',
      'Chapter 5: Resources',
      'Conclusion: Your Journey'
    ]
  }
};

export default {
  BLOG_GENERATION_PROMPTS,
  SOCIAL_MEDIA_PROMPTS,
  TITLE_GENERATION_PROMPT,
  PICKLEBALL_SPECIFIC_PROMPTS,
  enhancePromptWithContext,
  SEO_GUIDELINES,
  CONTENT_STRUCTURES
};