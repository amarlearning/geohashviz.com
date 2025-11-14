import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DistanceConfig from './DistanceConfig';
import { DistanceConfig as DistanceConfigType } from './utils/distanceTypes';
import Geohash from '../../../GeohashMap/model/Geohash';

const mockGeohash = (geohash: string): Geohash => ({
  geohash,
  boundingBox: [
    [40.0, -75.0],
    [41.0, -74.0],
  ],
});

describe('DistanceConfig Component', () => {
  const defaultConfig: DistanceConfigType = {
    enabled: true,
    mode: 'reference',
    referenceGeohash: 'abc',
    units: 'km',
  };

  test('renders calculation mode dropdown', () => {
    const onConfigChange = jest.fn();
    const validGeohashes = [mockGeohash('abc'), mockGeohash('def')];

    render(
      <DistanceConfig
        config={defaultConfig}
        onConfigChange={onConfigChange}
        validGeohashes={validGeohashes}
      />
    );

    expect(screen.getByText(/Calculation Mode/i)).toBeInTheDocument();
  });

  test('shows reference point dropdown in reference mode', () => {
    const onConfigChange = jest.fn();
    const validGeohashes = [mockGeohash('abc'), mockGeohash('def')];

    render(
      <DistanceConfig
        config={defaultConfig}
        onConfigChange={onConfigChange}
        validGeohashes={validGeohashes}
      />
    );

    expect(screen.getByLabelText(/Reference Point/i)).toBeInTheDocument();
  });

  test('hides reference point dropdown in consecutive mode', () => {
    const onConfigChange = jest.fn();
    const validGeohashes = [mockGeohash('abc'), mockGeohash('def')];
    const consecutiveConfig = { ...defaultConfig, mode: 'consecutive' as const };

    render(
      <DistanceConfig
        config={consecutiveConfig}
        onConfigChange={onConfigChange}
        validGeohashes={validGeohashes}
      />
    );

    expect(screen.queryByLabelText(/Reference Point/i)).not.toBeInTheDocument();
  });

  test('changes mode when dropdown is changed', () => {
    const onConfigChange = jest.fn();
    const validGeohashes = [mockGeohash('abc'), mockGeohash('def')];

    render(
      <DistanceConfig
        config={defaultConfig}
        onConfigChange={onConfigChange}
        validGeohashes={validGeohashes}
      />
    );

    const modeSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(modeSelect, { target: { value: 'consecutive' } });

    expect(onConfigChange).toHaveBeenCalledWith(
      expect.objectContaining({ mode: 'consecutive' })
    );
  });

  test('renders unit selection radio buttons', () => {
    const onConfigChange = jest.fn();
    const validGeohashes = [mockGeohash('abc'), mockGeohash('def')];

    render(
      <DistanceConfig
        config={defaultConfig}
        onConfigChange={onConfigChange}
        validGeohashes={validGeohashes}
      />
    );

    expect(screen.getByText(/Kilometers/i)).toBeInTheDocument();
    expect(screen.getByText(/Miles/i)).toBeInTheDocument();
  });

  test('changes unit when radio button is clicked', () => {
    const onConfigChange = jest.fn();
    const validGeohashes = [mockGeohash('abc'), mockGeohash('def')];

    render(
      <DistanceConfig
        config={defaultConfig}
        onConfigChange={onConfigChange}
        validGeohashes={validGeohashes}
      />
    );

    const milesRadio = screen.getByLabelText(/Miles/i);
    fireEvent.click(milesRadio);

    expect(onConfigChange).toHaveBeenCalledWith(
      expect.objectContaining({ units: 'miles' })
    );
  });
});
