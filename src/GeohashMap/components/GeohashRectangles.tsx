import React, { useMemo } from "react";
import { Rectangle, Tooltip } from "react-leaflet";
import Geohash from "../model/Geohash";
import "./GeohashRectangles.css";
import {
  BOUNDING_BOX_COLOR,
  BOUNDING_BOX_OPACITY,
} from "../config/styleConfig";

interface GeohashRectanglesProps {
  geohashes: Geohash[];
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
 * Component that renders rectangular overlays for each geohash on the map
 * Each rectangle includes a tooltip showing the geohash code
 */
const GeohashRectangles: React.FC<GeohashRectanglesProps> = ({ geohashes }) => {
  const rectangles = useMemo(
    () =>
      geohashes.map((geohash) => (
        <Rectangle
          bounds={geohash.boundingBox}
          color={BOUNDING_BOX_COLOR}
          opacity={BOUNDING_BOX_OPACITY}
          weight={1}
          key={generateKey(geohash.geohash, "rectangle")}
        >
          <Tooltip
            key={generateKey(geohash.geohash, "tooltip")}
            permanent
            direction={"top"}
            className="custom-tooltip"
          >
            {geohash.geohash}
          </Tooltip>
        </Rectangle>
      )),
    [geohashes]
  );

  return <>{rectangles}</>;
};

export default React.memo(GeohashRectangles);
