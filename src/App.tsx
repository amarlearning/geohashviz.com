import "./App.css";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import GeohashMap from "./GeohashMap/GeohashMap";
import Geohash from "./GeohashMap/model/Geohash";
import { createGeohashObjects } from "./Algorithms/geohash";
import GeohashInput from "./GeohashInput/GeohashInput";
import InfoButton from "./InfoButton/InfoButton";

function App() {
  // Get geohashes from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const urlGeohashes = urlParams.get('view');
  const defaultGeohashStr = urlGeohashes ? urlGeohashes.split(',').join('\n') : "gct\ngcp";
  
  // Validate geohash strings
  const validateGeohashes = (input: string): string[] => {
    const validGeohashes: string[] = [];
    
    input.split("\n").forEach((geohash) => {
      const trimmedGeohash = geohash.trim();
      if (trimmedGeohash.length > 0 && trimmedGeohash.length <= 12) {
        validGeohashes.push(trimmedGeohash);
      }
    });
    
    return validGeohashes;
  };
  
  // Process geohash input and convert to Geohash objects
  const handleSubmit = (value: string): Geohash[] => {
    const validGeohashes = validateGeohashes(value);
    return createGeohashObjects(validGeohashes);
  };
  
  const [geohashes, setGeohashes] = useState(
    handleSubmit(defaultGeohashStr)
  );

  // Update URL when geohashes change
  useEffect(() => {
    if (geohashes.length > 0) {
      const geohashStr = geohashes.map(g => g.geohash).join(',');
      window.history.replaceState(null, '', `?view=${geohashStr}`);
    }
  }, [geohashes]);

  return (
    <div className="app-container">
      <InfoButton />
      <GeohashInput
        onSubmit={(value) => setGeohashes(handleSubmit(value))}
        defaultGeohashStr={defaultGeohashStr}
      />
      <GeohashMap geohashes={geohashes} />
    </div>
  );
}

export default App;
