import Geohash from '../../../../GeohashMap/model/Geohash';
import { DistanceConfig, DistanceResult, Centroid } from './distanceTypes';

/**
 * Distance cache for memoization
 * Key format: "geohash1:geohash2" (sorted alphabetically)
 */
const distanceCache = new Map<string, number>();

/**
 * Generates a consistent cache key for two geohashes
 * @param geohash1 First geohash string
 * @param geohash2 Second geohash string
 * @returns Cache key string
 */
function getCacheKey(geohash1: string, geohash2: string): string {
  const [a, b] = [geohash1, geohash2].sort();
  return `${a}:${b}`;
}

/**
 * Converts degrees to radians
 * @param degrees Angle in degrees
 * @returns Angle in radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculates the centroid (center point) of a geohash bounding box
 * @param boundingBox Geohash bounding box [[swLat, swLon], [neLat, neLon]]
 * @returns Centroid with lat/lon coordinates
 */
export function calculateCentroid(
  boundingBox: [[number, number], [number, number]]
): Centroid {
  try {
    const [[swLat, swLon], [neLat, neLon]] = boundingBox;
    
    // Validate coordinates
    if (!isFinite(swLat) || !isFinite(swLon) || !isFinite(neLat) || !isFinite(neLon)) {
      console.warn('Invalid coordinates in bounding box:', boundingBox);
      return { lat: 0, lon: 0 };
    }
    
    return {
      lat: (swLat + neLat) / 2,
      lon: (swLon + neLon) / 2,
    };
  } catch (error) {
    console.error('Error calculating centroid:', error);
    return { lat: 0, lon: 0 };
  }
}

/**
 * Calculates the great-circle distance between two points using Haversine formula
 * @param point1 First centroid
 * @param point2 Second centroid
 * @returns Distance in kilometers
 */
export function haversineDistance(
  point1: Centroid,
  point2: Centroid
): number {
  try {
    // Validate input coordinates
    if (!isFinite(point1.lat) || !isFinite(point1.lon) || 
        !isFinite(point2.lat) || !isFinite(point2.lon)) {
      console.warn('Invalid coordinates for distance calculation:', point1, point2);
      return 0;
    }
    
    const R = 6371; // Earth's radius in kilometers
    
    const lat1Rad = toRadians(point1.lat);
    const lat2Rad = toRadians(point2.lat);
    const deltaLat = toRadians(point2.lat - point1.lat);
    const deltaLon = toRadians(point2.lon - point1.lon);
    
    const a = 
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const distance = R * c;
    
    // Validate result
    if (!isFinite(distance) || distance < 0) {
      console.warn('Invalid distance calculated:', distance);
      return 0;
    }
    
    return distance;
  } catch (error) {
    console.error('Error calculating haversine distance:', error);
    return 0;
  }
}

/**
 * Gets distance from cache or calculates and caches it
 * @param centroid1 First centroid
 * @param centroid2 Second centroid
 * @param geohash1 First geohash string
 * @param geohash2 Second geohash string
 * @returns Distance in kilometers
 */
function getOrCalculateDistance(
  centroid1: Centroid,
  centroid2: Centroid,
  geohash1: string,
  geohash2: string
): number {
  try {
    const cacheKey = getCacheKey(geohash1, geohash2);
    
    if (distanceCache.has(cacheKey)) {
      return distanceCache.get(cacheKey)!;
    }
    
    const distance = haversineDistance(centroid1, centroid2);
    
    // Only cache valid distances
    if (isFinite(distance) && distance >= 0) {
      distanceCache.set(cacheKey, distance);
    }
    
    return distance;
  } catch (error) {
    console.error('Error getting or calculating distance:', error);
    return 0;
  }
}

/**
 * Clears the distance cache
 */
export function clearDistanceCache(): void {
  distanceCache.clear();
}

/**
 * Calculates distances from reference geohash to all others
 * @param geohashes Array of geohashes
 * @param referenceGeohash Reference geohash string
 * @returns Array of distance results
 */
