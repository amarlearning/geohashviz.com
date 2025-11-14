import React, { useEffect } from 'react';
import { DistanceConfig as DistanceConfigType } from './utils/distanceTypes';
import Geohash from '../../../GeohashMap/model/Geohash';
import { validateDistanceConfig } from './utils/validation';
import './DistanceConfig.css';

/**
 * Props for the DistanceConfig component
 */
interface DistanceConfigProps {
  /** Current distance configuration */
  config: DistanceConfigType;
  /** Callback when configuration changes */
  onConfigChange: (config: DistanceConfigType) => void;
  /** Array of valid geohashes for distance calculations */
  validGeohashes: Geohash[];
}

const DistanceConfig: React.FC<DistanceConfigProps> = ({
  config,
  onConfigChange,
  validGeohashes,
}) => {
  // Validate configuration on mount and when it changes
  useEffect(() => {
    const validation = validateDistanceConfig(config, validGeohashes);
    if (!validation.isValid) {
      console.warn('Distance configuration validation failed:', validation.error);
    }
    if (validation.warning) {
      console.warn('Distance configuration warning:', validation.warning);
    }
  }, [config, validGeohashes]);

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value as DistanceConfigType['mode'];
    onConfigChange({
      ...config,
      mode: newMode,
    });
  };

  const handleReferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onConfigChange({
      ...config,
      referenceGeohash: e.target.value,
    });
  };

  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange({
      ...config,
      units: e.target.value as 'km' | 'miles',
    });
  };

  // Default to first geohash if null
  const referenceGeohash = config.referenceGeohash || (validGeohashes.length > 0 ? validGeohashes[0].geohash : '');

  // Generate info message based on mode
  const getInfoMessage = (): string => {
    switch (config.mode) {
      case 'reference':
        return `Distances calculated from '${referenceGeohash}'`;
      case 'consecutive':
        const segmentCount = Math.max(0, validGeohashes.length - 1);
        return `Showing path distances (${segmentCount} segment${segmentCount !== 1 ? 's' : ''})`;
      case 'nearest':
        return 'Each geohash shows distance to nearest neighbor';
      case 'allPairs':
        const pairCount = (validGeohashes.length * (validGeohashes.length - 1)) / 2;
        return `Showing ${pairCount} pairwise distance${pairCount !== 1 ? 's' : ''}`;
      default:
        return '';
    }
  };

  // Check for warnings
  const geohashCount = validGeohashes.length;
  const showAllPairsWarning = config.mode === 'allPairs' && geohashCount > 10;
  const disableAllPairs = geohashCount > 20;
  const showPerformanceWarning = geohashCount > 50;

  // Get warning message
  const getWarningMessage = (): string | null => {
    if (showPerformanceWarning) {
      return 'Large dataset may impact performance';
    }
    if (showAllPairsWarning) {
      const pairCount = (geohashCount * (geohashCount - 1)) / 2;
      return `All pairs mode will calculate ${pairCount} distances`;
    }
    return null;
  };

  return (
    <div className="distance-config">
      {/* Calculation Mode Dropdown */}
      <div className="distance-config-section">
        <label htmlFor="calculation-mode" className="distance-config-label">
          Calculation Mode
        </label>
        <select
          id="calculation-mode"
          className="distance-config-select"
          value={config.mode}
          onChange={handleModeChange}
        >
          <option value="reference">From reference point</option>
          <option value="consecutive">Between consecutive</option>
          <option value="nearest">To nearest neighbor</option>
          <option value="allPairs" disabled={disableAllPairs}>
            All pairs{disableAllPairs ? ' (max 20 geohashes)' : ''}
          </option>
        </select>
      </div>

      {/* Reference Point Dropdown - Only show when mode is 'reference' */}
      {config.mode === 'reference' && (
        <div className="distance-config-section">
          <label htmlFor="reference-point" className="distance-config-label">
            Reference Point
          </label>
          <select
            id="reference-point"
            className="distance-config-select"
            value={referenceGeohash}
            onChange={handleReferenceChange}
          >
            {validGeohashes.map((geohash) => (
              <option key={geohash.geohash} value={geohash.geohash}>
                {geohash.geohash}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Info Message */}
      <div className="distance-config-section">
        <div className="distance-config-info">
          <svg 
            className="distance-config-info-icon" 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle 
              cx="7" 
              cy="7" 
              r="6" 
              stroke="currentColor" 
              strokeWidth="1.5"
            />
            <path 
              d="M7 6V10" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
            <circle cx="7" cy="4" r="0.5" fill="currentColor"/>
          </svg>
          <span>{getInfoMessage()}</span>
        </div>
      </div>

      {/* Warning Message */}
      {getWarningMessage() && (
        <div className="distance-config-section">
          <div className="distance-config-warning">
            <svg 
              className="distance-config-warning-icon" 
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
            <span>{getWarningMessage()?.replace('⚠️ ', '')}</span>
          </div>
        </div>
      )}

      {/* Units Selection */}
      <div className="distance-config-section">
        <label className="distance-config-label">Units</label>
        <div className="distance-config-radio-group">
          <div className="distance-config-radio-wrapper">
            <input
              type="radio"
              id="units-km"
              name="units"
              className="distance-config-radio"
              value="km"
              checked={config.units === 'km'}
              onChange={handleUnitsChange}
            />
            <label htmlFor="units-km" className="distance-config-radio-label">
              Kilometers
            </label>
          </div>
          <div className="distance-config-radio-wrapper">
            <input
              type="radio"
              id="units-miles"
              name="units"
              className="distance-config-radio"
              value="miles"
              checked={config.units === 'miles'}
              onChange={handleUnitsChange}
            />
            <label htmlFor="units-miles" className="distance-config-radio-label">
              Miles
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistanceConfig;
