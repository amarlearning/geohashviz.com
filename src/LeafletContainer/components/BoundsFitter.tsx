import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import Geohash from "../model/Geohash";

const BoundsFitter: React.FC<{ geohashes: Geohash[] }> = ({ geohashes }) => {
  const map = useMap();

  useEffect(() => {
    if (geohashes.length > 0) {
      const bounds = new LatLngBounds(geohashes[0].boundingBox);
      geohashes.forEach(geohash => {
        bounds.extend(geohash.boundingBox[0]);
        bounds.extend(geohash.boundingBox[1]);
      });

      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 15
      });
    }
  }, [map, geohashes]);

  return null;
};

export default BoundsFitter; 