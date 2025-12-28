import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <motion.div
        className="footer-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="footer-text">
          Made with <Heart size={14} className="heart-icon" /> for developers
        </p>
        <div className="footer-links">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
