import React from 'react';
import { AlertCircle, Sparkles, Hash, Lightbulb } from 'lucide-react';

const InputPanel = ({
  blogIdea,
  setBlogIdea,
  selectedProvider,
  setSelectedProvider,
  variationCount,
  setVariationCount,
  onGenerate,
  isGenerating,
  error,
  onOpenIdeaGenerator
}) => {
  const maxCharacters = 500;
  const remainingChars = maxCharacters - blogIdea.length;

  const suggestedPrompts = [
    "Write about the mental game in pickleball - handling pressure and staying focused",
    "Share my journey from tennis to pickleball and what I've learned",
    "Tips for intermediate players looking to reach the next level",
    "The growing pickleball community in Costa Rica",
    "How to choose the right paddle for your playing style",
    "Lessons learned from my latest tournament experience"
  ];

  return (
    <div className="input-panel">
      <div className="panel-header">
        <h3>Generate Blog Content</h3>
        <p className="subtitle">Describe your blog idea and let AI create multiple variations for you to choose from.</p>
      </div>

      <div className="form-section">
        <div className="form-row">
          <div className="provider-selection">
            <label>AI Provider:</label>
            <select 
              value={selectedProvider} 
              onChange={(e) => setSelectedProvider(e.target.value)}
            >
              <option value="openai">OpenAI (GPT-4)</option>
              <option value="anthropic">Anthropic (Claude)</option>
            </select>
          </div>

          <div className="variation-selection">
            <label>Variations to Generate:</label>
            <div className="variation-buttons">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  className={`variation-button ${variationCount === num ? 'active' : ''}`}
                  onClick={() => setVariationCount(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="idea-input-section">
          <div className="input-label-row">
            <label>
              Blog Idea
              <span className="char-count">
                {remainingChars < 50 ? (
                  <span className={remainingChars < 0 ? 'over-limit' : 'near-limit'}>
                    {remainingChars} characters remaining
                  </span>
                ) : (
                  <span>{blogIdea.length} / {maxCharacters}</span>
                )}
              </span>
            </label>
            {onOpenIdeaGenerator && (
              <button
                className="idea-generator-button"
                onClick={onOpenIdeaGenerator}
                type="button"
                title="Get AI-powered blog ideas"
              >
                <Lightbulb size={16} />
                Get Ideas
              </button>
            )}
          </div>
          <textarea
            value={blogIdea}
            onChange={(e) => setBlogIdea(e.target.value.slice(0, maxCharacters))}
            placeholder="Describe your blog post idea in detail. Include the main topic, key points you want to cover, and the tone you're aiming for..."
            rows={5}
            className={remainingChars < 0 ? 'over-limit' : ''}
          />
        </div>

        {/* Suggested Prompts */}
        <div className="suggested-prompts">
          <p className="prompt-label">Need inspiration? Try one of these:</p>
          <div className="prompt-chips">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                className="prompt-chip"
                onClick={() => setBlogIdea(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle className="icon" />
            {error}
          </div>
        )}

        <div className="generate-section">
          <button 
            className="generate-button"
            onClick={onGenerate}
            disabled={isGenerating || !blogIdea.trim()}
          >
            <Sparkles className="icon" />
            {isGenerating ? `Generating ${variationCount} Variation${variationCount > 1 ? 's' : ''}...` : `Generate ${variationCount} Variation${variationCount > 1 ? 's' : ''}`}
          </button>
          {variationCount > 1 && (
            <p className="generation-note">
              <Hash size={14} /> Each variation will have a unique perspective and style
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputPanel;