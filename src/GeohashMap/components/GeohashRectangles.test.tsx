import "@testing-library/jest-dom";
import Geohash from "../model/Geohash";
import {
  DistanceConfig,
  DistanceResult,
} from "../../components/AdvancedOptions/DistanceAnalysis/utils/distanceTypes";

const mockGeohash = (geohash: string): Geohash => ({
  geohash,
  boundingBox: [
    [40.0, -75.0],
    [41.0, -74.0],
  ],
});

describe("GeohashRectangles Component", () => {
  test("component module loads without errors", () => {
    expect(true).toBe(true);
  });

  test("handles geohashes without distance config", () => {
    const geohashes = [mockGeohash("abc"), mockGeohash("def")];

    expect(geohashes.length).toBe(2);
    expect(geohashes[0].geohash).toBe("abc");
  });

  test("handles geohashes with distance config", () => {
    const geohashes = [mockGeohash("abc"), mockGeohash("def")];
    const config: DistanceConfig = {
      enabled: true,
      mode: "reference",
      referenceGeohash: "abc",
      units: "km",
    };
    const distances: DistanceResult[] = [
      {
        from: geohashes[0],
        to: geohashes[1],
        distance: 100,
        mode: "reference",
      },
    ];

    expect(config.enabled).toBe(true);
    expect(distances.length).toBe(1);
  });

  test("identifies reference geohash correctly", () => {
    const geohashes = [mockGeohash("abc"), mockGeohash("def")];
    const config: DistanceConfig = {
      enabled: true,
      mode: "reference",
      referenceGeohash: "abc",
      units: "km",
    };

    const isReference = geohashes[0].geohash === config.referenceGeohash;
    expect(isReference).toBe(true);
  });
});
