import { getBoundingBox } from "./BoundingBox";
import createGeohashObjects from "./BoundingBox";

describe("getBoundingBox", () => {
  it("should return the correct bounding box for a given geohash", () => {
    const geohash = "9q8yy";
    const expectedBoundingBox = {
      sw: { lat: 37.7490234375, lon: -122.431640625 },
      ne: { lat: 37.79296875, lon: -122.3876953125 },
    };

    const result = getBoundingBox(geohash);

    expect(result).toEqual(expectedBoundingBox);
  });

  it("should return the correct bounding box for a given geohash", () => {
    const geohash = "9q8yytbs";
    const expectedBoundingBox = {
      ne: { lat: 37.78146743774414, lon: -122.40863800048828 },
      sw: { lat: 37.78129577636719, lon: -122.40898132324219 },
    };

    const result = getBoundingBox(geohash);

    expect(result).toEqual(expectedBoundingBox);
  });

  it("should throw an exception when geohash length is 0", () => {
    const geohash = "";

    expect(() => {
      getBoundingBox(geohash);
    }).toThrow();
  });

  it("should throw an exception when geohash is invalid", () => {
    const geohash = "invalidGeohash";

    expect(() => {
      getBoundingBox(geohash);
    }).toThrow();
  });
});

describe("createGeohashObjects", () => {
  it("should create an array of Geohash objects from an array of geohashes", () => {
    const geohashes = ["9q8yy", "9q8yytbs", "9q8yytbsz"];

    const result = createGeohashObjects(geohashes);

    expect(result).toHaveLength(3);
    expect(result[0].geohash).toBe("9q8yy");
    expect(result[0].boundingBox).toBeDefined();
    expect(result[1].geohash).toBe("9q8yytbs");
    expect(result[1].boundingBox).toBeDefined();
    expect(result[2].geohash).toBe("9q8yytbsz");
    expect(result[2].boundingBox).toBeDefined();
  });

  it("should create an array of Geohash objects from an array of geohashes", () => {
    const geohashes = ["9q8yy", "9q8yytbs", "9q8yytbsz"];

    const result = createGeohashObjects(geohashes);

    expect(result).toHaveLength(3);
    expect(result[0].geohash).toBe("9q8yy");
    expect(result[1].geohash).toBe("9q8yytbs");
    expect(result[2].geohash).toBe("9q8yytbsz");
  });

  it("should filter out invalid geohashes from the input array", () => {
    const geohashes = ["9q8yy", "invalidGeohash", "9q8yytbsz"];

    const result = createGeohashObjects(geohashes);

    expect(result).toHaveLength(2);
    expect(result[0].geohash).toBe("9q8yy");
    expect(result[1].geohash).toBe("9q8yytbsz");
  });
});
