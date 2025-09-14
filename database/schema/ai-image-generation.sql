-- AI Image Generation Database Schema
-- Schema for tracking AI-generated images and usage analytics

-- Generated Images Table
CREATE TABLE IF NOT EXISTS generated_images (
  id SERIAL PRIMARY KEY,
  tenant_id VARCHAR(50) NOT NULL,
  industry VARCHAR(50) NOT NULL DEFAULT 'general',
  category VARCHAR(50) NOT NULL DEFAULT 'content', -- 'hero', 'service', 'team', 'content', 'social'
  usage_context VARCHAR(100) NOT NULL, -- 'hero-background', 'service-icon-1', etc.
  
  -- Prompt information
  original_prompt TEXT NOT NULL,
  enhanced_prompt TEXT NOT NULL,
  revised_prompt TEXT, -- DALL-E 3 revised prompt
  
  -- Image URLs and storage
  openai_image_url TEXT NOT NULL,
  local_image_url TEXT, -- After downloading and storing locally
  cdn_image_url TEXT, -- CDN URL if using CDN
  
  -- Metadata
  alt_text TEXT,
  image_size VARCHAR(20) DEFAULT '1024x1024',
  image_quality VARCHAR(20) DEFAULT 'standard',
  image_style VARCHAR(20) DEFAULT 'natural',
  
  -- Cost tracking
  generation_cost DECIMAL(8,4) DEFAULT 0.0000,
  
  -- Additional metadata as JSON
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Indexes for common queries
  INDEX idx_generated_images_tenant_industry (tenant_id, industry),
  INDEX idx_generated_images_category (category),
  INDEX idx_generated_images_created_at (created_at),
  INDEX idx_generated_images_cost (generation_cost)
);

-- Image Generation Analytics Table
CREATE TABLE IF NOT EXISTS image_generation_analytics (
  id SERIAL PRIMARY KEY,
  tenant_id VARCHAR(50) NOT NULL,
  
  -- User context
  session_id VARCHAR(100),
  user_id VARCHAR(50),
  
  -- Generation details
  prompt_text TEXT NOT NULL,
  prompt_length INTEGER,
  industry VARCHAR(50),
  category VARCHAR(50),
  
  -- Technical details
  provider VARCHAR(20) DEFAULT 'openai',
  model VARCHAR(50) DEFAULT 'dall-e-3',
  image_size VARCHAR(20),
  quality VARCHAR(20),
  style VARCHAR(20),
  
  -- Cost and usage
  generation_cost DECIMAL(8,4) DEFAULT 0.0000,
  generation_time_ms INTEGER,
  
  -- Success metrics
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT,
  
  -- User actions
  image_downloaded BOOLEAN DEFAULT FALSE,
  image_saved BOOLEAN DEFAULT FALSE,
  user_rating INTEGER, -- 1-5 rating if user provides feedback
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Indexes
  INDEX idx_analytics_tenant_date (tenant_id, created_at),
  INDEX idx_analytics_industry (industry),
  INDEX idx_analytics_success (success),
  INDEX idx_analytics_cost (generation_cost)
);

-- Image Usage Tracking Table
CREATE TABLE IF NOT EXISTS image_usage_tracking (
  id SERIAL PRIMARY KEY,
  image_id INTEGER REFERENCES generated_images(id) ON DELETE CASCADE,
  
  -- Usage context
  usage_type VARCHAR(50) NOT NULL, -- 'blog_post', 'social_media', 'website_header', etc.
  context_id VARCHAR(100), -- ID of the blog post, page, etc. where image is used
  context_data JSONB DEFAULT '{}',
  
  -- Usage metrics
  views INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  engagement_score DECIMAL(4,2) DEFAULT 0.00,
  
  -- Timestamps
  first_used_at TIMESTAMP DEFAULT NOW(),
  last_used_at TIMESTAMP DEFAULT NOW(),
  
  -- Indexes
  INDEX idx_usage_image_id (image_id),
  INDEX idx_usage_type (usage_type),
  INDEX idx_usage_context (context_id)
);

