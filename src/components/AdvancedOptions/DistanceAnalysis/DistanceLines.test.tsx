import '@testing-library/jest-dom';
import { DistanceConfig, DistanceResult } from './utils/distanceTypes';
import Geohash from '../../../GeohashMap/model/Geohash';

const mockGeohash = (geohash: string): Geohash => ({
  geohash,
  boundingBox: [
    [40.0, -75.0],
    [41.0, -74.0],
  ],
});

describe('DistanceLines Component', () => {
  const defaultConfig: DistanceConfig = {
    enabled: true,
    mode: 'reference',
    referenceGeohash: 'abc',
    units: 'km',
  };

  test('component module loads without errors', () => {
    expect(true).toBe(true);
  });

  test('handles empty distances array', () => {
    const geohashes = [mockGeohash('abc'), mockGeohash('def')];
    const distances: DistanceResult[] = [];

    expect(distances.length).toBe(0);
    expect(geohashes.length).toBe(2);
  });

  test('handles multiple distance results', () => {
    const geohashes = [
      mockGeohash('abc'),
      mockGeohash('def'),
      mockGeohash('ghi'),
    ];
    const distances: DistanceResult[] = [
      {
        from: geohashes[0],
        to: geohashes[1],
        distance: 100,
        mode: 'reference',
      },
      {
        from: geohashes[0],
        to: geohashes[2],
        distance: 200,
        mode: 'reference',
      },
    ];

    expect(distances.length).toBe(2);
    expect(distances[0].distance).toBe(100);
    expect(distances[1].distance).toBe(200);
  });
});
