import React, { useEffect, useRef } from 'react';
import './FishAnimation.css';

const FishAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create multiple fish
    const fishCount = 12;
    const fish = [];

    for (let i = 0; i < fishCount; i++) {
      const fishElement = document.createElement('div');
      fishElement.className = `fish fish-${(i % 4) + 1}`;
      
      // Random starting position
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      
      fishElement.style.left = `${startX}%`;
      fishElement.style.top = `${startY}%`;
      fishElement.style.animationDelay = `${Math.random() * 10}s`;
      fishElement.style.animationDuration = `${15 + Math.random() * 20}s`;
      
      // Add inner fish body
      fishElement.innerHTML = `
        <div class="fish-body">
          <div class="fish-eye"></div>
          <div class="fish-tail"></div>
          <div class="fish-fin"></div>
        </div>
      `;
      
      container.appendChild(fishElement);
      fish.push(fishElement);
    }

    // Create bubbles
    const bubbleCount = 20;
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDelay = `${Math.random() * 15}s`;
      bubble.style.animationDuration = `${8 + Math.random() * 10}s`;
      bubble.style.width = bubble.style.height = `${4 + Math.random() * 12}px`;
      container.appendChild(bubble);
    }

    // Cleanup
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fish-container">
      {/* Underwater light rays */}
      <div className="light-rays">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="light-ray" style={{ 
            left: `${10 + i * 20}%`,
            animationDelay: `${i * 0.5}s`
          }} />
        ))}
      </div>
      
      {/* Seaweed */}
      <div className="seaweed-container">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="seaweed"
            style={{ 
              left: `${5 + i * 12}%`,
              height: `${80 + Math.random() * 100}px`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FishAnimation;
