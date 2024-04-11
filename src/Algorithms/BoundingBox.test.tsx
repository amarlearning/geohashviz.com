import { getBoundingBox } from "./BoundingBox";

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
});
