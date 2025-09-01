import "./App.css";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import GeohashMap from "./GeohashMap/GeohashMap";
import Geohash from "./GeohashMap/model/Geohash";
import { createGeohashObjects } from "./Algorithms/geohash";
import GeohashInput from "./GeohashInput/GeohashInput";
import InfoButton from "./InfoButton/InfoButton";
import StatusBar from "./components/StatusBar";
import { useRef } from "react";

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
      />
      <GeohashMap geohashes={geohashes} ref={mapRef} />
      <StatusBar geohashes={allGeohashes} isLoading={isLoading} />
    </div>
  );
}

export default App;
