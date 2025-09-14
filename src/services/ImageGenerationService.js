// AI Image Generation Service - OpenAI DALL-E 3 Integration
// Implements comprehensive image generation for multi-client platform

const OPENAI_IMAGE_API_URL = 'https://api.openai.com/v1/images/generations';

/**
 * Main Image Generation Service Class
 * Handles DALL-E 3 API integration with enhanced prompts and multi-industry support
 */
export class ImageGenerationService {
  constructor(apiKey, organizationId = null) {
    this.apiKey = apiKey;
    this.organizationId = organizationId;
    this.promptEnhancer = new PromptEnhancer();
    this.analytics = new ImageGenerationAnalytics();
  }

  /**
   * Generate image with enhanced prompts
   */
  async generateImage(prompt, options = {}) {
    const enhancedPrompt = this.promptEnhancer.enhancePrompt(
      prompt, 
      options.industry || 'general', 
      options.category || 'content'
    );

    const requestBody = {
      model: "dall-e-3",
      prompt: enhancedPrompt,
      size: options.size || "1792x1024",
      quality: options.quality || "hd",
      style: options.style || "natural",
      n: 1, // DALL-E 3 only supports n=1
      response_format: 'url'
    };

    try {
      const response = await fetch(OPENAI_IMAGE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          ...(this.organizationId && { 'OpenAI-Organization': this.organizationId })
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `DALL-E API error: ${response.status}`);
      }

      const data = await response.json();
      const generatedImage = {
        url: data.data[0].url,
        revisedPrompt: data.data[0].revised_prompt,
        originalPrompt: prompt,
        enhancedPrompt: enhancedPrompt,
        metadata: {
          ...options,
          timestamp: new Date().toISOString(),
          cost: this.calculateCost(options.size, options.quality)
        }
      };

      // Track generation for analytics
      await this.analytics.trackGeneration(
        prompt, 
        options.industry || 'general', 
        generatedImage.metadata.cost
      );

      return generatedImage;
    } catch (error) {
      console.error('Image generation failed:', error);
      throw error;
    }
  }

  /**
   * Generate multiple variations of an image
   */
  async generateVariations(prompt, options = {}, count = 3) {
    const variations = [];
    const baseOptions = { ...options };

    for (let i = 0; i < count; i++) {
      try {
        // Add variation to prompt for diversity
        const variationPrompt = this.promptEnhancer.generateVariations(prompt, 1)[0];
        const image = await this.generateImage(variationPrompt, {
          ...baseOptions,
          variationNumber: i + 1
        });
        variations.push(image);
      } catch (error) {
        console.warn(`Failed to generate variation ${i + 1}:`, error);
      }
    }

    return variations;
  }

  /**
   * Generate industry-specific images with pre-built templates
   */
  async generateIndustryImage(industry, imageType, customPrompt = null, options = {}) {
    const promptTemplate = IndustryPromptTemplates.getPrompt(industry, imageType);
    const finalPrompt = customPrompt || promptTemplate;

    return await this.generateImage(finalPrompt, {
      ...options,
      industry,
      category: imageType
    });
  }

  /**
   * Calculate estimated cost for image generation
   */
  calculateCost(size, quality) {
    // DALL-E 3 pricing (as of 2024)
    const pricing = {
      'standard': {
        '1024x1024': 0.040,
        '1024x1792': 0.080,
        '1792x1024': 0.080
      },
      'hd': {
        '1024x1024': 0.080,
        '1024x1792': 0.120,
        '1792x1024': 0.120
      }
    };

    return pricing[quality]?.[size] || 0.080; // Default HD 1024x1024
  }
}

/**
 * Prompt Enhancement System
 * Optimizes prompts for better image generation results
 */
