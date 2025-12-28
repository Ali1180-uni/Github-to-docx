import React, { useEffect, useRef, useState } from 'react';
import './CursorEffect.css';

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);
  const requestRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);

      // Add to trail
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      trailRef.current = [...trailRef.current.slice(-15), newPoint];
      setTrail([...trailRef.current]);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Create ripple effect on click
  const [ripples, setRipples] = useState([]);
  
  useEffect(() => {
    const handleClick = (e) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`cursor-main ${isPointer ? 'pointer' : ''} ${isHidden ? 'hidden' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />

      {/* Cursor outer ring */}
      <div
        className={`cursor-ring ${isPointer ? 'pointer' : ''} ${isHidden ? 'hidden' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />

      {/* Trail effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: point.x,
            top: point.y,
            opacity: (index + 1) / trail.length * 0.5,
            transform: `scale(${(index + 1) / trail.length})`,
          }}
        />
      ))}

      {/* Click ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="click-ripple"
          style={{
            left: ripple.x,
            top: ripple.y
          }}
        />
      ))}

      {/* Bubble particles on movement */}
      <BubbleParticles position={position} />
    </>
  );
};

// Bubble particles that follow cursor
const BubbleParticles = ({ position }) => {
  const [bubbles, setBubbles] = useState([]);
  const lastPosition = useRef(position);

  useEffect(() => {
    const distance = Math.sqrt(
      Math.pow(position.x - lastPosition.current.x, 2) +
      Math.pow(position.y - lastPosition.current.y, 2)
    );

    if (distance > 30) {
      const newBubble = {
        x: position.x + (Math.random() - 0.5) * 20,
        y: position.y + (Math.random() - 0.5) * 20,
        size: 4 + Math.random() * 8,
        id: Date.now() + Math.random()
      };
      
      setBubbles(prev => [...prev.slice(-10), newBubble]);
      lastPosition.current = position;

      // Remove bubble after animation
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, 2000);
    }
  }, [position]);

  return (
    <>
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="cursor-bubble"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;
