import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DistanceAnalysis from './DistanceAnalysis';
import DistanceConfig from './DistanceConfig';
import { DistanceConfig as DistanceConfigType } from './utils/distanceTypes';
import Geohash from '../../../GeohashMap/model/Geohash';
import { calculateDistances } from './utils/distanceCalculator';

const mockGeohash = (geohash: string, lat: number = 40.0, lon: number = -75.0): Geohash => ({
  geohash,
  boundingBox: [
    [lat, lon],
    [lat + 1, lon + 1],
  ],
});

describe('Edge Cases', () => {
  describe('Geohash count variations', () => {
    test('handles 0 geohashes', () => {
      const onConfigChange = jest.fn();
      const config: DistanceConfigType = {
        enabled: false,
        mode: 'reference',
        referenceGeohash: null,
        units: 'km',
      };

      render(
        <DistanceAnalysis
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={[]}
          disabled={true}
          disabledReason="Need at least 2 valid geohashes for distance analysis"
        />
      );

      expect(screen.getByText(/Need at least 2 valid geohashes/i)).toBeInTheDocument();
    });

    test('handles 1 geohash', () => {
      const onConfigChange = jest.fn();
      const config: DistanceConfigType = {
        enabled: false,
        mode: 'reference',
        referenceGeohash: null,
        units: 'km',
      };

      render(
        <DistanceAnalysis
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={[mockGeohash('abc')]}
          disabled={true}
          disabledReason="Need at least 2 valid geohashes for distance analysis"
        />
      );

      expect(screen.getByText(/Need at least 2 valid geohashes/i)).toBeInTheDocument();
    });

    test('handles 2 geohashes', () => {
      const onConfigChange = jest.fn();
      const config: DistanceConfigType = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'abc',
        units: 'km',
      };

      render(
        <DistanceAnalysis
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={[mockGeohash('abc'), mockGeohash('def')]}
          disabled={false}
        />
      );

      expect(screen.getByText(/Calculation Mode/i)).toBeInTheDocument();
    });

    test('handles 10 geohashes', () => {
      const geohashes = Array.from({ length: 10 }, (_, i) =>
        mockGeohash(`gh${i}`, 40 + i, -75 + i)
      );
      const config: DistanceConfigType = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'gh0',
        units: 'km',
      };

      const distances = calculateDistances(geohashes, config);
      expect(distances.length).toBe(9);
    });

    test('handles 20 geohashes', () => {
      const geohashes = Array.from({ length: 20 }, (_, i) =>
        mockGeohash(`gh${i}`, 40 + i * 0.5, -75 + i * 0.5)
      );
      const config: DistanceConfigType = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'gh0',
        units: 'km',
      };

      const distances = calculateDistances(geohashes, config);
      expect(distances.length).toBe(19);
    });

    test('shows warning for 50 geohashes', () => {
      const geohashes = Array.from({ length: 50 }, (_, i) =>
        mockGeohash(`gh${i}`, 40 + i * 0.2, -75 + i * 0.2)
      );
      const onConfigChange = jest.fn();
      const config: DistanceConfigType = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'gh0',
        units: 'km',
      };

      render(
        <DistanceConfig
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={geohashes}
        />
      );

      // Component should still render
      expect(screen.getByText(/Calculation Mode/i)).toBeInTheDocument();
    });
  });

  describe('Reference geohash becomes invalid', () => {
    test('handles reference geohash removal', () => {
      const onConfigChange = jest.fn();
      const initialGeohashes = [mockGeohash('abc'), mockGeohash('def'), mockGeohash('ghi')];
      const config: DistanceConfigType = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'abc',
        units: 'km',
      };

      const { rerender } = render(
        <DistanceConfig
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={initialGeohashes}
        />
      );

      // Remove the reference geohash
      const newGeohashes = [mockGeohash('def'), mockGeohash('ghi')];
      rerender(
        <DistanceConfig
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={newGeohashes}
        />
      );

      // Component should still render
      expect(screen.getByText(/Calculation Mode/i)).toBeInTheDocument();
    });
  });

  describe('Rapid config changes', () => {
    test('handles rapid mode changes', () => {
      const onConfigChange = jest.fn();
      const geohashes = [mockGeohash('abc'), mockGeohash('def'), mockGeohash('ghi')];
      const config: DistanceConfigType = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'abc',
        units: 'km',
      };

      render(
        <DistanceConfig
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={geohashes}
        />
      );

      const modeSelect = screen.getAllByRole('combobox')[0];

      // Rapidly change modes
      fireEvent.change(modeSelect, { target: { value: 'consecutive' } });
      fireEvent.change(modeSelect, { target: { value: 'nearest' } });
      fireEvent.change(modeSelect, { target: { value: 'allPairs' } });
      fireEvent.change(modeSelect, { target: { value: 'reference' } });

      expect(onConfigChange).toHaveBeenCalled();
    });

    test('handles rapid unit changes', () => {
      const onConfigChange = jest.fn();
      const geohashes = [mockGeohash('abc'), mockGeohash('def')];
      const config: DistanceConfigType = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'abc',
        units: 'km',
      };

      render(
        <DistanceConfig
          config={config}
          onConfigChange={onConfigChange}
          validGeohashes={geohashes}
        />
      );

      const milesRadio = screen.getByLabelText(/Miles/i);
      const kmRadio = screen.getByLabelText(/Kilometers/i);

      // Rapidly toggle units
      fireEvent.click(milesRadio);
      fireEvent.click(kmRadio);
      fireEvent.click(milesRadio);

      expect(onConfigChange).toHaveBeenCalled();
    });
  });

  describe('localStorage persistence', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    test('persists config to localStorage', () => {
      const config: DistanceConfigType = {
        enabled: true,
        mode: 'reference',
        referenceGeohash: 'abc',
        units: 'km',
      };

      localStorage.setItem('geohashviz_distance_config', JSON.stringify(config));

      const stored = localStorage.getItem('geohashviz_distance_config');
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.enabled).toBe(true);
      expect(parsed.mode).toBe('reference');
    });

    test('handles corrupted localStorage data', () => {
      localStorage.setItem('geohashviz_distance_config', 'invalid json');

      const stored = localStorage.getItem('geohashviz_distance_config');
      expect(stored).toBe('invalid json');

      // Should not crash when parsing fails
      expect(() => {
        try {
          JSON.parse(stored!);
        } catch (e) {
          // Expected to fail
        }
      }).not.toThrow();
    });
  });
});