-- Monthly Usage Summary View
CREATE OR REPLACE VIEW monthly_image_usage_summary AS
SELECT 
  tenant_id,
  industry,
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as total_images,
  SUM(generation_cost) as total_cost,
  AVG(generation_cost) as avg_cost_per_image,
  COUNT(CASE WHEN success = TRUE THEN 1 END) as successful_generations,
  COUNT(CASE WHEN success = FALSE THEN 1 END) as failed_generations,
  ROUND(
    COUNT(CASE WHEN success = TRUE THEN 1 END)::DECIMAL / COUNT(*) * 100, 2
  ) as success_rate_percent
FROM image_generation_analytics
GROUP BY tenant_id, industry, DATE_TRUNC('month', created_at)
ORDER BY month DESC, tenant_id, industry;

-- Industry Performance View
CREATE OR REPLACE VIEW industry_performance_summary AS
SELECT 
  industry,
  COUNT(*) as total_generations,
  SUM(generation_cost) as total_cost,
  AVG(generation_cost) as avg_cost,
  AVG(prompt_length) as avg_prompt_length,
  COUNT(CASE WHEN success = TRUE THEN 1 END) as successful_generations,
  ROUND(
    COUNT(CASE WHEN success = TRUE THEN 1 END)::DECIMAL / COUNT(*) * 100, 2
  ) as success_rate_percent,
  AVG(CASE WHEN user_rating IS NOT NULL THEN user_rating END) as avg_user_rating
FROM image_generation_analytics
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY industry
ORDER BY total_generations DESC;

-- Image Library View (for quick access to saved images)
CREATE OR REPLACE VIEW image_library AS
SELECT 
  gi.id,
  gi.tenant_id,
  gi.industry,
  gi.category,
  gi.usage_context,
  gi.local_image_url as image_url,
  gi.alt_text,
  gi.image_size,
  gi.generation_cost,
  gi.created_at,
  -- Usage statistics
  COALESCE(iut.views, 0) as total_views,
  COALESCE(iut.clicks, 0) as total_clicks,
  COALESCE(iut.engagement_score, 0) as engagement_score,
  -- Metadata
  gi.metadata
FROM generated_images gi
LEFT JOIN image_usage_tracking iut ON gi.id = iut.image_id
WHERE gi.local_image_url IS NOT NULL
ORDER BY gi.created_at DESC;

-- Function to update image usage statistics
CREATE OR REPLACE FUNCTION update_image_usage(
  p_image_id INTEGER,
  p_usage_type VARCHAR(50),
  p_context_id VARCHAR(100) DEFAULT NULL,
  p_increment_views INTEGER DEFAULT 0,
  p_increment_clicks INTEGER DEFAULT 0
) RETURNS VOID AS $$
BEGIN
  INSERT INTO image_usage_tracking (
    image_id, usage_type, context_id, views, clicks, last_used_at
  ) VALUES (
    p_image_id, p_usage_type, p_context_id, p_increment_views, p_increment_clicks, NOW()
  )
  ON CONFLICT (image_id, usage_type, COALESCE(context_id, ''))
  DO UPDATE SET
    views = image_usage_tracking.views + p_increment_views,
    clicks = image_usage_tracking.clicks + p_increment_clicks,
    last_used_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to get image generation analytics for a tenant
