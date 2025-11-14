import React, { useMemo } from 'react';
import { Polyline, Tooltip } from 'react-leaflet';
import Geohash from '../../../GeohashMap/model/Geohash';
import { DistanceConfig, DistanceResult } from './utils/distanceTypes';
import { calculateCentroid } from './utils/distanceCalculator';
import './DistanceLines.css';

/**
 * Props for DistanceLines component
 */
interface DistanceLinesProps {
  /** Array of geohashes */
  geohashes: Geohash[];
  /** Distance configuration */
  config: DistanceConfig;
  /** Calculated distance results */
  distances: DistanceResult[];
}

/**
 * Generate a curved arc path between two points
 * Creates a smooth bezier curve by calculating a control point offset perpendicular to the line
 */
const generateCurvedPath = (
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number,
  segments: number = 20
): [number, number][] => {
  const points: [number, number][] = [];
  
  // Calculate midpoint
  const midLat = (fromLat + toLat) / 2;
  const midLon = (fromLon + toLon) / 2;
  
  // Calculate distance for arc height
  const distance = Math.sqrt(
    Math.pow(toLat - fromLat, 2) + Math.pow(toLon - fromLon, 2)
  );
  
  // Calculate perpendicular offset for control point (creates the arc)
  const offsetFactor = 0.08; // Adjust this for more/less curve (subtle arc)
  const dx = toLon - fromLon;
  const dy = toLat - fromLat;
  
  // Control point perpendicular to the line
  const controlLat = midLat - dx * distance * offsetFactor;
  const controlLon = midLon + dy * distance * offsetFactor;
  
  // Generate points along quadratic bezier curve
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const t1 = 1 - t;
    
    // Quadratic bezier formula: B(t) = (1-t)²P0 + 2(1-t)tP1 + t²P2
    const lat = t1 * t1 * fromLat + 2 * t1 * t * controlLat + t * t * toLat;
    const lon = t1 * t1 * fromLon + 2 * t1 * t * controlLon + t * t * toLon;
    
    points.push([lat, lon]);
  }
  
  return points;
};

/**
 * DistanceLines component renders distance lines on the map
 * Displays visual lines connecting geohashes based on the selected calculation mode
 */
const DistanceLines: React.FC<DistanceLinesProps> = ({
  geohashes,
  config,
  distances,
}) => {
  // Memoize line generation to prevent unnecessary re-renders
  const lines = useMemo(() => {
    // Only render lines if there are distances to display
    if (distances.length === 0) {
      return null;
    }

    // Map over distances array to create Polyline components
    return distances.map(({ from, to, distance }) => {
      // Calculate centroids for from and to geohashes
      const fromCentroid = calculateCentroid(from.boundingBox);
      const toCentroid = calculateCentroid(to.boundingBox);

      // Create unique key for each line
      const key = `${from.geohash}-${to.geohash}`;

      // Generate curved path between points
      const curvedPath = generateCurvedPath(
        fromCentroid.lat,
        fromCentroid.lon,
        toCentroid.lat,
        toCentroid.lon
      );

      // Format distance for display
      const distanceText = distance >= 1 
        ? `${distance.toFixed(2)} km` 
        : `${(distance * 1000).toFixed(0)} m`;

      // Render Polyline with curved path, enhanced styling, and distance label
      return (
        <Polyline
          key={key}
          positions={curvedPath}
          color="#FF6B35"
          weight={3}
          opacity={0.85}
          smoothFactor={1}
        >
          <Tooltip 
            permanent 
            direction="center" 
            className="distance-label"
          >
            {distanceText}
          </Tooltip>
        </Polyline>
      );
    });
  }, [distances]);

  return <>{lines}</>;
};

export default DistanceLines;
