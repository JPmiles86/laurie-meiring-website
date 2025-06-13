import React, { useState } from 'react';
import StyleBibleManager from '../components/AIWritingAssistant/StyleBibleManager';

const TestStyleBible = () => {
  const [showStyleBible, setShowStyleBible] = useState(true);

  // Set up a basic AI configuration for testing
  React.useEffect(() => {
    const testSettings = {
      provider: 'openai',
      apiKey: 'test-key' // User will need to add their real key
    };
    localStorage.setItem('ai-settings', JSON.stringify(testSettings));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Style Bible Test Page</h1>
      <p>This page tests the Style Bible Manager functionality.</p>
      
      <button 
        onClick={() => setShowStyleBible(true)}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Open Style Bible Manager
      </button>

      {showStyleBible && (
        <StyleBibleManager onClose={() => setShowStyleBible(false)} />
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Add your OpenAI or Anthropic API key in localStorage under 'ai-settings'</li>
          <li>Click "Open Style Bible Manager"</li>
          <li>Select blogs to analyze using the various selection options</li>
          <li>Click "Analyze X Blogs" to generate a style guide</li>
          <li>The AI will analyze the selected blog content and create a comprehensive style bible</li>
        </ol>
      </div>
    </div>
  );
};

export default TestStyleBible;