export class PromptEnhancer {
  static enhancePrompt(basePrompt, industry, category) {
    const industryStyles = {
      hospitality: "luxury hotel ambiance, warm professional lighting, modern hospitality design, premium service environment",
      foodservice: "restaurant atmosphere, culinary excellence, food service industry aesthetics, professional kitchen environment",
      healthcare: "clean modern medical environment, professional healthcare setting, trustworthy atmosphere, sterile and welcoming",
      athletics: "dynamic sports environment, recreational facility, community-focused athletics, energetic and active",
      general: "professional business environment, modern clean design, high-quality commercial setting"
    };
    
    const qualityModifiers = [
      "professional photography",
      "4K resolution",
      "high quality",
      "commercial grade",
      "marketing photography style",
      "professional lighting"
    ];
    
    const categoryStyles = {
      hero: "wide angle, establishing shot, professional commercial photography, dramatic composition",
      service: "clean modern design, business graphics, professional illustration, clear messaging",
      team: "professional headshot, business portrait, confident expression, corporate environment",
      caseStudy: "clean data visualization, business graphics, professional presentation, informative",
      content: "illustrative, educational, clear visual communication, engaging composition",
      social: "social media optimized, attention-grabbing, bold design, mobile-friendly composition"
    };
    
    return [
      basePrompt,
      industryStyles[industry] || industryStyles.general,
      categoryStyles[category] || categoryStyles.content,
      qualityModifiers.join(", ")
    ].join(", ");
  }
  
  static generateVariations(basePrompt, count = 3) {
    const variations = [
      "dramatic lighting, high contrast",
      "soft natural lighting, warm tones", 
      "bright professional lighting, clean aesthetic"
    ];
    
    const angles = [
      "wide angle view, expansive perspective",
      "medium shot, balanced composition", 
      "close-up perspective, detailed focus"
    ];
    
    const styles = [
      "contemporary style, modern elements",
      "professional business style, corporate aesthetic",
      "clean minimalist style, simple composition"
    ];
    
    return Array.from({ length: count }, (_, i) => 
      `${basePrompt}, ${variations[i % variations.length]}, ${angles[i % angles.length]}, ${styles[i % styles.length]}`
    );
  }
}

/**
 * Industry-Specific Prompt Templates
 * Pre-built prompts for different industries and use cases
 */
export class IndustryPromptTemplates {
  static templates = {
    hospitality: {
      hero: {
        lobby: "Elegant luxury hotel lobby with modern furniture, warm ambient lighting, guests checking in at reception desk, marble floors, contemporary design, professional photography style, 4K quality",
        exterior: "Upscale hotel exterior at golden hour, modern architecture, valet service, welcoming entrance, professional hospitality photography",
        suite: "Luxury hotel suite with city view, contemporary furnishings, king bed, sitting area, floor-to-ceiling windows, premium hospitality design"
      },
      services: {
        concierge: "Professional hotel concierge assisting guests, luxury hotel lobby background, customer service excellence, hospitality industry",
        booking: "Modern hotel booking interface on tablet, clean UI design, reservation system, hospitality technology",
        amenities: "Hotel amenities collage: spa, fitness center, pool area, restaurant, luxury hospitality services"
      },
      caseStudy: {
        analytics: "Hotel booking analytics dashboard showing increased direct reservations, clean data visualization, hospitality metrics",
        occupancy: "Hotel occupancy chart showing improvement, professional business graphics, hospitality industry data"
      }
    },
    foodservice: {
      hero: {
        interior: "Busy upscale restaurant interior during dinner service, happy diners eating, servers in action, warm ambient lighting, full tables, professional food photography",
        kitchen: "Professional restaurant kitchen with chefs preparing dishes, stainless steel equipment, culinary excellence, food service industry",
        exterior: "Attractive restaurant exterior with outdoor seating, evening ambiance, welcoming atmosphere, restaurant photography"
      },
      services: {
        socialMedia: "Food photography setup for social media, beautifully plated dishes, professional food styling, restaurant marketing",
        delivery: "Restaurant delivery setup with branded packaging, mobile ordering interface, food delivery service",
        reservation: "Restaurant reservation system on tablet, table management interface, dining room background"
      },
      food: {
        signature: "Beautifully plated signature dish with garnish, professional food photography, restaurant quality presentation",
        preparation: "Chef preparing food in professional kitchen, culinary skill demonstration, restaurant cooking process"
      }
    },
    healthcare: {
      hero: {
        reception: "Modern clean dental office reception area with comfortable seating, natural lighting, professional medical environment, welcoming atmosphere",
        treatment: "State-of-the-art dental treatment room with modern equipment, clean and sterile environment, professional healthcare setting",
        consultation: "Dentist consulting with patient, professional interaction, modern dental office, healthcare communication"
      },
      services: {
        technology: "Advanced dental technology and equipment, digital x-rays, modern dental tools, healthcare innovation",
        preventive: "Dental hygienist with patient, preventive care demonstration, professional dental cleaning, oral health",
        cosmetic: "Before and after dental treatment results, smile transformation, cosmetic dentistry outcomes"
      },
      team: {
        staff: "Professional dental team in modern office, healthcare professionals, dental practice staff, medical teamwork",
        dentist: "Professional dentist in white coat, confident healthcare provider, modern dental office background"
      }
    },
    athletics: {
      hero: {
        action: "Dynamic pickleball court action with multiple players, energetic gameplay, recreational sports facility, community activity",
        facility: "Modern recreational sports facility overview, multiple courts, active community, sports complex architecture",
        tournament: "Pickleball tournament with spectators, competitive sports event, community engagement, recreational athletics"
      },
      services: {
        coaching: "Professional sports instructor teaching technique, pickleball coaching session, recreational sports education",
        events: "Sports tournament organization, event management, recreational sports competition, community gathering",
        membership: "Sports facility membership area, community board, recreational center amenities, member benefits"
      },
      community: {
        group: "Diverse group of recreational athletes, community sports participation, inclusive recreational activities",
        celebration: "Sports tournament winners celebration, community achievement, recreational sports success"
      }
    }
  };

