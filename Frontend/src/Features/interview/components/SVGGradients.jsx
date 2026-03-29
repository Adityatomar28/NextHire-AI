import React from "react";

/**
 * SVG Gradient Definitions Component
 * Must be rendered once in the DOM for CSS to reference it
 */
export const SVGGradients = () => (
  <svg width="0" height="0">
    <defs>
      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff006e" />
        <stop offset="100%" stopColor="#ff6b35" />
      </linearGradient>
    </defs>
  </svg>
);

export default SVGGradients;
