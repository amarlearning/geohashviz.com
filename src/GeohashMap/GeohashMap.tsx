import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import Geohash from "./model/Geohash";
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM_LEVEL,
  MAX_BOUNDS,
  MIN_ZOOM_LEVEL,
} from "./config/mapConfig";
import BoundsFitter from "./components/BoundsFitter";
import GeohashRectangles from "./components/GeohashRectangles";
import DistanceLines from "../components/AdvancedOptions/DistanceAnalysis/DistanceLines";
import {
  DistanceConfig,
  DistanceResult,
  HighlightState,
} from "../components/AdvancedOptions/DistanceAnalysis/utils/distanceTypes";

interface LeafletContainerProps {
  geohashes: Geohash[];
  distanceConfig?: DistanceConfig;
  distances?: DistanceResult[];
  highlightState?: HighlightState;
  onGeohashClick?: (geohash: string) => void;
  onLineClick?: (from: string, to: string) => void;
}

export interface GeohashMapRef {
  fitBounds: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

/**
 * Main map container component that displays geohashes on a Google Maps layer
 * Handles map initialization and contains child components for bounds fitting
 * and geohash visualization
 */
const GeohashMap = forwardRef<GeohashMapRef, LeafletContainerProps>(
  (
    {
      geohashes,
      distanceConfig,
      distances,
      highlightState,
      onGeohashClick,
      onLineClick,
    },
    ref
  ) => {
    const mapInstanceRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      fitBounds: () => {
        if (mapInstanceRef.current && geohashes.length > 0) {
          const bounds = new LatLngBounds(geohashes[0].boundingBox);
          geohashes.forEach((geohash) => {
            bounds.extend(geohash.boundingBox[0]);
            bounds.extend(geohash.boundingBox[1]);
          });

          mapInstanceRef.current.fitBounds(bounds, {
            padding: [50, 50],
            maxZoom: 15,
          });
        }
      },
      zoomIn: () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.zoomIn();
        }
      },
      zoomOut: () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.zoomOut();
        }
      },
    }));
    return (
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM_LEVEL}
        minZoom={MIN_ZOOM_LEVEL}
        maxBounds={MAX_BOUNDS}
        className="map-container"
        ref={mapInstanceRef}
      >
        <TileLayer
          attribution="Map data ©2024 Google"
          url="https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
          className="map-tiles"
        />
        <BoundsFitter geohashes={geohashes} />
        <GeohashRectangles
          geohashes={geohashes}
          distanceConfig={distanceConfig}
          distances={distances}
          highlightState={highlightState}
          onGeohashClick={onGeohashClick}
        />
        {distances && distances.length > 0 && distanceConfig && (
          <DistanceLines
            geohashes={geohashes}
            config={distanceConfig}
            distances={distances}
            highlightState={highlightState}
            onLineClick={onLineClick}
          />
        )}
      </MapContainer>
    );
  }
);

export default GeohashMap;
