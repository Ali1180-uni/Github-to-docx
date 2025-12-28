import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, FileSearch, Save, Code } from 'lucide-react';
import './ProgressPanel.css';

const ProgressPanel = ({ status }) => {
  const progress = status?.progress || {};
  const percentage = progress.total > 0 
    ? Math.round((progress.processed / progress.total) * 100) 
    : 0;

  const getStatusIcon = () => {
    switch (status?.status) {
      case 'processing':
        return <Loader2 className="spin" size={24} />;
      case 'saving':
        return <Save size={24} />;
      default:
        return <FileSearch size={24} />;
    }
  };

  const getStatusText = () => {
    const detail = progress.detail_status || status?.status;
    switch (detail) {
      case 'parsing_url':
        return 'Parsing GitHub URL...';
      case 'counting_files':
        return 'Counting files to process...';
      case 'processing':
        return 'Processing files...';
      case 'saving':
        return 'Saving documents...';
      default:
        return detail || 'Working...';
    }
  };

  return (
    <div className="progress-panel-wrapper">
      <motion.div
        className="progress-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="progress-header">
          <div className="progress-icon">
            {getStatusIcon()}
          </div>
          <h3>Converting Repository</h3>
          <p>{getStatusText()}</p>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="progress-percentage">{percentage}%</span>
        </div>

        <div className="progress-details">
          <div className="detail-item">
            <Code size={16} />
            <span>Files Processed</span>
            <strong>{progress.processed || 0} / {progress.total || '...'}</strong>
          </div>
          
          {progress.current_file && (
            <div className="current-file">
              <span className="file-label">Current File:</span>
              <span className="file-name">{progress.current_file}</span>
            </div>
          )}
        </div>

        <div className="loading-animation">
          <div className="loading-dot" style={{ animationDelay: '0s' }} />
          <div className="loading-dot" style={{ animationDelay: '0.2s' }} />
          <div className="loading-dot" style={{ animationDelay: '0.4s' }} />
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressPanel;