CREATE OR REPLACE FUNCTION get_image_analytics(
  p_tenant_id VARCHAR(50),
  p_start_date DATE DEFAULT NULL,
  p_end_date DATE DEFAULT NULL
) RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  -- Set default date range to current month if not provided
  IF p_start_date IS NULL THEN
    p_start_date := DATE_TRUNC('month', CURRENT_DATE);
  END IF;
  
  IF p_end_date IS NULL THEN
    p_end_date := CURRENT_DATE;
  END IF;

  SELECT json_build_object(
    'total_generations', COUNT(*),
    'total_cost', COALESCE(SUM(generation_cost), 0),
    'avg_cost_per_image', COALESCE(AVG(generation_cost), 0),
    'success_rate', ROUND(
      COUNT(CASE WHEN success = TRUE THEN 1 END)::DECIMAL / COUNT(*) * 100, 2
    ),
    'top_industries', (
      SELECT json_agg(
        json_build_object(
          'industry', industry,
          'count', count
        ) ORDER BY count DESC
      )
      FROM (
        SELECT industry, COUNT(*) as count
        FROM image_generation_analytics
        WHERE tenant_id = p_tenant_id
        AND created_at::DATE BETWEEN p_start_date AND p_end_date
        GROUP BY industry
        ORDER BY count DESC
        LIMIT 5
      ) sub
    ),
    'daily_usage', (
      SELECT json_agg(
        json_build_object(
          'date', generation_date,
          'count', generation_count,
          'cost', total_cost
        ) ORDER BY generation_date
      )
      FROM (
        SELECT 
          created_at::DATE as generation_date,
          COUNT(*) as generation_count,
          SUM(generation_cost) as total_cost
        FROM image_generation_analytics
        WHERE tenant_id = p_tenant_id
        AND created_at::DATE BETWEEN p_start_date AND p_end_date
        GROUP BY created_at::DATE
        ORDER BY created_at::DATE
      ) sub
    )
  ) INTO result
  FROM image_generation_analytics
  WHERE tenant_id = p_tenant_id
  AND created_at::DATE BETWEEN p_start_date AND p_end_date;

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_generated_images_modtime
  BEFORE UPDATE ON generated_images
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column();

-- Initial data for testing/development
INSERT INTO generated_images (
  tenant_id, industry, category, usage_context,
  original_prompt, enhanced_prompt, revised_prompt,
  openai_image_url, alt_text, generation_cost
) VALUES 
(
  'demo-client',
  'hospitality',
  'hero',
  'hero-background',
  'luxury hotel lobby',
  'luxury hotel lobby with modern furniture, warm professional lighting, modern hospitality design, professional photography, 4K resolution, high quality, commercial grade, marketing photography style',
  'A spacious luxury hotel lobby featuring contemporary furniture arrangements, warm ambient lighting creating an inviting atmosphere, elegant reception desk with marble accents, and guests in business attire, photographed in a professional marketing style',
  'https://example.com/generated-image-1.jpg',
  'Spacious luxury hotel lobby featuring contemporary furniture arrangements and warm ambient lighting',
  0.120
),
(
  'demo-client',
  'foodservice',
  'content',
  'service-illustration',
  'restaurant kitchen with chefs',
  'restaurant kitchen with chefs preparing dishes, stainless steel equipment, culinary excellence, food service industry aesthetics, professional photography, 4K resolution, high quality',
  'Professional restaurant kitchen scene with skilled chefs preparing gourmet dishes, featuring gleaming stainless steel equipment, organized cooking stations, and culinary artistry in motion',
  'https://example.com/generated-image-2.jpg',
  'Professional restaurant kitchen scene with skilled chefs preparing gourmet dishes',
  0.040
);

-- Sample analytics data
INSERT INTO image_generation_analytics (
  tenant_id, session_id, prompt_text, prompt_length,
  industry, category, provider, generation_cost,
  success, image_saved, created_at
) VALUES 
(
  'demo-client', 'session-123', 'luxury hotel lobby', 18,
  'hospitality', 'hero', 'openai', 0.120,
  TRUE, TRUE, NOW() - INTERVAL '2 hours'
),
(
  'demo-client', 'session-124', 'restaurant kitchen with chefs', 29,
  'foodservice', 'content', 'openai', 0.040,
  TRUE, TRUE, NOW() - INTERVAL '1 hour'
),
(
  'demo-client', 'session-125', 'dental office waiting room', 27,
  'healthcare', 'hero', 'openai', 0.080,
  TRUE, FALSE, NOW() - INTERVAL '30 minutes'
);

-- Comments for documentation
COMMENT ON TABLE generated_images IS 'Stores metadata and references for all AI-generated images';
COMMENT ON TABLE image_generation_analytics IS 'Tracks usage patterns and performance metrics for image generation';
COMMENT ON TABLE image_usage_tracking IS 'Monitors how generated images are used across the platform';
COMMENT ON VIEW monthly_image_usage_summary IS 'Provides monthly aggregated usage statistics';
COMMENT ON VIEW industry_performance_summary IS 'Shows performance metrics grouped by industry';
COMMENT ON VIEW image_library IS 'Quick access view for browsing saved generated images';