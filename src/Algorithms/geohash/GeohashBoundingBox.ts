import { GeoPoint, GeohashBounds } from "./GeohashTypes";
import { BASE32_CHARS, validateGeohash } from "./GeohashEncoder";
import Geohash from "../../LeafletContainer/model/Geohash";
import { GeohashError } from "./GeohashError";

const memoizedBoundingBoxes = new Map<string, GeohashBounds>();

export function getBoundingBox(geohash: string): GeohashBounds {
  const cached = memoizedBoundingBoxes.get(geohash);
  if (cached) return cached;

  validateGeohash(geohash);
  geohash = geohash.toLowerCase();

  let evenBit = true;
  let latMin = -90,
    latMax = 90;
  let lonMin = -180,
    lonMax = 180;

  for (let i = 0; i < geohash.length; i++) {
    const chr = geohash.charAt(i);
    const idx = BASE32_CHARS.indexOf(chr);
    if (idx === -1) throw new GeohashError("Invalid geohash character");

    for (let n = 4; n >= 0; n--) {
      const bitN = (idx >> n) & 1;
      if (evenBit) {
        // longitude
        const lonMid = (lonMin + lonMax) / 2;
        if (bitN === 1) {
          lonMin = lonMid;
        } else {
          lonMax = lonMid;
        }
      } else {
        // latitude
        const latMid = (latMin + latMax) / 2;
        if (bitN === 1) {
          latMin = latMid;
        } else {
          latMax = latMid;
        }
      }
      evenBit = !evenBit;
    }
  }

  const sw: GeoPoint = { lat: latMin, lon: lonMin };
  const ne: GeoPoint = { lat: latMax, lon: lonMax };

  const bounds: GeohashBounds = { sw, ne };

  memoizedBoundingBoxes.set(geohash, bounds);
  return bounds;
}

function createGeohashObjects(geohashes: string[]): Geohash[] {
  return geohashes.reduce((acc: Geohash[], geohash: string) => {
    try {
      validateGeohash(geohash);
      const boundingBox = getBoundingBox(geohash);
      const geohashObj: Geohash = {
        boundingBox: [
          [boundingBox.sw.lat, boundingBox.sw.lon],
          [boundingBox.ne.lat, boundingBox.ne.lon],
        ],
        geohash,
      };
      acc.push(geohashObj);
    } catch (error) {
      console.warn(`Skipping invalid geohash: ${geohash}`, error);
    }
    return acc;
  }, []);
}

export default createGeohashObjects;
