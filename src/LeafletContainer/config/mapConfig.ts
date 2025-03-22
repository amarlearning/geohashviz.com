import { LatLng, LatLngBounds } from "leaflet";

/**
 * Geographic constants for map boundaries
 */
const GEO_LIMITS = {
  MIN_LAT: -90,
  MAX_LAT: 90,
  MIN_LON: -180,
  MAX_LON: 180,
} as const;

/**
 * Minimum zoom level allowed for the map
 * Prevents zooming out too far
 */
export const MIN_ZOOM_LEVEL: number = 3;

/**
 * Default zoom level when map first loads
 */
export const DEFAULT_ZOOM_LEVEL: number = 4;

/**
 * Default center position of the map (India)
 * @constant
 */
export const DEFAULT_CENTER: LatLng = new LatLng(21.54913, 79.002363);

/**
 * Maximum bounds of the map (whole world)
 * Prevents panning beyond these coordinates
 * @constant
 */
export const MAX_BOUNDS: LatLngBounds = new LatLngBounds(
  new LatLng(GEO_LIMITS.MIN_LAT, GEO_LIMITS.MIN_LON),
  new LatLng(GEO_LIMITS.MAX_LAT, GEO_LIMITS.MAX_LON)
);
