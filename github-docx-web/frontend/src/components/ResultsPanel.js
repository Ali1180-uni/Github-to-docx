import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, RefreshCw, FolderOpen, FileText } from 'lucide-react';
import './ResultsPanel.css';

const ResultsPanel = ({ files, onDownload, onReset }) => {
  return (
    <div className="results-panel-wrapper">
      <motion.div
        className="results-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="results-header">
          <div className="success-icon">
            <CheckCircle size={32} />
          </div>
          <h3>Conversion Complete!</h3>
          <p>{files.length} document{files.length !== 1 ? 's' : ''} generated successfully</p>
        </div>

        <div className="files-list">
          {files.map((file, index) => (
            <motion.div
              key={file.filename}
              className="file-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="file-info">
                <div className="file-icon">
                  <FileText size={20} />
                </div>
                <div className="file-details">
                  <span className="file-name">{file.filename}</span>
                  <span className="folder-name">
                    <FolderOpen size={12} />
                    {file.folder}
                  </span>
                </div>
              </div>
              <motion.button
                className="download-btn"
                onClick={() => onDownload(file.filename)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                <span>Download</span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        <div className="results-actions">
          <motion.button
            className="download-all-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => files.forEach(f => onDownload(f.filename))}
          >
            <Download size={20} />
            <span>Download All</span>
          </motion.button>
          
          <motion.button
            className="reset-btn"
            onClick={onReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw size={20} />
            <span>Convert Another</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsPanel;
