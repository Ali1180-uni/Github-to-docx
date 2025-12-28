import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Key, FileCode, Zap, AlertCircle } from 'lucide-react';
import './ConverterForm.css';

const DEFAULT_EXTENSIONS = ['.cpp', '.h', '.hpp', '.py', '.js', '.ts', '.jsx', '.tsx', '.java', '.c', '.cs'];

const ConverterForm = ({ onSubmit, error }) => {
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [extensions, setExtensions] = useState(DEFAULT_EXTENSIONS);
  const [customExtension, setCustomExtension] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      url,
      token: token || null,
      extensions
    });
  };

  const addExtension = () => {
    if (customExtension && !extensions.includes(customExtension)) {
      const ext = customExtension.startsWith('.') ? customExtension : `.${customExtension}`;
      setExtensions([...extensions, ext]);
      setCustomExtension('');
    }
  };

  const removeExtension = (ext) => {
    setExtensions(extensions.filter(e => e !== ext));
  };

  const toggleExtension = (ext) => {
    if (extensions.includes(ext)) {
      removeExtension(ext);
    } else {
      setExtensions([...extensions, ext]);
    }
  };

  return (
    <div className="converter-form-wrapper">
      <motion.div
        className="converter-form-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-header">
          <div className="form-icon">
            <Github size={32} />
          </div>
          <h2>Convert Repository</h2>
          <p>Enter a GitHub repository or folder URL to generate Word documents</p>
        </div>

        {error && (
          <motion.div
            className="error-banner"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="url">
              <Github size={16} />
              GitHub URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/owner/repo/tree/main/folder"
              required
            />
            <span className="input-hint">Paste the URL of a repository, branch, or specific folder</span>
          </div>

          <div className="form-group">
            <label htmlFor="token">
              <Key size={16} />
              Access Token
              <span className="optional">(Optional)</span>
            </label>
            <div className="token-input-wrapper">
              <input
                type={showToken ? 'text' : 'password'}
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? 'Hide' : 'Show'}
              </button>
            </div>
            <span className="input-hint">Required for private repositories</span>
          </div>

          <div className="form-group">
            <label>
              <FileCode size={16} />
              File Extensions
            </label>
            <div className="extensions-container">
              {DEFAULT_EXTENSIONS.map(ext => (
                <button
                  key={ext}
                  type="button"
                  className={`extension-tag ${extensions.includes(ext) ? 'active' : ''}`}
                  onClick={() => toggleExtension(ext)}
                >
                  {ext}
                </button>
              ))}
            </div>
            <div className="custom-extension">
              <input
                type="text"
                value={customExtension}
                onChange={(e) => setCustomExtension(e.target.value)}
                placeholder="Add custom extension..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExtension())}
              />
              <button type="button" onClick={addExtension}>Add</button>
            </div>
          </div>

          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap size={20} />
            <span>Start Conversion</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ConverterForm;
