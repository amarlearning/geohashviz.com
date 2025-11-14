import "./App.css";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useRef, useMemo } from "react";

import GeohashMap from "./GeohashMap/GeohashMap";
import Geohash from "./GeohashMap/model/Geohash";
import { createGeohashObjects } from "./Algorithms/geohash";
import GeohashInput from "./GeohashInput/GeohashInput";
import InfoButton from "./InfoButton/InfoButton";
import StatusBar from "./components/StatusBar";
import { DistanceConfig } from "./components/AdvancedOptions/DistanceAnalysis/utils/distanceTypes";
import { calculateDistances, clearDistanceCache } from "./components/AdvancedOptions/DistanceAnalysis/utils/distanceCalculator";

function App() {
  // Get geohashes from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const urlGeohashes = urlParams.get('view');
  const defaultGeohashStr = urlGeohashes ? urlGeohashes.split(',').join('\n') : "gct\ngcp";
  
  // Parse geohash strings (don't filter here, let StatusBar handle validation)
  const parseGeohashes = (input: string): string[] => {
    const geohashes: string[] = [];
    
    input.split("\n").forEach((geohash) => {
      const trimmedGeohash = geohash.trim();
      if (trimmedGeohash.length > 0) {
        geohashes.push(trimmedGeohash);
      }
    });
    
    return geohashes;
  };
  
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<any>(null);

  // Initialize geohashes state first (needed by other hooks)
  const [geohashes, setGeohashes] = useState(() => {
    const inputGeohashes = parseGeohashes(defaultGeohashStr);
    const result = createGeohashObjects(inputGeohashes);
    return result.valid;
  });

  const [allGeohashes, setAllGeohashes] = useState(() => {
    const inputGeohashes = parseGeohashes(defaultGeohashStr);
    const result = createGeohashObjects(inputGeohashes);
    return result.all;
  });

  // Distance analysis state
  const [distanceConfig, setDistanceConfig] = useState<DistanceConfig>({
    enabled: false,
    mode: 'reference',
    referenceGeohash: null,
    units: 'km',
  });

  // Advanced options state
  const [advancedOptionsExpanded, setAdvancedOptionsExpanded] = useState(false);

  // Load distance config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('geohashviz_distance_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setDistanceConfig(parsed);
      } catch (error) {
        console.error('Error loading distance config from localStorage:', error);
      }
    }

    const savedExpanded = localStorage.getItem('geohashviz_advanced_options_expanded');
    if (savedExpanded) {
      try {
        setAdvancedOptionsExpanded(JSON.parse(savedExpanded));
      } catch (error) {
        console.error('Error loading advanced options state from localStorage:', error);
      }
    }
  }, []);

  // Save distance config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('geohashviz_distance_config', JSON.stringify(distanceConfig));
  }, [distanceConfig]);

  // Save advanced options state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('geohashviz_advanced_options_expanded', JSON.stringify(advancedOptionsExpanded));
  }, [advancedOptionsExpanded]);

  // Calculate distances when config or geohashes change
  const distances = useMemo(() => {
    if (!distanceConfig.enabled) {
      return [];
    }

    try {
      return calculateDistances(geohashes, distanceConfig);
    } catch (error) {
      console.error('Error calculating distances:', error);
      return [];
    }
  }, [geohashes, distanceConfig]);

  // Clear distance cache when geohashes change
  useEffect(() => {
    clearDistanceCache();
  }, [geohashes]);

  // Handle distance config changes
  const handleDistanceConfigChange = (newConfig: DistanceConfig) => {
    // Auto-select first geohash as reference if needed
    if (newConfig.mode === 'reference' && !newConfig.referenceGeohash && geohashes.length > 0) {
      newConfig = {
        ...newConfig,
        referenceGeohash: geohashes[0].geohash,
      };
    }

    // If current reference geohash is not in valid geohashes, auto-select first
    if (newConfig.mode === 'reference' && newConfig.referenceGeohash) {
      const referenceExists = geohashes.some(g => g.geohash === newConfig.referenceGeohash);
      if (!referenceExists && geohashes.length > 0) {
        newConfig = {
          ...newConfig,
          referenceGeohash: geohashes[0].geohash,
        };
      }
    }

    setDistanceConfig(newConfig);
  };

  // Zoom control functions
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleFitBounds = () => {
    if (mapRef.current) {
      mapRef.current.fitBounds();
    }
  };
  
  // Process geohash input and convert to Geohash objects
  const handleSubmit = (value: string): Geohash[] => {
    setIsLoading(true);
    const inputGeohashes = parseGeohashes(value);
    const result = createGeohashObjects(inputGeohashes);
    setAllGeohashes(result.all); // Update all geohashes for StatusBar
    setTimeout(() => setIsLoading(false), 300); // Brief loading state for UX
    return result.valid; // Return only valid geohashes for map
  };

  // Update URL when geohashes change
  useEffect(() => {
    if (geohashes.length > 0) {
      const geohashStr = geohashes.map(g => g.geohash).join(',');
      window.history.replaceState(null, '', `?view=${geohashStr}`);
    }
  }, [geohashes]);

  // Keyboard shortcut for zoom to fit
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        if (mapRef.current && geohashes.length > 0) {
          mapRef.current.fitBounds();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [geohashes]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-content">
          <div className="app-logo">🗺️</div>
          <div>
            <h1 className="app-title">GeohashViz</h1>
            <p className="app-subtitle">Interactive geohash visualization tool</p>
          </div>
        </div>
        <div className="app-header-stats">
          {isLoading && (
            <div className="app-stat">
              <div className="app-stat-value">⚡</div>
              <div className="app-stat-label">Processing</div>
            </div>
          )}
          <InfoButton />
        </div>
      </header>
      <GeohashInput
        onSubmit={(value) => setGeohashes(handleSubmit(value))}
        defaultGeohashStr={defaultGeohashStr}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitBounds={handleFitBounds}
        advancedOptionsExpanded={advancedOptionsExpanded}
        onAdvancedOptionsToggle={() => setAdvancedOptionsExpanded(!advancedOptionsExpanded)}
        distanceConfig={distanceConfig}
        onDistanceConfigChange={handleDistanceConfigChange}
        validGeohashes={geohashes}
      />
      <GeohashMap 
        geohashes={geohashes} 
        ref={mapRef}
        distanceConfig={distanceConfig}
        distances={distances}
      />
      <StatusBar geohashes={allGeohashes} isLoading={isLoading} />
    </div>
  );
}

export default App;
