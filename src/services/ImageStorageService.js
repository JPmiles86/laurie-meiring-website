// Image Storage and Management Service
// Handles image optimization, storage, and CDN integration

/**
 * Image Storage Service
 * Manages image download, optimization, storage, and alt text generation
 */
export class ImageStorageService {
  constructor(config = {}) {
    this.config = {
      cdnUrl: config.cdnUrl || 'https://cdn.inteligencia.com',
      bucketName: config.bucketName || 'inteligencia-generated-images',
      optimizationEnabled: config.optimizationEnabled !== false,
      ...config
    };
    this.altTextGenerator = new AltTextGenerator();
  }

  /**
   * Download image from URL and store locally
   */
  async downloadAndStore(imageUrl, metadata) {
    try {
      // Download image from OpenAI
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // Generate filename
      const filename = this.generateFilename(metadata);
      
      // Store locally (for now - in production this would go to cloud storage)
      const localUrl = await this.storeLocally(buffer, filename, metadata);

      // Generate alt text
      const altText = await this.altTextGenerator.generateAltText(localUrl, metadata);

      // Store metadata in database
      await this.storeMetadata({
        originalUrl: imageUrl,
        localUrl,
        filename,
        altText,
        metadata,
        timestamp: new Date().toISOString()
      });

      return {
        localUrl,
        altText,
        filename,
        metadata
      };
    } catch (error) {
      console.error('Failed to download and store image:', error);
      throw error;
    }
  }

  /**
   * Store image locally (browser implementation)
   * In production, this would upload to cloud storage
   */
  async storeLocally(buffer, filename, metadata) {
    // For browser implementation, we'll use localStorage with base64
    // In production, this would be replaced with actual cloud storage upload
    
    try {
      // Convert buffer to base64 for localStorage
      const base64 = this.bufferToBase64(buffer);
      const storageKey = `generated_image_${filename}`;
      
      // Store in localStorage (with size limits consideration)
      const imageData = {
        data: base64,
        metadata,
        timestamp: Date.now(),
        mimeType: 'image/jpeg'
      };

      localStorage.setItem(storageKey, JSON.stringify(imageData));
      
      // Return a data URL for immediate use
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.warn('Failed to store image locally:', error);
      // Return original URL as fallback
      return metadata.originalUrl;
    }
  }

  /**
   * Convert buffer to base64 string
   */
  bufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Generate appropriate filename for image
   */
  generateFilename(metadata) {
    const timestamp = Date.now();
    const industry = metadata.industry || 'general';
    const category = metadata.category || 'content';
    const variation = metadata.variationNumber || 1;
    
    return `${industry}_${category}_${timestamp}_v${variation}.jpg`;
  }

  /**
   * Store image metadata in browser storage
   * In production, this would use a database
   */
  async storeMetadata(imageData) {
    try {
      const storageKey = 'generated_images_metadata';
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      existing.push({
        id: Date.now(),
        ...imageData
      });

      // Keep only last 100 entries to prevent storage overflow
      const trimmed = existing.slice(-100);
      localStorage.setItem(storageKey, JSON.stringify(trimmed));
    } catch (error) {
      console.warn('Failed to store image metadata:', error);
    }
  }

  /**
   * Get stored image metadata
   */
  async getStoredImages(filters = {}) {
    try {
      const storageKey = 'generated_images_metadata';
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      // Apply filters
      let filtered = stored;
      
      if (filters.industry) {
        filtered = filtered.filter(img => img.metadata?.industry === filters.industry);
      }
      
      if (filters.category) {
        filtered = filtered.filter(img => img.metadata?.category === filters.category);
      }
      
      if (filters.dateRange) {
        const { start, end } = filters.dateRange;
        filtered = filtered.filter(img => {
          const imgDate = new Date(img.timestamp);
          return imgDate >= start && imgDate <= end;
        });
      }

      return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      console.warn('Failed to get stored images:', error);
      return [];
    }
  }

  /**
   * Delete stored image
   */
  async deleteImage(imageId) {
    try {
      // Remove from metadata
      const storageKey = 'generated_images_metadata';
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const filtered = stored.filter(img => img.id !== imageId);
      localStorage.setItem(storageKey, JSON.stringify(filtered));

      // Remove actual image data
      const imageKey = `generated_image_${imageId}`;
      localStorage.removeItem(imageKey);

      return true;
    } catch (error) {
      console.warn('Failed to delete image:', error);
      return false;
    }
  }

