// Mock data for testing IntelligentDraftManager components
// This data simulates the expected API responses for development and testing

export const mockDrafts = [
  {
    id: 'draft-001',
    title: 'The Ultimate Guide to Pickleball Strategy',
    excerpt: 'Learn advanced tactics and strategies to dominate the pickleball court with these proven techniques used by professional players.',
    content: `# The Ultimate Guide to Pickleball Strategy

Pickleball has evolved from a backyard game to a serious sport requiring strategic thinking and tactical execution. In this comprehensive guide, we'll explore the advanced strategies that separate recreational players from competitive athletes.

## Understanding Court Positioning

The most critical aspect of pickleball strategy is understanding where to position yourself on the court. The "kitchen" or non-volley zone creates unique tactical opportunities that don't exist in other racket sports.

### The Third Shot Drop

The third shot drop is perhaps the most important shot in pickleball. After the serve and return, this shot allows you to transition from the baseline to the net effectively.

**Key Points:**
- Aim for the opponent's feet
- Use a gentle arc trajectory
- Focus on placement over power
- Practice consistently for muscle memory

## Advanced Tactics

Once you've mastered the basics, these advanced tactics will elevate your game:

1. **Stacking Strategies** - Coordinate with your partner to maximize court coverage
2. **Poaching Opportunities** - Identify when to intercept shots intended for your partner
3. **Pace Control** - Vary shot speed to disrupt opponent rhythm
4. **Angle Creation** - Use sharp angles to force difficult returns

## Mental Game

Pickleball is as much a mental game as it is physical. Developing the right mindset includes:

- Staying patient during long rallies
- Communicating effectively with your partner
- Adapting strategy based on opponent weaknesses
- Maintaining focus under pressure

Remember, strategy without execution is meaningless. Practice these concepts regularly to see improvement in your competitive play.`,
    status: 'review',
    category: 'tutorial',
    tags: ['pickleball', 'strategy', 'advanced', 'tactics'],
    lastModified: '2024-01-15T10:30:00Z',
    author: 'Laurie Meiring',
    workflowStage: 'review',
    aiEnhanced: true,
    qualityScore: 88,
    wordCount: 267,
    readabilityScore: 82
  },
  {
    id: 'draft-002',
    title: 'Equipment Review: Best Pickleball Paddles 2024',
    excerpt: 'Our comprehensive review of the top pickleball paddles for 2024, including detailed analysis of performance, durability, and value.',
    content: `# Equipment Review: Best Pickleball Paddles 2024

Choosing the right paddle can significantly impact your game. After extensive testing, here are our top recommendations for 2024.

## Testing Methodology

We evaluated paddles based on:
- Power and control balance
- Sweet spot size
- Durability over 6 months
- Comfort during extended play
- Value for money

## Top Picks

### 1. Selkirk AMPED Epic
**Rating: 9.2/10**

The Epic continues to dominate the professional circuit for good reason. Its large sweet spot and excellent control make it ideal for intermediate to advanced players.

**Pros:**
- Exceptional control
- Large sweet spot
- Professional-grade construction

**Cons:**
- Higher price point
- Heavier than some competitors

### 2. JOOLA Ben Johns Perseus
**Rating: 8.8/10**

Ben Johns' signature paddle offers a perfect blend of power and finesse. The textured surface provides excellent spin potential.

**Pros:**
- Great spin capability
- Balanced weight distribution
- Comfortable grip

**Cons:**
- Surface texture wears over time
- Limited color options`,
    status: 'draft',
    category: 'review',
    tags: ['equipment', 'paddles', 'review', '2024'],
    lastModified: '2024-01-14T15:45:00Z',
    author: 'Laurie Meiring',
    workflowStage: 'draft',
    aiEnhanced: false,
    qualityScore: 75,
    wordCount: 198,
    readabilityScore: 78
  },
  {
    id: 'draft-003',
    title: 'Tournament Preparation: Mental and Physical Training',
    excerpt: 'A complete guide to preparing for pickleball tournaments, covering training routines, mental preparation, and competition strategies.',
    content: `# Tournament Preparation: Mental and Physical Training

Competing in tournaments requires more than just good technique. This guide covers comprehensive preparation strategies.

## Physical Preparation

### Conditioning Program
- Cardio: 30 minutes, 3x per week
- Strength training: Focus on core and legs
- Agility drills: Ladder work and cone drills
- Court time: Minimum 4 hours per week

### Injury Prevention
Regular stretching and proper warm-up routines are essential for tournament play.

## Mental Training

### Visualization Techniques
Spend 10 minutes daily visualizing successful shots and match scenarios.

### Pressure Management
Practice playing with distractions to simulate tournament pressure.

## Match Strategy

### Scouting Opponents
- Watch previous matches if possible
- Identify weaknesses in their game
- Plan specific tactics for each opponent

### Game Management
- Start conservatively to assess opponent
- Adjust strategy based on what's working
- Stay positive even when behind`,
    status: 'ready',
    category: 'tutorial',
    tags: ['tournament', 'training', 'mental', 'preparation'],
    lastModified: '2024-01-13T09:15:00Z',
    author: 'Laurie Meiring',
    workflowStage: 'ready',
    aiEnhanced: true,
    qualityScore: 92,
    wordCount: 156,
    readabilityScore: 85
  }
];

