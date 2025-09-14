import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Shield, Trash2, Check, AlertCircle, Loader2, Plus } from 'lucide-react';
import { saveApiKey, getApiKeys, deleteApiKey, validateApiKey } from '../services/ai';
import './APIKeyManager.css';

const APIKeyManager = ({ onClose, onKeysUpdated }) => {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKey, setNewKey] = useState({
    provider: 'openai',
    key: '',
    name: ''
  });
  const [showKeys, setShowKeys] = useState({});
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    setLoading(true);
    try {
      const response = await getApiKeys();
      setApiKeys(response.keys || []);
      setStats(response.stats || {});
    } catch (err) {
      setError('Failed to load API keys');
      console.error('Error loading API keys:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveKey = async () => {
    if (!newKey.key.trim()) {
      setError('Please enter an API key');
      return;
    }

    if (!newKey.name.trim()) {
      setError('Please enter a name for this key');
      return;
    }

    setValidating(true);
    setError('');
    setSuccess('');

    try {
      // Validate the key first
      await validateApiKey(newKey.provider, newKey.key);
      
      // Save the key to backend (encrypted)
      await saveApiKey(newKey.provider, newKey.key, newKey.name);
      
      setSuccess('API key saved successfully');
      setNewKey({ provider: 'openai', key: '', name: '' });
      
      // Reload keys
      await loadApiKeys();
      
      // Notify parent component
      if (onKeysUpdated) {
        onKeysUpdated();
      }
    } catch (err) {
      setError(err.message || 'Failed to save API key');
    } finally {
      setValidating(false);
    }
  };

  const handleDeleteKey = async (keyId) => {
    if (!window.confirm('Are you sure you want to delete this API key?')) {
      return;
    }

    try {
      await deleteApiKey(keyId);
      setSuccess('API key deleted successfully');
      await loadApiKeys();
      
      if (onKeysUpdated) {
        onKeysUpdated();
      }
    } catch (err) {
      setError(err.message || 'Failed to delete API key');
    }
  };

  const toggleShowKey = (keyId) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const maskApiKey = (key) => {
    if (!key || key.length < 8) return '••••••••';
    return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
  };

  const getProviderIcon = (provider) => {
    const icons = {
      openai: '🤖',
      anthropic: '🧠',
      google: '🔍',
      cohere: '🌟'
    };
    return icons[provider] || '🔑';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatUsageCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count?.toString() || '0';
  };

  return (
    <div className="api-key-manager-overlay">
      <div className="api-key-manager">
        <div className="manager-header">
          <div>
            <h2><Key className="icon" /> API Key Manager</h2>
            <p className="manager-subtitle">
              <Shield className="small-icon" />
              Your API keys are encrypted and stored securely
            </p>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {error && (
          <div className="manager-alert error">
            <AlertCircle className="icon" />
            {error}
          </div>
        )}

        {success && (
          <div className="manager-alert success">
            <Check className="icon" />
            {success}
          </div>
        )}

        <div className="key-form">
          <h3>Add New API Key</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Provider</label>
              <select
                value={newKey.provider}
                onChange={(e) => setNewKey({ ...newKey, provider: e.target.value })}
              >
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic (Claude)</option>
                <option value="google">Google (Gemini)</option>
                <option value="cohere">Cohere</option>
              </select>
            </div>
            <div className="form-group flex-grow">
              <label>Name</label>
              <input
                type="text"
                value={newKey.name}
                onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                placeholder="e.g., Production Key"
              />
            </div>
          </div>
          <div className="form-group">
            <label>API Key</label>
            <input
              type="password"
              value={newKey.key}
              onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
              placeholder={`Enter your ${newKey.provider} API key`}
            />
          </div>
          <button
            className="save-key-button"
            onClick={handleSaveKey}
            disabled={validating || !newKey.key || !newKey.name}
          >
            {validating ? (
              <>
                <Loader2 className="spinner" />
                Validating...
              </>
            ) : (
              <>
                <Plus className="icon" />
                Add API Key
              </>
            )}
          </button>
        </div>

        <div className="saved-keys">
          <h3>Saved API Keys</h3>
          {loading ? (
            <div className="keys-loading">
              <Loader2 className="spinner" />
              Loading keys...
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="no-keys">
              <Key className="empty-icon" />
              <p>No API keys saved yet</p>
            </div>
          ) : (
            <div className="keys-list">
              {apiKeys.map(key => (
                <div key={key.id} className="key-item">
                  <div className="key-header">
                    <div className="key-info">
                      <span className="provider-icon">{getProviderIcon(key.provider)}</span>
                      <div>
                        <h4>{key.name}</h4>
                        <p className="key-meta">
                          {key.provider} • Added {formatDate(key.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="key-actions">
                      <button
                        className="icon-button"
                        onClick={() => toggleShowKey(key.id)}
                        title={showKeys[key.id] ? 'Hide key' : 'Show key'}
                      >
                        {showKeys[key.id] ? <EyeOff /> : <Eye />}
                      </button>
                      <button
                        className="icon-button delete"
                        onClick={() => handleDeleteKey(key.id)}
                        title="Delete key"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                  
                  <div className="key-value">
                    <code>{showKeys[key.id] ? key.key : maskApiKey(key.key)}</code>
                  </div>

                  {key.usage && (
                    <div className="key-usage">
                      <div className="usage-stat">
                        <span>Requests</span>
                        <strong>{formatUsageCount(key.usage.requests)}</strong>
                      </div>
                      <div className="usage-stat">
                        <span>Tokens</span>
                        <strong>{formatUsageCount(key.usage.tokens)}</strong>
                      </div>
                      <div className="usage-stat">
                        <span>Last Used</span>
                        <strong>{key.usage.lastUsed ? formatDate(key.usage.lastUsed) : 'Never'}</strong>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {stats.totalUsage && (
          <div className="usage-summary">
            <h3>Usage Summary</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span>Total Requests</span>
                <strong>{formatUsageCount(stats.totalUsage.requests)}</strong>
              </div>
              <div className="summary-item">
                <span>Total Tokens</span>
                <strong>{formatUsageCount(stats.totalUsage.tokens)}</strong>
              </div>
              <div className="summary-item">
                <span>This Month</span>
                <strong>{formatUsageCount(stats.monthlyUsage?.requests || 0)}</strong>
              </div>
              <div className="summary-item">
                <span>Estimated Cost</span>
                <strong>${(stats.estimatedCost || 0).toFixed(2)}</strong>
              </div>
            </div>
          </div>
        )}

        <div className="manager-footer">
          <p className="security-note">
            <Shield className="small-icon" />
            API keys are encrypted using AES-256-GCM before storage
          </p>
        </div>
      </div>
    </div>
  );
};

export default APIKeyManager;