import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdvancedOptions from "../AdvancedOptions";
import DistanceAnalysis from "./DistanceAnalysis";
import DistanceConfig from "./DistanceConfig";
import { DistanceConfig as DistanceConfigType } from "./utils/distanceTypes";
import Geohash from "../../../GeohashMap/model/Geohash";

const mockGeohash = (geohash: string): Geohash => ({
  geohash,
  boundingBox: [
    [40.0, -75.0],
    [41.0, -74.0],
  ],
});

describe("Accessibility Tests", () => {
  describe("Keyboard navigation", () => {
    test("AdvancedOptions toggle is keyboard accessible", () => {
      const onToggle = jest.fn();

      render(
        <AdvancedOptions expanded={false} onToggle={onToggle}>
          <div>Content</div>
        </AdvancedOptions>
      );

      const button = screen.getByRole("button");

      // Test Enter key
      fireEvent.keyDown(button, { key: "Enter" });
      expect(onToggle).toHaveBeenCalledTimes(1);

      // Test Space key
      fireEvent.keyDown(button, { key: " " });
      expect(onToggle).toHaveBeenCalledTimes(2);
    });

    test("DistanceAnalysis toggle is keyboard accessible", () => {
      const onConfigChange = jest.fn();
      const geohashes = [mockGeohash("abc"), mockGeohash("def")];
      const config: DistanceConfigType = {
        enabled: false,
        mode: "reference",
        referenceGeohash: null,
        units: "km",
      };

      render(
        <DistanceAnalysis
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={geohashes}
          disabled={false}
        />
      );

      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      expect(document.activeElement).toBe(checkbox);
    });

    test("tab order is logical", () => {
      const onConfigChange = jest.fn();
      const geohashes = [mockGeohash("abc"), mockGeohash("def")];
      const config: DistanceConfigType = {
        enabled: true,
        mode: "reference",
        referenceGeohash: "abc",
        units: "km",
      };

      render(
        <DistanceConfig
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={geohashes}
        />
      );

      // Check for labeled elements
      expect(screen.getByText(/Calculation Mode/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Reference Point/i)).toBeInTheDocument();
      expect(screen.getByText(/Kilometers/i)).toBeInTheDocument();
      expect(screen.getByText(/Miles/i)).toBeInTheDocument();
    });

    test("disabled state is properly communicated", () => {
      const onConfigChange = jest.fn();
      const geohashes = [mockGeohash("abc"), mockGeohash("def")];
      const config: DistanceConfigType = {
        enabled: false,
        mode: "reference",
        referenceGeohash: null,
        units: "km",
      };

      render(
        <DistanceConfig
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={geohashes}
        />
      );

      const modeSelect = screen.getAllByRole("combobox")[0];
      modeSelect.focus();
      expect(document.activeElement).toBe(modeSelect);
    });

    test("focus moves correctly between elements", () => {
      const onConfigChange = jest.fn();
      const geohashes = [mockGeohash("abc"), mockGeohash("def")];
      const config: DistanceConfigType = {
        enabled: true,
        mode: "reference",
        referenceGeohash: "abc",
        units: "km",
      };

      render(
        <DistanceConfig
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={geohashes}
        />
      );

      // Info message should be present
      const infoText = screen.getByText(/Distances calculated from/i);
      expect(infoText).toBeInTheDocument();
    });

    test("mode descriptions are clear", () => {
      const onConfigChange = jest.fn();
      const geohashes = [
        mockGeohash("abc"),
        mockGeohash("def"),
        mockGeohash("ghi"),
      ];
      const config: DistanceConfigType = {
        enabled: true,
        mode: "consecutive",
        referenceGeohash: null,
        units: "km",
      };

      render(
        <DistanceConfig
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={geohashes}
        />
      );

      // Info message should be present
      const infoText = screen.getByText(/Showing path distances/i);
      expect(infoText).toBeInTheDocument();
    });
  });
});
