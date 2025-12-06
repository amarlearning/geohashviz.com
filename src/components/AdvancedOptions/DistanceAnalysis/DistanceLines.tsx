import React, { useMemo } from "react";
import { Polyline, Tooltip } from "react-leaflet";
import Geohash from "../../../GeohashMap/model/Geohash";
import {
  DistanceConfig,
  DistanceResult,
  HighlightState,
} from "./utils/distanceTypes";
import { calculateCentroid, formatDistance } from "./utils/distanceCalculator";
import "./DistanceLines.css";

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
  /** Current highlight state */
  highlightState?: HighlightState;
  /** Callback when a line is clicked */
  onLineClick?: (from: string, to: string) => void;
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
 * Check if a line should be highlighted
 */
const isLineHighlighted = (
  from: string,
  to: string,
  highlightState?: HighlightState
): boolean => {
  if (!highlightState) return false;

  // Highlight if this specific line is selected
  if (highlightState.highlightedLine) {
    const { from: hFrom, to: hTo } = highlightState.highlightedLine;
    return (from === hFrom && to === hTo) || (from === hTo && to === hFrom);
  }

  // Highlight if either endpoint matches the highlighted geohash
  if (highlightState.highlightedGeohash) {
    return (
      from === highlightState.highlightedGeohash ||
      to === highlightState.highlightedGeohash
    );
  }

  return false;
};

/**
 * Check if a line should be dimmed
 */
const isLineDimmed = (
  from: string,
  to: string,
  highlightState?: HighlightState
): boolean => {
  if (!highlightState) return false;

  // If something is highlighted, dim everything else
  if (highlightState.highlightedLine || highlightState.highlightedGeohash) {
    return !isLineHighlighted(from, to, highlightState);
  }

  return false;
};

/**
 * DistanceLines component renders distance lines on the map
 * Displays visual lines connecting geohashes based on the selected calculation mode
 */
const DistanceLines: React.FC<DistanceLinesProps> = ({
  geohashes,
  config,
  distances,
  highlightState,
  onLineClick,
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

      // Generate curved path between points
      const curvedPath = generateCurvedPath(
        fromCentroid.lat,
        fromCentroid.lon,
        toCentroid.lat,
        toCentroid.lon
      );

      // Format distance for display using selected units
      const distanceText = formatDistance(distance, config.units);

      // Determine if this line is highlighted or dimmed
      const highlighted = isLineHighlighted(
        from.geohash,
        to.geohash,
        highlightState
      );
      const dimmed = isLineDimmed(from.geohash, to.geohash, highlightState);

      // Create unique key for each line (include highlight state to force re-render)
      const highlightKey = highlighted
        ? "-highlighted"
        : dimmed
          ? "-dimmed"
          : "";
      const key = `${from.geohash}-${to.geohash}${highlightKey}`;

      // Dynamic styling based on highlight state
      const lineColor = highlighted ? "#10B981" : "#FF6B35";
      const lineWeight = highlighted ? 5 : 3;
      const lineOpacity = dimmed ? 0.2 : highlighted ? 1 : 0.85;

      // Render Polyline with curved path, enhanced styling, and distance label
      return (
        <Polyline
          key={key}
          positions={curvedPath}
          color={lineColor}
          weight={lineWeight}
          opacity={lineOpacity}
          smoothFactor={1}
          eventHandlers={{
            click: () => {
              if (onLineClick) {
                onLineClick(from.geohash, to.geohash);
              }
            },
          }}
          className={
            highlighted
              ? "distance-line-highlighted"
              : dimmed
                ? "distance-line-dimmed"
                : "distance-line"
          }
        >
          <Tooltip
            permanent
            direction="center"
            className={`distance-label ${highlighted ? "distance-label-highlighted" : dimmed ? "distance-label-dimmed" : ""}`}
          >
            {highlighted
              ? `${from.geohash} ↔ ${to.geohash}: ${distanceText}`
              : distanceText}
          </Tooltip>
        </Polyline>
      );
    });
  }, [distances, highlightState, onLineClick, config.units]);

  return <>{lines}</>;
};

export default DistanceLines;
