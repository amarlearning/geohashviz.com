import React, { useState, useEffect } from 'react';
import { DistanceConfig } from './utils/distanceTypes';
import Geohash from '../../../GeohashMap/model/Geohash';
import { validateDistanceConfig } from './utils/validation';
import DistanceConfigComponent from './DistanceConfig';
import './DistanceAnalysis.css';

/**
 * Props for the DistanceAnalysis component
 */
interface DistanceAnalysisProps {
  /** Current distance configuration */
  config: DistanceConfig;
  /** Callback when configuration changes */
  onConfigChange: (config: DistanceConfig) => void;
  /** Array of valid geohashes for distance calculations */
  validGeohashes: Geohash[];
  /** Whether the feature is disabled (e.g., insufficient geohashes) */
  disabled: boolean;
  /** Reason why the feature is disabled */
  disabledReason?: string;
}

export const DistanceAnalysis: React.FC<DistanceAnalysisProps> = ({
  config,
  onConfigChange,
  validGeohashes,
  disabled,
  disabledReason,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  // Validate configuration when it changes
  useEffect(() => {
    if (config.enabled) {
      const validation = validateDistanceConfig(config, validGeohashes);
      if (!validation.isValid && validation.error) {
        setValidationError(validation.error);
        console.error('Distance configuration error:', validation.error);
      } else {
        setValidationError(null);
      }
    } else {
      setValidationError(null);
    }
  }, [config, validGeohashes]);

  const handleToggle = () => {
    if (!disabled) {
      onConfigChange({
        ...config,
        enabled: !config.enabled,
      });
    }
  };

  return (
    <div className="distance-analysis">
      <div className="distance-analysis-header">
        <div className="distance-analysis-title">
          <span>Distance Analysis</span>
        </div>
        <label className="distance-analysis-toggle">
          <input
            type="checkbox"
            checked={config.enabled}
            onChange={handleToggle}
            disabled={disabled}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
      {disabled && disabledReason && (
        <div className="distance-analysis-disabled-message">
          {disabledReason}
        </div>
      )}
      {validationError && config.enabled && (
        <div className="distance-analysis-error-message">
          <svg 
            className="error-icon" 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M7 1L1 13H13L7 1Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M7 5V8" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
            <circle cx="7" cy="10.5" r="0.5" fill="currentColor"/>
          </svg>
          {validationError}
        </div>
      )}
      {config.enabled && !disabled && (
        <div className="distance-analysis-config">
          <DistanceConfigComponent
            config={config}
            onConfigChange={onConfigChange}
            validGeohashes={validGeohashes}
          />
        </div>
      )}
    </div>
  );
};

export default DistanceAnalysis;