  /**
   * Get storage statistics
   */
  getStorageStats() {
    try {
      const storageKey = 'generated_images_metadata';
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      const stats = {
        totalImages: stored.length,
        storageUsed: 0,
        industryBreakdown: {},
        categoryBreakdown: {},
        recentActivity: []
      };

      stored.forEach(img => {
        // Calculate approximate storage used
        const imageKey = `generated_image_${img.filename}`;
        const imageData = localStorage.getItem(imageKey);
        if (imageData) {
          stats.storageUsed += imageData.length;
        }

        // Industry breakdown
        const industry = img.metadata?.industry || 'unknown';
        stats.industryBreakdown[industry] = (stats.industryBreakdown[industry] || 0) + 1;

        // Category breakdown
        const category = img.metadata?.category || 'unknown';
        stats.categoryBreakdown[category] = (stats.categoryBreakdown[category] || 0) + 1;
      });

      // Recent activity (last 7 days)
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      stats.recentActivity = stored.filter(img => 
        new Date(img.timestamp).getTime() > sevenDaysAgo
      ).length;

      // Convert storage size to readable format
      stats.storageReadable = this.formatBytes(stats.storageUsed);

      return stats;
    } catch (error) {
      console.warn('Failed to get storage stats:', error);
      return {
        totalImages: 0,
        storageUsed: 0,
        storageReadable: '0 B',
        industryBreakdown: {},
        categoryBreakdown: {},
        recentActivity: 0
      };
    }
  }

  /**
   * Format bytes to readable string
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

/**
 * Alt Text Generator
 * Generates descriptive alt text for accessibility
 */
export class AltTextGenerator {
  /**
   * Generate alt text based on image context and metadata
   */
  async generateAltText(imageUrl, metadata) {
    try {
      // For now, generate alt text based on metadata
      // In production, this could use GPT-4 Vision API
      return this.generateFromMetadata(metadata);
    } catch (error) {
      console.warn('Failed to generate alt text:', error);
      return this.generateFallbackAltText(metadata);
    }
  }

  /**
   * Generate alt text from metadata
   */
  generateFromMetadata(metadata) {
    const { industry, category, originalPrompt, revisedPrompt } = metadata;
    
    // Use revised prompt if available (more descriptive)
    const prompt = revisedPrompt || originalPrompt || '';
    
    // Extract key descriptive elements
    const descriptiveElements = this.extractDescriptiveElements(prompt, industry, category);
    
    return `${descriptiveElements}. Professional ${industry || 'business'} ${category || 'image'} generated by AI.`;
  }

  /**
   * Extract descriptive elements from prompt
   */
  extractDescriptiveElements(prompt, industry, category) {
    if (!prompt) {
      return this.getDefaultDescription(industry, category);
    }

    // Remove technical photography terms for cleaner alt text
    const cleanPrompt = prompt
      .replace(/\b(professional photography|4K resolution|high quality|commercial grade|marketing photography style)\b/gi, '')
      .replace(/,\s*,/g, ',') // Remove double commas
      .replace(/^,\s*|,\s*$/g, '') // Remove leading/trailing commas
      .trim();

    // Take first meaningful part of the prompt (up to 100 characters)
    const meaningful = cleanPrompt.split(',')[0] || cleanPrompt;
    return meaningful.substring(0, 100);
  }

  /**
   * Get default description for industry/category combination
   */
  getDefaultDescription(industry, category) {
    const descriptions = {
      hospitality: {
        hero: 'Luxury hotel lobby with modern furniture and welcoming atmosphere',
        service: 'Professional hotel service illustration',
        team: 'Hotel staff providing excellent customer service'
      },
      foodservice: {
        hero: 'Restaurant interior with diners enjoying meals',
        service: 'Professional food service operation',
        team: 'Chef and restaurant staff in professional kitchen'
      },
      healthcare: {
        hero: 'Modern medical office with clean, professional environment',
        service: 'Healthcare professional providing patient care',
        team: 'Medical team in professional healthcare setting'
      },
      athletics: {
        hero: 'Sports facility with active community participation',
        service: 'Professional sports instruction and coaching',
        team: 'Community sports group celebrating success'
      }
    };

    return descriptions[industry]?.[category] || 'Professional business image';
  }

  /**
   * Generate fallback alt text when all else fails
   */
  generateFallbackAltText(metadata) {
    const { industry, category } = metadata;
    return `AI generated ${category || 'image'} for ${industry || 'business'} use`;
  }
}

/**
 * Image Optimization Utilities
 */
export class ImageOptimizer {
  /**
   * Optimize image for web delivery
   * Note: Browser-based optimization is limited
   */
  static async optimizeForWeb(buffer, options = {}) {
    // In a real implementation, this would use sharp or similar
    // For browser, we'll return the buffer as-is
    return buffer;
  }

  /**
   * Generate responsive image variants
   */
  static async generateResponsiveVariants(buffer, sizes = [400, 800, 1200]) {
    // In a real implementation, this would generate multiple sizes
    // For browser, we'll return the original
    const variants = {};
    sizes.forEach(size => {
      variants[size] = buffer;
    });
    return variants;
  }
}

// Export convenience functions
export const storeGeneratedImage = async (imageUrl, metadata, config = {}) => {
  const service = new ImageStorageService(config);
  return await service.downloadAndStore(imageUrl, metadata);
};

export const getImageLibrary = async (filters = {}) => {
  const service = new ImageStorageService();
  return await service.getStoredImages(filters);
};

export const getStorageStatistics = () => {
  const service = new ImageStorageService();
  return service.getStorageStats();
};

export const generateImageAltText = async (imageUrl, metadata) => {
  const generator = new AltTextGenerator();
  return await generator.generateAltText(imageUrl, metadata);
};