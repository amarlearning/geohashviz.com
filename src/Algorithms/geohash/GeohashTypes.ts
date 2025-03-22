interface GeoPoint {
  lat: number;
  lon: number;
}

interface GeohashBounds {
  sw: GeoPoint;
  ne: GeoPoint;
}

export type { GeoPoint, GeohashBounds };