export const mockPredictions = {
  'draft-001': {
    overallScore: 88,
    confidence: 85,
    engagementScore: 91,
    seoScore: 84,
    shareabilityScore: 79,
    conversionScore: 88,
    keyInsights: [
      'Strong tutorial format with clear structure',
      'Good use of headers and bullet points for readability',
      'Advanced topic likely to perform well with target audience'
    ],
    outlook: 'above_average',
    metrics: [
      {
        type: 'engagement',
        score: 91,
        predictedValue: 2400,
        minValue: 1800,
        maxValue: 3200,
        factors: [
          { description: 'Strong tutorial format', impact: 'positive' },
          { description: 'Advanced content level', impact: 'positive' },
          { description: 'Clear structure with headers', impact: 'positive' }
        ]
      },
      {
        type: 'seo',
        score: 84,
        predictedValue: 1200,
        minValue: 800,
        maxValue: 1800,
        factors: [
          { description: 'Good keyword density', impact: 'positive' },
          { description: 'Clear headings structure', impact: 'positive' },
          { description: 'Could use more internal links', impact: 'negative' }
        ]
      }
    ],
    recommendations: [
      {
        title: 'Add Visual Elements',
        description: 'Include diagrams or images to illustrate court positioning concepts',
        icon: '📸',
        impactScore: 12,
        actionItems: [
          'Create court positioning diagrams',
          'Add photos of proper form',
          'Include video demonstrations'
        ],
        difficulty: 3
      },
      {
        title: 'Enhance SEO',
        description: 'Add more internal links and optimize meta description',
        icon: '🔍',
        impactScore: 8,
        actionItems: [
          'Add 3-4 internal links to related content',
          'Optimize meta description length',
          'Include more long-tail keywords'
        ],
        difficulty: 2
      }
    ]
  },
  'draft-002': {
    overallScore: 75,
    confidence: 78,
    engagementScore: 72,
    seoScore: 81,
    shareabilityScore: 76,
    conversionScore: 71,
    keyInsights: [
      'Product review format tends to perform well',
      'Could benefit from more detailed analysis',
      'Adding pricing information would increase value'
    ],
    outlook: 'average',
    metrics: [
      {
        type: 'engagement',
        score: 72,
        predictedValue: 1600,
        minValue: 1200,
        maxValue: 2200,
        factors: [
          { description: 'Review format is popular', impact: 'positive' },
          { description: 'Needs more detailed analysis', impact: 'negative' },
          { description: 'Good structure with pros/cons', impact: 'positive' }
        ]
      }
    ],
    recommendations: [
      {
        title: 'Add Pricing and Availability',
        description: 'Include current pricing and where to purchase',
        icon: '💰',
        impactScore: 15,
        actionItems: [
          'Research current prices',
          'Add retailer links',
          'Include discount codes if available'
        ],
        difficulty: 2
      }
    ]
  }
};

