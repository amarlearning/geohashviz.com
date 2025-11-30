import {
  calculateCentroid,
  haversineDistance,
  formatDistance,
  clearDistanceCache,
} from "./distanceCalculator";
import { Centroid } from "./distanceTypes";

describe("Distance Calculator Utilities", () => {
  describe("calculateCentroid", () => {
    test("calculates centroid for a simple bounding box", () => {
      const boundingBox: [[number, number], [number, number]] = [
        [40.0, -75.0],
        [41.0, -74.0],
      ];
      const centroid = calculateCentroid(boundingBox);

      expect(centroid.lat).toBe(40.5);
      expect(centroid.lon).toBe(-74.5);
    });

    test("calculates centroid for equator crossing", () => {
      const boundingBox: [[number, number], [number, number]] = [
        [-1.0, 0.0],
        [1.0, 2.0],
      ];
      const centroid = calculateCentroid(boundingBox);

      expect(centroid.lat).toBe(0.0);
      expect(centroid.lon).toBe(1.0);
    });

    test("calculates centroid for prime meridian crossing", () => {
      const boundingBox: [[number, number], [number, number]] = [
        [50.0, -1.0],
        [52.0, 1.0],
      ];
      const centroid = calculateCentroid(boundingBox);

      expect(centroid.lat).toBe(51.0);
      expect(centroid.lon).toBe(0.0);
    });
  });

  describe("haversineDistance", () => {
    test("calculates distance between New York and London", () => {
      const nyc: Centroid = { lat: 40.7128, lon: -74.006 };
      const london: Centroid = { lat: 51.5074, lon: -0.1278 };

      const distance = haversineDistance(nyc, london);

      // Expected distance is approximately 5570 km
      expect(distance).toBeGreaterThan(5500);
      expect(distance).toBeLessThan(5600);
    });

    test("calculates distance between same point returns zero", () => {
      const point: Centroid = { lat: 40.7128, lon: -74.006 };

      const distance = haversineDistance(point, point);

      expect(distance).toBe(0);
    });

    test("calculates distance between nearby points", () => {
      const point1: Centroid = { lat: 40.7128, lon: -74.006 };
      const point2: Centroid = { lat: 40.7589, lon: -73.9851 };

      const distance = haversineDistance(point1, point2);

      // Expected distance is approximately 6-7 km
      expect(distance).toBeGreaterThan(5);
      expect(distance).toBeLessThan(8);
    });

    test("calculates distance across equator", () => {
      const north: Centroid = { lat: 10.0, lon: 0.0 };
      const south: Centroid = { lat: -10.0, lon: 0.0 };

      const distance = haversineDistance(north, south);

      // Expected distance is approximately 2223 km (20 degrees of latitude)
      expect(distance).toBeGreaterThan(2200);
      expect(distance).toBeLessThan(2250);
    });
  });

  describe("formatDistance", () => {
    test("formats distance in kilometers", () => {
      const result = formatDistance(123.456, "km");
      expect(result).toBe("123.46 km");
    });

    test("formats distance in miles", () => {
      const result = formatDistance(100, "miles");
      // 100 km * 0.621371 = 62.1371 miles
      expect(result).toBe("62.14 mi");
    });

    test("formats small distances in kilometers", () => {
      const result = formatDistance(0.5, "km");
      expect(result).toBe("0.50 km");
    });

    test("formats small distances in miles", () => {
      const result = formatDistance(1.0, "miles");
      expect(result).toBe("0.62 mi");
    });

    test("formats large distances in kilometers", () => {
      const result = formatDistance(12345.678, "km");
      expect(result).toBe("12345.68 km");
    });
  });

  describe("memoization cache", () => {
    beforeEach(() => {
      clearDistanceCache();
    });

    test("cache can be cleared", () => {
      // This test verifies clearDistanceCache doesn't throw
      expect(() => clearDistanceCache()).not.toThrow();
    });
  });
});
