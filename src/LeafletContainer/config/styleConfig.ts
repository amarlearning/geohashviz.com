/**
 * Material Design colors used in the application
 */
export const COLORS = {
  PURPLE: {
    MAIN: "#9C27B0",
    DARK: "#7B1FA2",
  },
} as const;

/**
 * Geohash visualization style configuration
 */
export const GEOHASH_STYLE = {
  /**
   * Color for geohash bounding boxes
   * Using Material Design Purple for visibility
   */
  BOUNDING_BOX_COLOR: COLORS.PURPLE.MAIN,

  /**
   * Opacity for geohash bounding boxes
   * Value between 0 and 1
   */
  BOUNDING_BOX_OPACITY: 0.8,
} as const;

// Export individual constants for backward compatibility
export const BOUNDING_BOX_COLOR = GEOHASH_STYLE.BOUNDING_BOX_COLOR;
export const BOUNDING_BOX_OPACITY = GEOHASH_STYLE.BOUNDING_BOX_OPACITY;
