import React from 'react';
import { motion } from 'framer-motion';
import { Github, FileText } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <motion.div
        className="header-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="logo">
          <div className="logo-icon">
            <Github className="icon-github" />
            <span className="logo-arrow">→</span>
            <FileText className="icon-doc" />
          </div>
          <div className="logo-text">
            <h1>GitHub to DOCX</h1>
            <p>Convert repositories to beautiful documents</p>
          </div>
        </div>

        <nav className="header-nav">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav-link">
            <Github size={18} />
            <span>GitHub</span>
          </a>
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;
