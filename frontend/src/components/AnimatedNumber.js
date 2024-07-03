import React, { useEffect, useState } from 'react';

const animateValue = (start, end, duration, callback) => {
  if (start === end) {
    callback(end);
    return;
  }

  const range = end - start;
  const startTime = performance.now();
  
  const step = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / (duration * 10), 1);
    const current = start + range * progress;
    
    callback(current);
    
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      callback(end);
    }
  };
  
  requestAnimationFrame(step);
};

const AnimatedNumber = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (isNaN(value) || value === null) {
      setDisplayValue(0);
      return;
    }
    animateValue(displayValue, value, duration, setDisplayValue);
  }, [value, duration]);

  return <span>{Math.round(displayValue)}</span>; 
};

export default AnimatedNumber;
