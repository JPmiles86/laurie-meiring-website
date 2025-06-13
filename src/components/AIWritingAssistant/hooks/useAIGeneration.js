import { useState } from 'react';
import { generateBlogPost } from '../services/aiService';

const useAIGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const generateContent = async ({ provider, apiKey, idea, styleBible, temperature }) => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateBlogPost({
        provider,
        apiKey,
        idea,
        styleBible,
        temperature
      });

      // Ensure the content is properly formatted
      if (result && result.content) {
        // Add any post-processing here if needed
        return {
          ...result,
          content: ensureHTMLFormatting(result.content)
        };
      }

      throw new Error('Invalid response format from AI');
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message || 'Failed to generate content. Please check your API key and try again.');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  // Ensure content has proper HTML formatting
  const ensureHTMLFormatting = (content) => {
    // If content is plain text, wrap in paragraphs
    if (!content.includes('<')) {
      return content
        .split('\n\n')
        .map(para => `<p>${para}</p>`)
        .join('\n');
    }
    return content;
  };

  return {
    generateContent,
    isGenerating,
    error
  };
};

export default useAIGeneration;