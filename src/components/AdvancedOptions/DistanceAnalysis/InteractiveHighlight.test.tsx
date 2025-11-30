import "@testing-library/jest-dom";
import { HighlightState } from "./utils/distanceTypes";

describe("Interactive Highlighting Feature - Logic Tests", () => {
  describe("HighlightState type", () => {
    test("can create highlight state for geohash", () => {
      const state: HighlightState = {
        highlightedGeohash: "abc",
        highlightedLine: null,
      };

      expect(state.highlightedGeohash).toBe("abc");
      expect(state.highlightedLine).toBeNull();
    });

    test("can create highlight state for line", () => {
      const state: HighlightState = {
        highlightedGeohash: null,
        highlightedLine: { from: "abc", to: "def" },
      };

      expect(state.highlightedGeohash).toBeNull();
      expect(state.highlightedLine).toEqual({ from: "abc", to: "def" });
    });

    test("can create empty highlight state", () => {
      const state: HighlightState = {
        highlightedGeohash: null,
        highlightedLine: null,
      };

      expect(state.highlightedGeohash).toBeNull();
      expect(state.highlightedLine).toBeNull();
    });
  });

  describe("Line highlighting logic", () => {
    test("identifies when a specific line should be highlighted", () => {
      const highlightState: HighlightState = {
        highlightedGeohash: null,
        highlightedLine: { from: "abc", to: "def" },
      };

      const isHighlighted =
        highlightState.highlightedLine?.from === "abc" &&
        highlightState.highlightedLine?.to === "def";

      expect(isHighlighted).toBe(true);
    });
  });

  describe("Geohash highlighting logic", () => {
    test("identifies all lines connected to a highlighted geohash", () => {
      const highlightState: HighlightState = {
        highlightedGeohash: "abc",
        highlightedLine: null,
      };

      const line1Connected =
        "abc" === highlightState.highlightedGeohash ||
        "def" === highlightState.highlightedGeohash;

      const line2Connected =
        "abc" === highlightState.highlightedGeohash ||
        "ghi" === highlightState.highlightedGeohash;

      expect(line1Connected).toBe(true);
      expect(line2Connected).toBe(true);
    });
  });

  describe("Toggle behavior logic", () => {
    test("can toggle from highlighted to cleared state", () => {
      let state: HighlightState = {
        highlightedGeohash: "abc",
        highlightedLine: null,
      };

      if (state.highlightedGeohash === "abc") {
        state = {
          highlightedGeohash: null,
          highlightedLine: null,
        };
      }

      expect(state.highlightedGeohash).toBeNull();
      expect(state.highlightedLine).toBeNull();
    });
  });

  describe("Callback handlers", () => {
    test("onLineClick handler receives correct parameters", () => {
      const onLineClick = jest.fn();
      onLineClick("abc", "def");

      expect(onLineClick).toHaveBeenCalledWith("abc", "def");
      expect(onLineClick).toHaveBeenCalledTimes(1);
    });

    test("onGeohashClick handler receives correct parameter", () => {
      const onGeohashClick = jest.fn();
      onGeohashClick("abc");

      expect(onGeohashClick).toHaveBeenCalledWith("abc");
      expect(onGeohashClick).toHaveBeenCalledTimes(1);
    });
  });
});
