import React, { useState, useEffect } from 'react';
import { AlertCircle, Sparkles, Settings, BookOpen, Eye, Edit3, Key, RefreshCw, Lightbulb } from 'lucide-react';
import StyleBibleManager from './StyleBibleManager';
import ApiKeyManager from './ApiKeyManager';
import InputPanel from './InputPanel';
import VariationDisplay from './VariationDisplay';
import IdeaGenerator from './IdeaGenerator';
import useAIGeneration from './hooks/useAIGeneration';
import './styles/AIAssistant.css';

const AIWritingAssistant = ({ onEditBlog }) => {
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: ''
  });
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [blogIdea, setBlogIdea] = useState('');
  const [generatedVariations, setGeneratedVariations] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showStyleBible, setShowStyleBible] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  const [variationCount, setVariationCount] = useState(2);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedVariations, setComparedVariations] = useState([]);
  const [showIdeaGenerator, setShowIdeaGenerator] = useState(false);

  const { generateContent, isGenerating, error } = useAIGeneration();

  // Load saved API keys from localStorage
  useEffect(() => {
    const savedKeys = localStorage.getItem('ai-api-keys');
    if (savedKeys) {
      setApiKeys(JSON.parse(savedKeys));
    }
  }, []);

  // Save API keys to localStorage
  const saveApiKeys = (keys) => {
    setApiKeys(keys);
    localStorage.setItem('ai-api-keys', JSON.stringify(keys));
    setShowSettings(false);
  };

  const handleGenerate = async () => {
    if (!apiKeys[selectedProvider]) {
      alert('Please configure your API key first');
      setShowSettings(true);
      return;
    }

    if (!blogIdea.trim()) {
      alert('Please enter a blog idea');
      return;
    }

    const styleBible = localStorage.getItem('style-bible') || '';
    
    // Generate multiple variations
    const variations = [];
    for (let i = 0; i < variationCount; i++) {
      const result = await generateContent({
        provider: selectedProvider,
        apiKey: apiKeys[selectedProvider],
        idea: blogIdea,
        styleBible: styleBible,
        temperature: 0.7 + (i * 0.1) // Vary temperature for different outputs
      });
      
      if (result) {
        variations.push({
          id: Date.now() + i,
          ...result,
          variationNumber: i + 1
        });
      }
    }

    if (variations.length > 0) {
      setGeneratedVariations(variations);
      setSelectedVariation(variations[0]);
      setActiveTab('preview');
    }
  };

  const handleEditInBlogEditor = (variation) => {
    const contentToEdit = variation || selectedVariation;
    if (contentToEdit && onEditBlog) {
      onEditBlog({
        title: contentToEdit.title,
        content: contentToEdit.content,
        excerpt: contentToEdit.excerpt,
        tags: contentToEdit.tags || []
      });
    }
  };

  const toggleCompareVariation = (variation) => {
    setComparedVariations(prev => {
      const isAlreadyCompared = prev.find(v => v.id === variation.id);
      if (isAlreadyCompared) {
        return prev.filter(v => v.id !== variation.id);
      }
      if (prev.length >= 2) {
        return [prev[1], variation];
      }
      return [...prev, variation];
    });
  };

  return (
    <div className="ai-writing-assistant">
      <div className="assistant-header">
        <h2><Sparkles className="icon" /> AI Writing Assistant</h2>
        <div className="header-actions">
          <button 
            className="icon-button"
            onClick={() => setShowIdeaGenerator(!showIdeaGenerator)}
            title="Idea Generator"
          >
            <Lightbulb />
          </button>
          <button 
            className="icon-button"
            onClick={() => setShowStyleBible(!showStyleBible)}
            title="Style Bible"
          >
            <BookOpen />
          </button>
          <button 
            className="icon-button"
            onClick={() => setShowSettings(!showSettings)}
            title="Settings"
          >
            <Settings />
          </button>
        </div>
      </div>

      {showSettings && (
        <ApiKeyManager
          apiKeys={apiKeys}
          onSave={saveApiKeys}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showStyleBible && (
        <StyleBibleManager onClose={() => setShowStyleBible(false)} />
      )}

      {showIdeaGenerator && (
        <IdeaGenerator 
          onSelectIdea={(idea) => {
            setBlogIdea(idea);
            setShowIdeaGenerator(false);
            setActiveTab('generate');
          }}
          onClose={() => setShowIdeaGenerator(false)}
        />
      )}

      <div className="assistant-tabs">
        <button 
          className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          Generate Content
        </button>
        <button 
          className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
          disabled={generatedVariations.length === 0}
        >
          Preview ({generatedVariations.length})
        </button>
        {generatedVariations.length > 1 && activeTab === 'preview' && (
          <button 
            className={`tab ${compareMode ? 'active' : ''}`}
            onClick={() => setCompareMode(!compareMode)}
          >
            Compare Mode
          </button>
        )}
      </div>

      {activeTab === 'generate' && (
        <InputPanel
          blogIdea={blogIdea}
          setBlogIdea={setBlogIdea}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          variationCount={variationCount}
          setVariationCount={setVariationCount}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          error={error}
          onOpenIdeaGenerator={() => setShowIdeaGenerator(true)}
        />
      )}

      {activeTab === 'preview' && generatedVariations.length > 0 && (
        <VariationDisplay
          variations={generatedVariations}
          selectedVariation={selectedVariation}
          setSelectedVariation={setSelectedVariation}
          compareMode={compareMode}
          comparedVariations={comparedVariations}
          onToggleCompare={toggleCompareVariation}
          onEdit={handleEditInBlogEditor}
        />
      )}
    </div>
  );
};

export default AIWritingAssistant;