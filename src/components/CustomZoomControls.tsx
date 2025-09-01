import React from 'react';
import './CustomZoomControls.css';

interface CustomZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitBounds: () => void;
}

const CustomZoomControls: React.FC<CustomZoomControlsProps> = ({ 
  onZoomIn, 
  onZoomOut, 
  onFitBounds 
}) => {
  return (
    <div className="custom-zoom-controls">
      <button 
        className="zoom-btn zoom-in"
        onClick={onZoomIn}
        title="Zoom in"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
      
      <button 
        className="zoom-btn zoom-out"
        onClick={onZoomOut}
        title="Zoom out"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13H5v-2h14v2z"/>
        </svg>
      </button>
      
      <button 
        className="zoom-btn zoom-fit"
        onClick={onFitBounds}
        title="Fit all geohashes (Shift + F)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 9H4v6h5V9zm10 0h-5v6h5V9zM6 7h12v2H6V7zm0 8h12v2H6v-2z"/>
        </svg>
      </button>
    </div>
  );
};

export default CustomZoomControls;