import React, { useState } from 'react';
import { Key, Save, X, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const ApiKeyManager = ({ apiKeys, onSave, onClose }) => {
  const [keys, setKeys] = useState(apiKeys);
  const [showKeys, setShowKeys] = useState({ openai: false, anthropic: false });
  const [validationStatus, setValidationStatus] = useState({ openai: null, anthropic: null });

  const handleSave = () => {
    onSave(keys);
  };

  const validateOpenAIKey = (key) => {
    // Basic validation - OpenAI keys start with 'sk-'
    if (key && key.startsWith('sk-')) {
      setValidationStatus(prev => ({ ...prev, openai: 'valid' }));
    } else if (key) {
      setValidationStatus(prev => ({ ...prev, openai: 'invalid' }));
    } else {
      setValidationStatus(prev => ({ ...prev, openai: null }));
    }
  };

  const validateAnthropicKey = (key) => {
    // Basic validation - Anthropic keys start with 'sk-ant-'
    if (key && key.startsWith('sk-ant-')) {
      setValidationStatus(prev => ({ ...prev, anthropic: 'valid' }));
    } else if (key) {
      setValidationStatus(prev => ({ ...prev, anthropic: 'invalid' }));
    } else {
      setValidationStatus(prev => ({ ...prev, anthropic: null }));
    }
  };

  const handleKeyChange = (provider, value) => {
    setKeys({ ...keys, [provider]: value });
    
    if (provider === 'openai') {
      validateOpenAIKey(value);
    } else {
      validateAnthropicKey(value);
    }
  };

  const toggleShowKey = (provider) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  return (
    <div className="api-key-manager">
      <div className="manager-header">
        <h3><Key className="icon" /> API Configuration</h3>
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="manager-content">
        <p className="description">
          Configure your API keys to enable AI content generation. Your keys are stored locally and never sent to our servers.
        </p>

        <div className="api-key-section">
          <div className="provider-section">
            <h4>OpenAI (GPT-4)</h4>
            <div className="key-input-group">
              <div className="input-wrapper">
                <input
                  type={showKeys.openai ? "text" : "password"}
                  value={keys.openai}
                  onChange={(e) => handleKeyChange('openai', e.target.value)}
                  placeholder="sk-..."
                  className={validationStatus.openai === 'invalid' ? 'invalid' : ''}
                />
                <button 
                  className="toggle-visibility"
                  onClick={() => toggleShowKey('openai')}
                  type="button"
                >
                  {showKeys.openai ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {validationStatus.openai === 'valid' && (
                  <CheckCircle className="validation-icon valid" size={16} />
                )}
                {validationStatus.openai === 'invalid' && (
                  <AlertCircle className="validation-icon invalid" size={16} />
                )}
              </div>
              {validationStatus.openai === 'invalid' && (
                <p className="error-text">OpenAI keys should start with 'sk-'</p>
              )}
              <p className="help-text">
                Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">OpenAI Platform</a>
              </p>
            </div>
          </div>

          <div className="provider-section">
            <h4>Anthropic (Claude)</h4>
            <div className="key-input-group">
              <div className="input-wrapper">
                <input
                  type={showKeys.anthropic ? "text" : "password"}
                  value={keys.anthropic}
                  onChange={(e) => handleKeyChange('anthropic', e.target.value)}
                  placeholder="sk-ant-..."
                  className={validationStatus.anthropic === 'invalid' ? 'invalid' : ''}
                />
                <button 
                  className="toggle-visibility"
                  onClick={() => toggleShowKey('anthropic')}
                  type="button"
                >
                  {showKeys.anthropic ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {validationStatus.anthropic === 'valid' && (
                  <CheckCircle className="validation-icon valid" size={16} />
                )}
                {validationStatus.anthropic === 'invalid' && (
                  <AlertCircle className="validation-icon invalid" size={16} />
                )}
              </div>
              {validationStatus.anthropic === 'invalid' && (
                <p className="error-text">Anthropic keys should start with 'sk-ant-'</p>
              )}
              <p className="help-text">
                Get your API key from <a href="https://console.anthropic.com/account/keys" target="_blank" rel="noopener noreferrer">Anthropic Console</a>
              </p>
            </div>
          </div>
        </div>

        <div className="manager-actions">
          <button 
            className="save-button"
            onClick={handleSave}
            disabled={!keys.openai && !keys.anthropic}
          >
            <Save className="icon" />
            Save API Keys
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManager;