import { GeohashError } from "./GeohashError";

const BASE32_CHARS = "0123456789bcdefghjkmnpqrstuvwxyz" as const;

function validateGeohash(geohash: string): void {
  if (geohash.length === 0) {
    throw new GeohashError("Geohash cannot be empty");
  }
  if (!/^[0-9b-hjkmnp-z]+$/i.test(geohash)) {
    throw new GeohashError("Invalid geohash characters");
  }
}

export { BASE32_CHARS, validateGeohash };
