import Geohash from "../LeafletContainer/model/Geohash";

const base32 = "0123456789bcdefghjkmnpqrstuvwxyz"; // (geohash-specific) Base32 map

export function getBoundingBox(geohash: string): {
  sw: { lat: number; lon: number };
  ne: { lat: number; lon: number };
} {
  if (geohash.length === 0) throw new Error("Invalid geohash");

  geohash = geohash.toLowerCase();

  let evenBit = true;
  let latMin = -90,
    latMax = 90;
  let lonMin = -180,
    lonMax = 180;

  for (let i = 0; i < geohash.length; i++) {
    const chr = geohash.charAt(i);
    const idx = base32.indexOf(chr);
    if (idx === -1) throw new Error("Invalid geohash");

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

  const bounds = {
    sw: { lat: latMin, lon: lonMin },
    ne: { lat: latMax, lon: lonMax },
  };

  return bounds;
}

function createGeohashObjects(geohashes: string[]): Geohash[] {
  return geohashes.reduce((acc: Geohash[], geohash: string) => {
    try {
      const boundingBox = getBoundingBox(geohash);
      const geohashObj: Geohash = {
        boundingBox: [
          [boundingBox.sw.lat, boundingBox.sw.lon],
          [boundingBox.ne.lat, boundingBox.ne.lon],
        ],
        geohash,
      };
      acc.push(geohashObj);
    } catch (error) {}
    return acc;
  }, []);
}

export default createGeohashObjects;
