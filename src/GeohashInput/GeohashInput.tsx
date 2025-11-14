// FormComponent.tsx
import React, { useState } from "react";
import "./GeohashInput.css";
import QuickActions from "../components/QuickActions";
import CustomZoomControls from "../components/CustomZoomControls";
import Geohash from "../GeohashMap/model/Geohash";
import { DistanceConfig } from "../components/AdvancedOptions/DistanceAnalysis/utils/distanceTypes";
import AdvancedOptions from "../components/AdvancedOptions/AdvancedOptions";
import { DistanceAnalysis } from "../components/AdvancedOptions/DistanceAnalysis/DistanceAnalysis";
import ErrorBoundary from "../components/AdvancedOptions/DistanceAnalysis/ErrorBoundary";

interface FormComponentProps {
  onSubmit: (value: string) => void;
  defaultGeohashStr: string;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitBounds?: () => void;
  advancedOptionsExpanded: boolean;
  onAdvancedOptionsToggle: () => void;
  distanceConfig: DistanceConfig;
  onDistanceConfigChange: (config: DistanceConfig) => void;
  validGeohashes: Geohash[];
}

const GeohashInput: React.FC<FormComponentProps> = ({
  onSubmit,
  defaultGeohashStr,
  onZoomIn,
  onZoomOut,
  onFitBounds,
  advancedOptionsExpanded,
  onAdvancedOptionsToggle,
  distanceConfig,
  onDistanceConfigChange,
  validGeohashes,
}) => {
  const [value, setValue] = useState(defaultGeohashStr);
  
  const handleClear = () => {
    setValue('');
    onSubmit('');
  };
  
  const handleSample = () => {
    const sampleGeohashes = "dr5\ndpz\ndjf\ndnh\ndx1\ndn4";
    setValue(sampleGeohashes);
    onSubmit(sampleGeohashes);
  };

  return (
    <div className="geohash-form-container">
      <div className="geohash-form-header">
        <h3 className="geohash-form-title">Geohash Input</h3>
        <p className="geohash-form-description">Enter geohashes (one per line)</p>
      </div>
      
      <textarea
        rows={6}
        className="form-control geohash-textarea"
        placeholder="gct&#10;gcp&#10;gcr&#10;..."
        aria-label="Geohash input textarea"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      
      <button
        type="button"
        className="btn btn-primary geohash-submit-button"
        onClick={() => onSubmit(value)}
      >
        🗺️ Visualize Geohashes
      </button>
      
      <QuickActions 
        onClear={handleClear}
        onSample={handleSample}
      />
      
      {(onZoomIn && onZoomOut && onFitBounds) && (
        <CustomZoomControls
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onFitBounds={onFitBounds}
        />
      )}
      
      <AdvancedOptions
        expanded={advancedOptionsExpanded}
        onToggle={onAdvancedOptionsToggle}
      >
        <ErrorBoundary>
          <DistanceAnalysis
            config={distanceConfig}
            onConfigChange={onDistanceConfigChange}
            validGeohashes={validGeohashes}
            disabled={validGeohashes.length < 2}
            disabledReason={validGeohashes.length < 2 ? "Need at least 2 valid geohashes" : undefined}
          />
        </ErrorBoundary>
      </AdvancedOptions>
    </div>
  );
};

export default GeohashInput;