function calculateReferenceDistances(
  geohashes: Geohash[],
  referenceGeohash: string
): DistanceResult[] {
  try {
    const reference = geohashes.find(g => g.geohash === referenceGeohash);
    if (!reference) {
      console.warn(`Reference geohash "${referenceGeohash}" not found`);
      return [];
    }
    
    const refCentroid = calculateCentroid(reference.boundingBox);
    
    const results: DistanceResult[] = [];
    
    for (const geohash of geohashes) {
      if (geohash.geohash === referenceGeohash) continue;
      
      try {
        const centroid = calculateCentroid(geohash.boundingBox);
        const distance = getOrCalculateDistance(
          refCentroid,
          centroid,
          reference.geohash,
          geohash.geohash
        );
        
        results.push({
          from: reference,
          to: geohash,
          distance,
          mode: 'reference' as const,
        });
      } catch (error) {
        console.error(`Error calculating distance for geohash ${geohash.geohash}:`, error);
        // Skip this geohash and continue with others
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error in calculateReferenceDistances:', error);
    return [];
  }
}

/**
 * Calculates distances between consecutive geohashes
 * @param geohashes Array of geohashes
 * @returns Array of distance results
 */
function calculateConsecutiveDistances(
  geohashes: Geohash[]
): DistanceResult[] {
  try {
    const results: DistanceResult[] = [];
    
    for (let i = 0; i < geohashes.length - 1; i++) {
      try {
        const from = geohashes[i];
        const to = geohashes[i + 1];
        
        const fromCentroid = calculateCentroid(from.boundingBox);
        const toCentroid = calculateCentroid(to.boundingBox);
        const distance = getOrCalculateDistance(
          fromCentroid,
          toCentroid,
          from.geohash,
          to.geohash
        );
        
        results.push({
          from,
          to,
          distance,
          mode: 'consecutive',
        });
      } catch (error) {
        console.error(`Error calculating consecutive distance at index ${i}:`, error);
        // Skip this pair and continue with others
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error in calculateConsecutiveDistances:', error);
    return [];
  }
}

/**
 * For each geohash, finds and calculates distance to nearest neighbor
 * @param geohashes Array of geohashes
 * @returns Array of distance results
 */
function calculateNearestNeighborDistances(
  geohashes: Geohash[]
): DistanceResult[] {
  try {
    const results: DistanceResult[] = [];
    
    for (const geohash of geohashes) {
      try {
        const centroid = calculateCentroid(geohash.boundingBox);
        let minDistance = Infinity;
        let nearestNeighbor: Geohash | null = null;
        
        for (const other of geohashes) {
          if (other.geohash === geohash.geohash) continue;
          
          try {
            const otherCentroid = calculateCentroid(other.boundingBox);
            const distance = getOrCalculateDistance(
              centroid,
              otherCentroid,
              geohash.geohash,
              other.geohash
            );
            
            if (distance < minDistance && isFinite(distance)) {
              minDistance = distance;
              nearestNeighbor = other;
            }
          } catch (error) {
            console.error(`Error calculating distance to ${other.geohash}:`, error);
            // Skip this neighbor and continue
          }
        }
        
        if (nearestNeighbor) {
          results.push({
            from: geohash,
            to: nearestNeighbor,
            distance: minDistance,
            mode: 'nearest' as const,
          });
        }
      } catch (error) {
        console.error(`Error finding nearest neighbor for ${geohash.geohash}:`, error);
        // Skip this geohash and continue with others
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error in calculateNearestNeighborDistances:', error);
    return [];
  }
}

/**
 * Calculates distances between all pairs of geohashes
 * @param geohashes Array of geohashes
 * @returns Array of distance results
 */
function calculateAllPairsDistances(
  geohashes: Geohash[]
): DistanceResult[] {
  try {
    const results: DistanceResult[] = [];
    
    for (let i = 0; i < geohashes.length; i++) {
      for (let j = i + 1; j < geohashes.length; j++) {
        try {
          const from = geohashes[i];
          const to = geohashes[j];
          
          const fromCentroid = calculateCentroid(from.boundingBox);
          const toCentroid = calculateCentroid(to.boundingBox);
          const distance = getOrCalculateDistance(
            fromCentroid,
            toCentroid,
            from.geohash,
            to.geohash
          );
          
          results.push({
            from,
            to,
            distance,
            mode: 'allPairs',
          });
        } catch (error) {
          console.error(`Error calculating distance for pair (${i}, ${j}):`, error);
          // Skip this pair and continue with others
        }
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error in calculateAllPairsDistances:', error);
    return [];
  }
}

/**
 * Calculates distances based on the selected mode
 * @param geohashes Array of geohashes
 * @param config Distance configuration
 * @returns Array of distance results
 */
export function calculateDistances(
  geohashes: Geohash[],
  config: DistanceConfig
): DistanceResult[] {
  if (!config.enabled || geohashes.length < 2) {
    return [];
  }

  try {
    switch (config.mode) {
      case 'reference':
        if (!config.referenceGeohash) return [];
        return calculateReferenceDistances(geohashes, config.referenceGeohash);
      case 'consecutive':
        return calculateConsecutiveDistances(geohashes);
      case 'nearest':
        return calculateNearestNeighborDistances(geohashes);
      case 'allPairs':
        return calculateAllPairsDistances(geohashes);
      default:
        console.warn(`Unknown distance calculation mode: ${config.mode}`);
        return [];
    }
  } catch (error) {
    console.error('Error calculating distances:', error);
    return [];
  }
}

/**
 * Formats distance with appropriate unit
 * @param distanceKm Distance in kilometers
 * @param unit Unit preference ('km' or 'miles')
 * @returns Formatted distance string
 */
export function formatDistance(
  distanceKm: number,
  unit: 'km' | 'miles'
): string {
  try {
    // Validate input
    if (!isFinite(distanceKm) || distanceKm < 0) {
      console.warn('Invalid distance value:', distanceKm);
      return '0.00 km';
    }
    
    if (unit === 'miles') {
      const miles = distanceKm * 0.621371;
      return `${miles.toFixed(2)} mi`;
    }
    return `${distanceKm.toFixed(2)} km`;
  } catch (error) {
    console.error('Error formatting distance:', error);
    return '0.00 km';
  }
}
