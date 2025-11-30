import React, { useMemo } from "react";
import { Rectangle, Tooltip } from "react-leaflet";
import Geohash from "../model/Geohash";
import "./GeohashRectangles.css";
import {
  BOUNDING_BOX_COLOR,
  BOUNDING_BOX_OPACITY,
  REFERENCE_GEOHASH_COLOR,
} from "../config/styleConfig";
import {
  DistanceConfig,
  DistanceResult,
  HighlightState,
} from "../../components/AdvancedOptions/DistanceAnalysis/utils/distanceTypes";

interface GeohashRectanglesProps {
  geohashes: Geohash[];
  distanceConfig?: DistanceConfig;
  distances?: DistanceResult[];
  highlightState?: HighlightState;
  onGeohashClick?: (geohash: string) => void;
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
    distanceConfig.mode === "reference" &&
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
 * @param highlightState - Current highlight state
 * @returns Color string
 */
const getRectangleColor = (
  geohash: Geohash,
  distanceConfig?: DistanceConfig,
  highlightState?: HighlightState
): string => {
  // Use green color if this geohash is highlighted
  if (highlightState?.highlightedGeohash === geohash.geohash) {
    return "#10B981"; // Green for highlighted geohash
  }

  // Use green color if this geohash is part of a highlighted line
  if (highlightState?.highlightedLine) {
    const { from, to } = highlightState.highlightedLine;
    if (geohash.geohash === from || geohash.geohash === to) {
      return "#10B981"; // Green for highlighted line endpoints
    }
  }

  // Use green color for reference geohash in reference mode (if not dimmed)
  if (
    distanceConfig?.enabled &&
    distanceConfig.mode === "reference" &&
    geohash.geohash === distanceConfig.referenceGeohash &&
    !highlightState?.highlightedGeohash &&
    !highlightState?.highlightedLine
  ) {
    return REFERENCE_GEOHASH_COLOR; // Green for reference
  }
  return BOUNDING_BOX_COLOR; // Default purple
};

/**
 * Gets the border weight for a geohash rectangle
 * @param geohash - The geohash object
 * @param distanceConfig - Distance analysis configuration
 * @param highlightState - Current highlight state
 * @returns Border weight number
 */
const getRectangleWeight = (
  geohash: Geohash,
  distanceConfig?: DistanceConfig,
  highlightState?: HighlightState
): number => {
  // Extra thick border if this geohash is highlighted
  if (highlightState?.highlightedGeohash === geohash.geohash) {
    return 4;
  }

  // Thick border if this geohash is part of a highlighted line
  if (highlightState?.highlightedLine) {
    const { from, to } = highlightState.highlightedLine;
    if (geohash.geohash === from || geohash.geohash === to) {
      return 4;
    }
  }

  // Use thicker border for reference geohash in reference mode
  if (
    distanceConfig?.enabled &&
    distanceConfig.mode === "reference" &&
    geohash.geohash === distanceConfig.referenceGeohash
  ) {
    return 3; // Thicker border for reference
  }
  return 1; // Default weight
};

/**
 * Gets the opacity for a geohash rectangle
 * @param geohash - The geohash object
 * @param highlightState - Current highlight state
 * @returns Opacity value
 */
const getRectangleOpacity = (
  geohash: Geohash,
  highlightState?: HighlightState
): number => {
  if (!highlightState) return BOUNDING_BOX_OPACITY;

  // If something is highlighted
  if (highlightState.highlightedGeohash || highlightState.highlightedLine) {
    // Check if this geohash is highlighted
    if (highlightState.highlightedGeohash === geohash.geohash) {
      return 1; // Full opacity
    }

    // Check if this geohash is part of highlighted line
    if (highlightState.highlightedLine) {
      const { from, to } = highlightState.highlightedLine;
      if (geohash.geohash === from || geohash.geohash === to) {
        return 1; // Full opacity
      }
    }

    // Dim other geohashes
    return 0.3;
  }

  return BOUNDING_BOX_OPACITY;
};

/**
 * Component that renders rectangular overlays for each geohash on the map
 * Each rectangle includes a tooltip showing the geohash code
 */
const GeohashRectangles: React.FC<GeohashRectanglesProps> = ({
  geohashes,
  distanceConfig,
  distances,
  highlightState,
  onGeohashClick,
}) => {
  const rectangles = useMemo(
    () =>
      geohashes.map((geohash) => {
        const color = getRectangleColor(
          geohash,
          distanceConfig,
          highlightState
        );
        const weight = getRectangleWeight(
          geohash,
          distanceConfig,
          highlightState
        );
        const opacity = getRectangleOpacity(geohash, highlightState);
        const tooltipContent = getTooltipContent(
          geohash,
          distanceConfig,
          distances
        );

        return (
          <Rectangle
            bounds={geohash.boundingBox}
            color={color}
            opacity={opacity}
            weight={weight}
            key={generateKey(geohash.geohash, "rectangle")}
            eventHandlers={{
              click: () => {
                if (onGeohashClick && distanceConfig?.enabled) {
                  onGeohashClick(geohash.geohash);
                }
              },
            }}
            className={
              distanceConfig?.enabled ? "geohash-rectangle-clickable" : ""
            }
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
    [geohashes, distanceConfig, distances, highlightState, onGeohashClick]
  );

  return <>{rectangles}</>;
};

export default React.memo(GeohashRectangles);
