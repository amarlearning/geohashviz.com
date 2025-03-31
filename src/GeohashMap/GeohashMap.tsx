import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Geohash from "./model/Geohash";
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM_LEVEL,
  MAX_BOUNDS,
  MIN_ZOOM_LEVEL,
} from "./config/mapConfig";
import BoundsFitter from "./components/BoundsFitter";
import GeohashRectangles from "./components/GeohashRectangles";

interface LeafletContainerProps {
  geohashes: Geohash[];
}

/**
 * Main map container component that displays geohashes on a Google Maps layer
 * Handles map initialization and contains child components for bounds fitting
 * and geohash visualization
 */
const GeohashMap: React.FC<LeafletContainerProps> = ({ geohashes }) => {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM_LEVEL}
      minZoom={MIN_ZOOM_LEVEL}
      maxBounds={MAX_BOUNDS}
      className="map-container"
    >
      <TileLayer
        attribution="Map data ©2024 Google"
        url="https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
        className="map-tiles"
      />
      <BoundsFitter geohashes={geohashes} />
      <GeohashRectangles geohashes={geohashes} />
    </MapContainer>
  );
};

export default GeohashMap;
