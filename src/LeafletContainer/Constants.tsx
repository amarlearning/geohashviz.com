import { LatLng, LatLngBounds } from "leaflet";

export const MIN_ZOOM_LEVEL = 3;
export const DEFAULT_ZOOM_LEVEL = 3;
export const DEFAULT_CENTER = new LatLng(26.461624, 80.329236);
export const BOUNDING_BOX_COLOR = "BLUE";
export const BOUNDING_BOX_OPACITY = 1;
export const MAX_BOUNDS = new LatLngBounds(
  new LatLng(-90, -180),
  new LatLng(90, 180)
);
