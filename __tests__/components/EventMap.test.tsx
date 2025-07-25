import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EventMap from '../../src/components/EventMap';
import { MOCK_EVENT_LIST } from '../../src/utils/constants';

jest.mock('react-native-maps');

jest.mock('../../src/hooks/useCurrentLocation', () => ({
  useCurrentLocation: () => ({
    latitude: 12.34,
    longitude: 56.78,
    error: null,
  }),
}));

describe('EventMap', () => {
  const mockOnPinPress = jest.fn();

  beforeEach(() => {
    mockOnPinPress.mockClear();
  });

  it('should render map with markers', () => {
    const { getByTestId } = render(
      <EventMap events={MOCK_EVENT_LIST} onPinPress={mockOnPinPress} />,
    );

    const map = getByTestId('map');
    expect(map).toBeTruthy();

    const marker = getByTestId('marker-1');
    expect(marker).toBeTruthy();
  });

  it('should display the correct marker image for selected event', () => {
    const { getByTestId } = render(
      <EventMap events={MOCK_EVENT_LIST} onPinPress={mockOnPinPress} />,
    );

    const marker = getByTestId('marker-1');
    fireEvent.press(marker);

    const selectedMarker = getByTestId('selected-marker-1');
    expect(selectedMarker).toBeTruthy();
  });

  it('should show the overlay when a marker is selected', () => {
    const { getByTestId, getByText } = render(
      <EventMap events={MOCK_EVENT_LIST} onPinPress={mockOnPinPress} />,
    );

    const marker = getByTestId('marker-1');
    fireEvent.press(marker);

    const overlay = getByTestId('overlay');
    expect(overlay).toBeTruthy();

    expect(getByText('Event 1')).toBeTruthy();
  });

  it('should call onPinPress on event card click', async () => {
    const { getByTestId } = render(
      <EventMap events={MOCK_EVENT_LIST} onPinPress={mockOnPinPress} />,
    );

    const marker = getByTestId('marker-1');
    fireEvent.press(marker);

    const eventCard = getByTestId('event-card');
    fireEvent.press(eventCard);

    await waitFor(() => {
      expect(mockOnPinPress).toHaveBeenCalled();
    });
  });
});
