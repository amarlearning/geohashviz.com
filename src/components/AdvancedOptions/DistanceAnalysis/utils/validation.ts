import Geohash from '../../../../GeohashMap/model/Geohash';
import { DistanceConfig } from './distanceTypes';

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

/**
 * Validates minimum geohash count for distance analysis
 * @param geohashes Array of geohashes
 * @returns Validation result
 */
export function validateMinimumGeohashCount(geohashes: Geohash[]): ValidationResult {
  if (geohashes.length < 2) {
    return {
      isValid: false,
      error: 'Need at least 2 valid geohashes for distance analysis',
    };
  }
  return { isValid: true };
}

/**
 * Validates that reference geohash exists in the geohash array
 * @param referenceGeohash Reference geohash string
 * @param geohashes Array of geohashes
 * @returns Validation result
 */
export function validateReferenceGeohash(
  referenceGeohash: string | null,
  geohashes: Geohash[]
): ValidationResult {
  if (!referenceGeohash) {
    return {
      isValid: false,
      error: 'Reference geohash is required for reference mode',
    };
  }

  const exists = geohashes.some(g => g.geohash === referenceGeohash);
  if (!exists) {
    return {
      isValid: false,
      error: `Reference geohash "${referenceGeohash}" not found in valid geohashes`,
    };
  }

  return { isValid: true };
}

/**
 * Validates mode-specific requirements
 * @param config Distance configuration
 * @param geohashes Array of geohashes
 * @returns Validation result
 */
export function validateModeRequirements(
  config: DistanceConfig,
  geohashes: Geohash[]
): ValidationResult {
  // Validate minimum geohash count
  const minCountResult = validateMinimumGeohashCount(geohashes);
  if (!minCountResult.isValid) {
    return minCountResult;
  }

  // Mode-specific validation
  switch (config.mode) {
    case 'reference':
      return validateReferenceGeohash(config.referenceGeohash, geohashes);

    case 'consecutive':
      if (geohashes.length < 2) {
        return {
          isValid: false,
          error: 'Need at least 2 geohashes for consecutive mode',
        };
      }
      return { isValid: true };

    case 'nearest':
      if (geohashes.length < 2) {
        return {
          isValid: false,
          error: 'Need at least 2 geohashes for nearest neighbor mode',
        };
      }
      return { isValid: true };

    case 'allPairs':
      if (geohashes.length > 20) {
        return {
          isValid: false,
          error: 'Too many geohashes for all pairs mode (max 20)',
        };
      }
      if (geohashes.length > 10) {
        const pairCount = (geohashes.length * (geohashes.length - 1)) / 2;
        return {
          isValid: true,
          warning: `All pairs mode will calculate ${pairCount} distances`,
        };
      }
      return { isValid: true };

    default:
      return {
        isValid: false,
        error: `Unknown calculation mode: ${config.mode}`,
      };
  }
}

/**
 * Validates performance considerations
 * @param geohashes Array of geohashes
 * @returns Validation result with performance warnings
 */
export function validatePerformance(geohashes: Geohash[]): ValidationResult {
  if (geohashes.length > 50) {
    return {
      isValid: true,
      warning: '⚠️ Large dataset may impact performance',
    };
  }
  return { isValid: true };
}

/**
 * Validates the entire distance configuration
 * @param config Distance configuration
 * @param geohashes Array of geohashes
 * @returns Validation result
 */
export function validateDistanceConfig(
  config: DistanceConfig,
  geohashes: Geohash[]
): ValidationResult {
  if (!config.enabled) {
    return { isValid: true };
  }

  // Check mode requirements
  const modeResult = validateModeRequirements(config, geohashes);
  if (!modeResult.isValid) {
    return modeResult;
  }

  // Check performance
  const perfResult = validatePerformance(geohashes);
  if (perfResult.warning) {
    return {
      isValid: true,
      warning: perfResult.warning,
    };
  }

  return { isValid: true };
}