  static quickPrompts = {
    hospitality: [
      "Luxury hotel lobby with guests",
      "Modern hotel room interior",
      "Hotel restaurant dining area",
      "Conference room setup",
      "Spa and wellness center"
    ],
    foodservice: [
      "Busy restaurant kitchen",
      "Beautifully plated meal",
      "Restaurant bar area",
      "Outdoor dining patio", 
      "Chef preparing food"
    ],
    healthcare: [
      "Modern dental office",
      "Dental examination room",
      "Comfortable waiting area",
      "Advanced dental equipment",
      "Professional dental consultation"
    ],
    athletics: [
      "Pickleball court action",
      "Sports facility overview",
      "Tournament competition",
      "Coaching session",
      "Community sports event"
    ]
  };

  static getPrompt(industry, category) {
    const industryTemplates = this.templates[industry];
    if (!industryTemplates) {
      return "Professional business environment, high quality, commercial photography";
    }

    // Navigate nested template structure
    const categoryTemplates = Object.values(industryTemplates).find(section => 
      section[category] !== undefined
    );

    if (categoryTemplates && categoryTemplates[category]) {
      return categoryTemplates[category];
    }

    // Return first available prompt for the industry
    const firstSection = Object.values(industryTemplates)[0];
    const firstPrompt = Object.values(firstSection)[0];
    return firstPrompt || "Professional business environment, high quality, commercial photography";
  }

  static getQuickPrompts(industry) {
    return this.quickPrompts[industry] || this.quickPrompts.hospitality;
  }
}

/**
 * Image Generation Analytics and Usage Tracking
 */
export class ImageGenerationAnalytics {
  constructor() {
    this.storageKey = 'image_generation_analytics';
  }