export const mockCritiques = {
  'draft-001': {
    overallScore: 88,
    totalSuggestions: 7,
    sections: [
      {
        type: 'structure',
        title: 'Content Structure',
        summary: 'Well-organized content with clear hierarchy and logical flow',
        score: 92,
        suggestions: [
          {
            id: 'struct-001',
            type: 'improvement',
            priority: 'medium',
            impact: 8,
            description: 'Consider adding a table of contents for this comprehensive guide',
            example: {
              before: 'Direct jump into content',
              after: 'Add numbered TOC with clickable sections'
            },
            reasoning: 'Longer guides benefit from navigation aids to improve user experience'
          }
        ]
      },
      {
        type: 'seo',
        title: 'SEO Optimization',
        summary: 'Good keyword usage but could improve internal linking and meta optimization',
        score: 84,
        suggestions: [
          {
            id: 'seo-001',
            type: 'enhancement',
            priority: 'high',
            impact: 12,
            description: 'Add internal links to related pickleball content',
            reasoning: 'Internal linking improves SEO and keeps readers engaged with your content'
          },
          {
            id: 'seo-002',
            type: 'optimization',
            priority: 'medium',
            impact: 6,
            description: 'Optimize meta description to include primary keywords',
            reasoning: 'Meta descriptions impact click-through rates from search results'
          }
        ]
      },
      {
        type: 'engagement',
        title: 'Reader Engagement',
        summary: 'Strong engaging content with good use of formatting and examples',
        score: 90,
        suggestions: [
          {
            id: 'eng-001',
            type: 'enhancement',
            priority: 'low',
            impact: 5,
            description: 'Add a call-to-action encouraging readers to share their experiences',
            reasoning: 'CTAs increase engagement and community building'
          }
        ]
      }
    ],
    overallRecommendations: [
      {
        priority: 'high',
        category: 'SEO',
        text: 'Focus on internal linking strategy to boost SEO performance',
        expectedImprovement: 8
      },
      {
        priority: 'medium',
        category: 'User Experience',
        text: 'Add visual elements like diagrams to enhance comprehension',
        expectedImprovement: 12
      }
    ]
  }
};

export const mockInsights = {
  totalInsights: 15,
  averageQuality: 82,
  averageWritingTime: 95, // minutes
  averageRevisions: 3.2,
  successRate: 0.84,
  writingStyle: {
    readabilityScore: 79,
    toneConsistency: 0.88,
    patterns: [
      {
        type: 'improvement',
        description: 'Consistent use of engaging questions in introductions'
      },
      {
        type: 'trend',
        description: 'Increased use of data and statistics for credibility'
      },
      {
        type: 'pattern',
        description: 'More conversational tone in recent posts'
      }
    ]
  },
  structure: {
    optimalLength: '800-1200',
    bestFormat: 'List-based with subheadings'
  },
  topics: {
    successful: [
      { name: 'Tutorial & Guides', averageScore: 89 },
      { name: 'Equipment Reviews', averageScore: 81 },
      { name: 'Strategy Analysis', averageScore: 86 }
    ]
  }
};

export const mockVersionHistory = {
  'draft-001': {
    versions: [
      {
        id: 'v1.0',
        title: 'The Ultimate Guide to Pickleball Strategy',
        timestamp: '2024-01-15T10:30:00Z',
        author: 'Laurie Meiring',
        changesSummary: [
          'Added advanced tactics section',
          'Improved mental game content',
          'Enhanced formatting and structure'
        ],
        wordCount: 267,
        qualityScore: 88,
        readabilityScore: 82,
        aiAssisted: true
      },
      {
        id: 'v0.9',
        title: 'Pickleball Strategy Guide',
        timestamp: '2024-01-14T16:20:00Z',
        author: 'Laurie Meiring',
        changesSummary: [
          'Initial draft creation',
          'Added basic strategy concepts',
          'Created outline structure'
        ],
        wordCount: 198,
        qualityScore: 72,
        readabilityScore: 75,
        aiAssisted: false
      }
    ]
  }
};

// Utility function to simulate API delay
export const simulateApiDelay = (ms = 800) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API responses with realistic success/error handling
export const mockApiResponses = {
  success: (data) => ({ success: true, data }),
  error: (message) => ({ success: false, error: message }),
  
  // Simulate network issues occasionally
  randomFailure: (data, failureRate = 0.1) => {
    if (Math.random() < failureRate) {
      return { success: false, error: 'Network timeout - please try again' };
    }
    return { success: true, data };
  }
};

export default {
  mockDrafts,
  mockPredictions,
  mockCritiques,
  mockInsights,
  mockVersionHistory,
  simulateApiDelay,
  mockApiResponses
};