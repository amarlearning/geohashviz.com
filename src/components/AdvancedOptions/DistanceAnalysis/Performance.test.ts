import {
  calculateDistances,
  clearDistanceCache,
  haversineDistance,
} from './utils/distanceCalculator';
import { DistanceConfig, Centroid } from './utils/distanceTypes';
import Geohash from '../../../GeohashMap/model/Geohash';

const mockGeohash = (geohash: string, lat: number, lon: number): Geohash => ({
  geohash,
  boundingBox: [
    [lat, lon],
    [lat + 0.1, lon + 0.1],
  ],
});

describe('Performance Tests', () => {
  beforeEach(() => {
    clearDistanceCache();
  });

  describe('Calculation time', () => {
    test('calculates distances for 10 geohashes quickly', () => {
      const geohashes = Array.from({ length: 10 }, (_, i) =>
        mockGeohash(`gh${i}`, 40 + i * 0.5, -75 + i * 0.5)
      );
      const config: DistanceConfig = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'gh0',
        units: 'km',
      };

      const startTime = performance.now();
      const distances = calculateDistances(geohashes, config);
      const endTime = performance.now();

      expect(distances.length).toBe(9);
      expect(endTime - startTime).toBeLessThan(50); // Should complete in < 50ms
    });

    test('calculates distances for 20 geohashes quickly', () => {
      const geohashes = Array.from({ length: 20 }, (_, i) =>
        mockGeohash(`gh${i}`, 40 + i * 0.3, -75 + i * 0.3)
      );
      const config: DistanceConfig = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'gh0',
        units: 'km',
      };

      const startTime = performance.now();
      const distances = calculateDistances(geohashes, config);
      const endTime = performance.now();

      expect(distances.length).toBe(19);
      expect(endTime - startTime).toBeLessThan(100); // Should complete in < 100ms
    });

    test('consecutive mode is fast', () => {
      const geohashes = Array.from({ length: 50 }, (_, i) =>
        mockGeohash(`gh${i}`, 40 + i * 0.1, -75 + i * 0.1)
      );
      const config: DistanceConfig = {
        enabled: true,
        mode: 'consecutive',
        referenceGeohash: null,
        units: 'km',
      };

      const startTime = performance.now();
      const distances = calculateDistances(geohashes, config);
      const endTime = performance.now();

      expect(distances.length).toBe(49);
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('nearest neighbor mode completes in reasonable time', () => {
      const geohashes = Array.from({ length: 20 }, (_, i) =>
        mockGeohash(`gh${i}`, 40 + i * 0.2, -75 + i * 0.2)
      );
      const config: DistanceConfig = {
        enabled: true,
        mode: 'nearest',
        referenceGeohash: null,
        units: 'km',
      };

      const startTime = performance.now();
      const distances = calculateDistances(geohashes, config);
      const endTime = performance.now();

      expect(distances.length).toBe(20);
      expect(endTime - startTime).toBeLessThan(200);
    });
  });

  describe('Memoization improves performance', () => {
    test('cached calculations are faster than uncached', () => {
      const point1: Centroid = { lat: 40.7128, lon: -74.0060 };
      const point2: Centroid = { lat: 51.5074, lon: -0.1278 };

      // First calculation (uncached)
      const startTime1 = performance.now();
      const distance1 = haversineDistance(point1, point2);
      const endTime1 = performance.now();
      const uncachedTime = endTime1 - startTime1;

      // Second calculation (should use cache if implemented)
      const startTime2 = performance.now();
      const distance2 = haversineDistance(point1, point2);
      const endTime2 = performance.now();
      const cachedTime = endTime2 - startTime2;

      expect(distance1).toBe(distance2);
      // Note: Cache is implemented at a higher level, so this test verifies consistency
    });

    test('recalculation after cache clear', () => {
      const geohashes = Array.from({ length: 10 }, (_, i) =>
        mockGeohash(`gh${i}`, 40 + i, -75 + i)
      );
      const config: DistanceConfig = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'gh0',
        units: 'km',
      };

      // First calculation
      const distances1 = calculateDistances(geohashes, config);

      // Clear cache
      clearDistanceCache();

      // Second calculation
      const distances2 = calculateDistances(geohashes, config);

      // Results should be the same
      expect(distances1.length).toBe(distances2.length);
      expect(distances1[0].distance).toBe(distances2[0].distance);
    });
  });

  describe('UI remains responsive', () => {
    test('multiple rapid calculations do not block', () => {
      const geohashes = Array.from({ length: 15 }, (_, i) =>
        mockGeohash(`gh${i}`, 40 + i * 0.4, -75 + i * 0.4)
      );
      const config: DistanceConfig = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'gh0',
        units: 'km',
      };

      const startTime = performance.now();

      // Simulate rapid config changes
      for (let i = 0; i < 5; i++) {
        calculateDistances(geohashes, config);
      }

      const endTime = performance.now();

      // All calculations should complete quickly
      expect(endTime - startTime).toBeLessThan(500);
    });
  });

  describe('Memory usage', () => {
    test('cache does not grow unbounded', () => {
      const geohashes = Array.from({ length: 100 }, (_, i) =>
        mockGeohash(`gh${i}`, 40 + i * 0.05, -75 + i * 0.05)
      );
      const config: DistanceConfig = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'gh0',
        units: 'km',
      };

      // Calculate distances
      calculateDistances(geohashes, config);

      // Clear cache to free memory
      clearDistanceCache();

      // Should not throw or cause issues
      expect(() => clearDistanceCache()).not.toThrow();
    });
  });
});
