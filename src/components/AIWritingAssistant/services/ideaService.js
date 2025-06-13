import blogsData from '../../../data/blogs.json';

// Analyze blog patterns
const analyzeBlogPatterns = (blogs) => {
  const patterns = {
    categories: {},
    tags: {},
    themes: [],
    contentTypes: [],
    timeGaps: []
  };

  // Count categories and tags
  blogs.forEach(blog => {
    // Categories
    if (blog.categories) {
      blog.categories.forEach(category => {
        patterns.categories[category] = (patterns.categories[category] || 0) + 1;
      });
    }

    // Tags
    if (blog.tags) {
      blog.tags.forEach(tag => {
        patterns.tags[tag] = (patterns.tags[tag] || 0) + 1;
      });
    }
  });

  // Identify recurring themes
  const commonThemes = [
    { keyword: 'tournament', theme: 'Tournament experiences and competition insights' },
    { keyword: 'coaching', theme: 'Coaching tips and teaching experiences' },
    { keyword: 'journey', theme: 'Personal growth and pickleball journey' },
    { keyword: 'partner', theme: 'Partnership dynamics and team play' },
    { keyword: 'mental', theme: 'Mental game and mindset strategies' },
    { keyword: 'equipment', theme: 'Equipment reviews and recommendations' },
    { keyword: 'costa rica', theme: 'Costa Rica pickleball community' },
    { keyword: 'youth', theme: 'Youth players and next generation' }
  ];

  commonThemes.forEach(({ keyword, theme }) => {
    const count = blogs.filter(blog => 
      blog.content.toLowerCase().includes(keyword) || 
      blog.title.toLowerCase().includes(keyword)
    ).length;
    if (count > 0) {
      patterns.themes.push({ theme, count });
    }
  });

  // Identify content types
  const contentTypePatterns = [
    { pattern: /tournament|competition|match/i, type: 'Tournament Reports' },
    { pattern: /how to|tips|guide|lesson/i, type: 'How-To Guides' },
    { pattern: /story|journey|experience/i, type: 'Personal Stories' },
    { pattern: /player profile|interview|Q&A/i, type: 'Player Profiles' },
    { pattern: /community|club|location/i, type: 'Community Features' }
  ];

  contentTypePatterns.forEach(({ pattern, type }) => {
    const count = blogs.filter(blog => pattern.test(blog.title) || pattern.test(blog.content)).length;
    if (count > 0) {
      patterns.contentTypes.push({ type, count });
    }
  });

  return patterns;
};

// Generate ideas based on patterns and gaps
const generateIdeas = (patterns) => {
  const ideas = [];
  
  // Tournament-related ideas
  ideas.push({
    category: 'Tournament Strategy',
    title: 'Breaking Down the Perfect Tournament Warm-Up Routine',
    description: 'Share your pre-tournament rituals, warm-up exercises, and mental preparation techniques that help you perform at your best.',
    tags: ['tournaments', 'preparation', 'mental game'],
    reasoning: 'You have many tournament stories but haven\'t covered pre-tournament preparation in detail.'
  });

  ideas.push({
    category: 'Tournament Analysis',
    title: 'My Biggest Tournament Mistakes and What They Taught Me',
    description: 'Analyze your tournament losses and share the valuable lessons learned from each defeat.',
    tags: ['tournaments', 'learning', 'mistakes'],
    reasoning: 'Learning from losses is a powerful theme that hasn\'t been explored deeply.'
  });

  // Coaching and teaching ideas
  ideas.push({
    category: 'Coaching Insights',
    title: 'The 5 Most Common Mistakes I See in Intermediate Players',
    description: 'Draw from your coaching experience to help intermediate players identify and fix common technical and strategic errors.',
    tags: ['coaching', 'tips', 'intermediate players'],
    reasoning: 'Your coaching perspective could help many players stuck at the intermediate level.'
  });

  ideas.push({
    category: 'Coaching Philosophy',
    title: 'Building Mental Toughness: Lessons from Coaching Different Personalities',
    description: 'Share how you adapt your coaching style to different player personalities and help them develop mental resilience.',
    tags: ['coaching', 'mental game', 'teaching'],
    reasoning: 'Mental coaching is crucial but underrepresented in your current content.'
  });

  // Equipment and gear ideas
  ideas.push({
    category: 'Equipment Guide',
    title: 'The Evolution of My Paddle Choices: A Year-Long Journey',
    description: 'Chronicle your paddle journey from beginner to now, including what worked, what didn\'t, and why you made each switch.',
    tags: ['equipment', 'paddles', 'journey'],
    reasoning: 'You mentioned the Agassi paddle but haven\'t done a comprehensive equipment journey post.'
  });

  // Costa Rica pickleball scene
  ideas.push({
    category: 'Local Scene',
    title: 'Hidden Gems: The Best Unknown Pickleball Courts in Costa Rica',
    description: 'Explore lesser-known courts and communities throughout Costa Rica that deserve recognition.',
    tags: ['costa rica', 'courts', 'community'],
    reasoning: 'Expand beyond the well-known clubs to showcase hidden pickleball spots.'
  });

  ideas.push({
    category: 'Community Profile',
    title: 'The International Pickleball Melting Pot of Costa Rica',
    description: 'Profile the diverse international community playing pickleball in Costa Rica and their unique stories.',
    tags: ['costa rica', 'community', 'international'],
    reasoning: 'Highlight the international aspect of Costa Rica\'s pickleball scene.'
  });

  // Personal development ideas
  ideas.push({
    category: 'Personal Growth',
    title: 'From Solo Player to Community Builder: My Social Evolution Through Pickleball',
    description: 'Reflect on how pickleball transformed your social life and helped build meaningful connections.',
    tags: ['personal journey', 'community', 'relationships'],
    reasoning: 'The social aspect of pickleball is touched on but deserves its own focused piece.'
  });

  // Technical and strategic ideas
  ideas.push({
    category: 'Strategy Deep Dive',
    title: 'The Art of the Third Shot: My Journey from Power to Precision',
    description: 'Detail your evolution from a power player to understanding the finesse of the third shot drop.',
    tags: ['strategy', 'technique', 'third shot'],
    reasoning: 'Technical evolution stories resonate with players at all levels.'
  });

  ideas.push({
    category: 'Partner Dynamics',
    title: 'Chemistry on the Court: What Makes a Great Doubles Partnership',
    description: 'Analyze what made your successful partnerships work and how to build chemistry with new partners.',
    tags: ['doubles', 'partnerships', 'strategy'],
    reasoning: 'You have great partnership stories but haven\'t analyzed what makes them work.'
  });

  return ideas;
};

// Main function to generate contextual ideas
export const generateBlogIdeas = () => {
  const blogs = blogsData.posts;
  const patterns = analyzeBlogPatterns(blogs);
  const ideas = generateIdeas(patterns);
  
  // Sort ideas by relevance/variety
  return ideas.sort((a, b) => {
    // Prioritize categories that are less covered
    const aCategoryCount = patterns.categories[a.tags[0]] || 0;
    const bCategoryCount = patterns.categories[b.tags[0]] || 0;
    return aCategoryCount - bCategoryCount;
  });
};

// Function to get a fresh set of ideas
export const refreshIdeas = (currentIdeas) => {
  const allIdeas = generateBlogIdeas();
  // Shuffle and return different ideas
  const shuffled = [...allIdeas].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
};