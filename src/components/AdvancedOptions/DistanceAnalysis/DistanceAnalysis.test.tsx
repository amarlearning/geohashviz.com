import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DistanceAnalysis from "./DistanceAnalysis";
import { DistanceConfig } from "./utils/distanceTypes";
import Geohash from "../../../GeohashMap/model/Geohash";

const mockGeohash = (geohash: string): Geohash => ({
  geohash,
  boundingBox: [
    [40.0, -75.0],
    [41.0, -74.0],
  ],
});

describe("DistanceAnalysis Component", () => {
  const defaultConfig: DistanceConfig = {
    enabled: false,
    mode: "reference",
    referenceGeohash: null,
    units: "km",
  };

  test("renders with toggle switch", () => {
    const onConfigChange = jest.fn();
    const validGeohashes = [mockGeohash("abc"), mockGeohash("def")];

    render(
      <DistanceAnalysis
        config={defaultConfig}
        onConfigChange={onConfigChange}
        validGeohashes={validGeohashes}
        disabled={false}
      />
    );

    expect(screen.getByText("Distance Analysis")).toBeInTheDocument();
  });

  test("shows disabled state with insufficient geohashes", () => {
    const onConfigChange = jest.fn();
    const validGeohashes = [mockGeohash("abc")];

    render(
      <DistanceAnalysis
        config={defaultConfig}
        onConfigChange={onConfigChange}
        validGeohashes={validGeohashes}
        disabled={true}
        disabledReason="Need at least 2 valid geohashes for distance analysis"
      />
    );

    expect(
      screen.getByText(/Need at least 2 valid geohashes/i)
    ).toBeInTheDocument();
  });

  test("enables toggle with sufficient geohashes", () => {
    const onConfigChange = jest.fn();
    const validGeohashes = [mockGeohash("abc"), mockGeohash("def")];

    render(
      <DistanceAnalysis
        config={defaultConfig}
        onConfigChange={onConfigChange}
        validGeohashes={validGeohashes}
        disabled={false}
      />
    );

    const toggle = screen.getByRole("checkbox");
    expect(toggle).not.toBeDisabled();
  });

  test("calls onConfigChange when toggle is clicked", () => {
    const onConfigChange = jest.fn();
    const validGeohashes = [mockGeohash("abc"), mockGeohash("def")];

    render(
      <DistanceAnalysis
        config={defaultConfig}
        onConfigChange={onConfigChange}
        validGeohashes={validGeohashes}
        disabled={false}
      />
    );

    const toggle = screen.getByRole("checkbox");
    fireEvent.click(toggle);

    expect(onConfigChange).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: true })
    );
  });

  test("shows config panel when enabled", () => {
    const onConfigChange = jest.fn();
    const validGeohashes = [mockGeohash("abc"), mockGeohash("def")];
    const enabledConfig = {
      ...defaultConfig,
      enabled: true,
      referenceGeohash: "abc",
    };

    render(
      <DistanceAnalysis
        config={enabledConfig}
        onConfigChange={onConfigChange}
        validGeohashes={validGeohashes}
        disabled={false}
      />
    );

    expect(screen.getByText(/Calculation Mode/i)).toBeInTheDocument();
  });
});
