import React, { useMemo } from "react";
import { Rectangle, Tooltip } from "react-leaflet";
import Geohash from "../model/Geohash";
import "./GeohashRectangles.css";
import {
  BOUNDING_BOX_COLOR,
  BOUNDING_BOX_OPACITY,
  REFERENCE_GEOHASH_COLOR,
} from "../config/styleConfig";
import { DistanceConfig, DistanceResult } from "../../components/AdvancedOptions/DistanceAnalysis/utils/distanceTypes";

interface GeohashRectanglesProps {
  geohashes: Geohash[];
  distanceConfig?: DistanceConfig;
  distances?: DistanceResult[];
}

/**
 * Generates a unique key for React elements
 * @param geohash - The geohash string
 * @param polygon - The type of element (rectangle/tooltip)
 * @returns A unique string key
 */
const generateKey = (geohash: string, polygon: string): string => {
  return `${geohash}-polygon-${(Math.random() + 1).toString(36).substring(10)}`;
};

/**
 * Gets tooltip content with optional distance information
 * @param geohash - The geohash object
 * @param distanceConfig - Distance analysis configuration
 * @param distances - Array of distance results
 * @returns Formatted tooltip content
 */
const getTooltipContent = (
  geohash: Geohash,
  distanceConfig?: DistanceConfig,
  distances?: DistanceResult[]
): string => {
  // Check if this is the reference geohash in reference mode
  if (
    distanceConfig?.enabled &&
    distanceConfig.mode === 'reference' &&
    geohash.geohash === distanceConfig.referenceGeohash
  ) {
    return `⭐ ${geohash.geohash} (Reference)`;
  }

  // Return just the geohash without distance information
  return geohash.geohash;
};

/**
 * Gets the color for a geohash rectangle
 * @param geohash - The geohash object
 * @param distanceConfig - Distance analysis configuration
 * @returns Color string
 */
const getRectangleColor = (
  geohash: Geohash,
  distanceConfig?: DistanceConfig
): string => {
  // Use green color for reference geohash in reference mode
  if (
    distanceConfig?.enabled &&
    distanceConfig.mode === 'reference' &&
    geohash.geohash === distanceConfig.referenceGeohash
  ) {
    return REFERENCE_GEOHASH_COLOR; // Green for reference
  }
  return BOUNDING_BOX_COLOR; // Default purple
};

/**
 * Gets the border weight for a geohash rectangle
 * @param geohash - The geohash object
 * @param distanceConfig - Distance analysis configuration
 * @returns Border weight number
 */
const getRectangleWeight = (
  geohash: Geohash,
  distanceConfig?: DistanceConfig
): number => {
  // Use thicker border for reference geohash in reference mode
  if (
    distanceConfig?.enabled &&
    distanceConfig.mode === 'reference' &&
    geohash.geohash === distanceConfig.referenceGeohash
  ) {
    return 3; // Thicker border for reference
  }
  return 1; // Default weight
};

/**
 * Component that renders rectangular overlays for each geohash on the map
 * Each rectangle includes a tooltip showing the geohash code
 */
const GeohashRectangles: React.FC<GeohashRectanglesProps> = ({ 
  geohashes, 
  distanceConfig, 
  distances 
}) => {
  const rectangles = useMemo(
    () =>
      geohashes.map((geohash) => {
        const color = getRectangleColor(geohash, distanceConfig);
        const weight = getRectangleWeight(geohash, distanceConfig);
        const tooltipContent = getTooltipContent(geohash, distanceConfig, distances);

        return (
          <Rectangle
            bounds={geohash.boundingBox}
            color={color}
            opacity={BOUNDING_BOX_OPACITY}
            weight={weight}
            key={generateKey(geohash.geohash, "rectangle")}
          >
            <Tooltip
              key={generateKey(geohash.geohash, "tooltip")}
              permanent
              direction={"top"}
              className="custom-tooltip"
            >
              {tooltipContent}
            </Tooltip>
          </Rectangle>
        );
      }),
    [geohashes, distanceConfig, distances]
  );

  return <>{rectangles}</>;
};

export default React.memo(GeohashRectangles);
