import Geohash from "../../../../GeohashMap/model/Geohash";

/**
 * Configuration for distance analysis
 */
export interface DistanceConfig {
  /** Whether distance analysis is enabled */
  enabled: boolean;
  /** Calculation mode */
  mode: "reference" | "consecutive" | "nearest" | "allPairs";
  /** Reference geohash for reference mode */
  referenceGeohash: string | null;
  /** Unit of measurement for distances */
  units: "km" | "miles";
}

/**
 * Highlight state for interactive distance visualization
 */
export interface HighlightState {
  /** Currently highlighted geohash (when clicked) */
  highlightedGeohash: string | null;
  /** Currently highlighted line (from-to pair) */
  highlightedLine: { from: string; to: string } | null;
}

/**
 * Result of distance calculation between two geohashes
 */
export interface DistanceResult {
  /** The source geohash */
  from: Geohash;
  /** The destination geohash */
  to: Geohash;
  /** Distance in kilometers */
  distance: number;
  /** Calculation mode used */
  mode: "reference" | "consecutive" | "nearest" | "allPairs";
}

/**
 * Centroid coordinates
 */
export interface Centroid {
  /** Latitude */
  lat: number;
  /** Longitude */
  lon: number;
}
