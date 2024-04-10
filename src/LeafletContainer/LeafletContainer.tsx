import React from "react";
import { MapContainer, TileLayer, Rectangle, Tooltip } from "react-leaflet";
import Geohash from "./model/Geohash";
import {
  BOUNDING_BOX_COLOR,
  BOUNDING_BOX_OPACITY,
  DEFAULT_CENTER,
  DEFAULT_ZOOM_LEVEL,
  MAX_BOUNDS,
  MIN_ZOOM_LEVEL,
} from "./Constants";

const LeafletContainer: React.FC<{ geohashes: Geohash[] }> = ({
  geohashes,
}) => {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM_LEVEL}
      minZoom={MIN_ZOOM_LEVEL}
      maxBounds={MAX_BOUNDS}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geohashes.map((geohash) => (
        <Rectangle
          bounds={geohash.boundingBox}
          color={BOUNDING_BOX_COLOR}
          opacity={BOUNDING_BOX_OPACITY}
        >
          <Tooltip permanent>{geohash.geohash}</Tooltip>
        </Rectangle>
      ))}
    </MapContainer>
  );
};

export default LeafletContainer;