  async trackGeneration(prompt, industry, cost) {
    const data = this.getStoredData();
    const generation = {
      id: Date.now(),
      prompt: prompt.substring(0, 100), // Store first 100 chars for privacy
      promptLength: prompt.length,
      industry,
      cost,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };

    data.generations.push(generation);
    data.stats.totalGenerations++;
    data.stats.totalCost += cost;
    data.stats.industryBreakdown[industry] = (data.stats.industryBreakdown[industry] || 0) + 1;

    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  async getMonthlyUsage() {
    const data = this.getStoredData();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyGenerations = data.generations.filter(gen => {
      const genDate = new Date(gen.timestamp);
      return genDate.getMonth() === currentMonth && genDate.getFullYear() === currentYear;
    });

    const monthlyCost = monthlyGenerations.reduce((sum, gen) => sum + gen.cost, 0);
    const industryBreakdown = {};
    
    monthlyGenerations.forEach(gen => {
      industryBreakdown[gen.industry] = (industryBreakdown[gen.industry] || 0) + 1;
    });

    return {
      totalGenerations: monthlyGenerations.length,
      totalCost: monthlyCost,
      averageCostPerImage: monthlyGenerations.length > 0 ? monthlyCost / monthlyGenerations.length : 0,
      topIndustries: Object.entries(industryBreakdown)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([industry, count]) => ({ industry, count }))
    };
  }

  getStoredData() {
    const defaultData = {
      generations: [],
      stats: {
        totalGenerations: 0,
        totalCost: 0,
        industryBreakdown: {}
      }
    };

    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? { ...defaultData, ...JSON.parse(stored) } : defaultData;
    } catch (error) {
      console.warn('Failed to load analytics data:', error);
      return defaultData;
    }
  }

  async optimizePrompts() {
    const data = this.getStoredData();
    const recentGenerations = data.generations.slice(-50); // Last 50 generations

    // Simple optimization suggestions based on usage patterns
    const suggestions = [];
    
    const industryUsage = {};
    recentGenerations.forEach(gen => {
      industryUsage[gen.industry] = (industryUsage[gen.industry] || 0) + 1;
    });

    const topIndustry = Object.entries(industryUsage)
      .sort(([,a], [,b]) => b - a)[0];

    if (topIndustry) {
      suggestions.push({
        type: 'industry_focus',
        message: `Consider creating more ${topIndustry[0]} templates - it's your most used industry`,
        industry: topIndustry[0],
        usage: topIndustry[1]
      });
    }

    const avgCost = data.stats.totalCost / data.stats.totalGenerations;
    if (avgCost > 0.060) { // Above average cost
      suggestions.push({
        type: 'cost_optimization',
        message: 'Consider using standard quality instead of HD for some images to reduce costs',
        currentAvgCost: avgCost,
        potentialSavings: (avgCost - 0.040) * data.stats.totalGenerations
      });
    }

    return suggestions;
  }
}

/**
 * Image Size Specifications
 */
export const imageSizes = {
  hero: "1792x1024",      // 16:9 hero backgrounds
  service: "1024x1024",   // Square service icons
  caseStudy: "1024x768",  // 4:3 case study images
  team: "512x512",        // Square team photos
  blog: "1200x630",       // Social media optimized
  thumbnail: "400x300",   // Small preview images
  social: "1024x1024"     // Square social media
};

/**
 * Quality and Style Options
 */
export const imageOptions = {
  qualities: ['standard', 'hd'],
  styles: ['natural', 'vivid'],
  industries: ['hospitality', 'foodservice', 'healthcare', 'athletics'],
  categories: ['hero', 'service', 'team', 'caseStudy', 'content', 'social']
};

// Convenience functions for quick access
export const generateImage = async (apiKey, prompt, options = {}) => {
  const service = new ImageGenerationService(apiKey);
  return await service.generateImage(prompt, options);
};

export const generateIndustryImage = async (apiKey, industry, imageType, options = {}) => {
  const service = new ImageGenerationService(apiKey);
  return await service.generateIndustryImage(industry, imageType, null, options);
};

export const getImageAnalytics = () => {
  const analytics = new ImageGenerationAnalytics();
  return analytics.getMonthlyUsage();
};

export const getPromptSuggestions = (industry) => {
  return IndustryPromptTemplates.getQuickPrompts(industry);
};