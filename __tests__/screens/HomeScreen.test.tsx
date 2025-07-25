import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MOCK_EVENT_LIST } from '../../src/utils/constants';
import HomeScreen from '../../src/screens/HomeScreen';

jest.mock('react-native-maps');

jest.mock('../../src/api/eventsApi', () => ({
  getEvents: jest.fn().mockResolvedValue(MOCK_EVENT_LIST),
}));

jest.mock('../../src/hooks/useCurrentLocation', () => ({
  useCurrentLocation: () => ({
    latitude: 12.34,
    longitude: 56.78,
    error: null,
  }),
}));

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  it('should render all event cards', async () => {
    const { getAllByTestId } = render(
      <HomeScreen navigation={mockNavigation} />,
    );

    const cards = await waitFor(() => getAllByTestId('event-card'));
    expect(cards).toHaveLength(MOCK_EVENT_LIST.length);
  });

  it('should navigate to details when an event card is pressed', async () => {
    const { getAllByTestId } = render(
      <HomeScreen navigation={mockNavigation} />,
    );

    const firstCard = await waitFor(() => getAllByTestId('event-card')[0]);
    expect(firstCard).toBeTruthy();

    fireEvent.press(firstCard);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Details', {
      eventId: '1',
    });
  });

  it('should toggle between list and map view', async () => {
    const { getByTestId } = render(<HomeScreen navigation={mockNavigation} />);

    const listView = getByTestId('event-list');
    expect(listView).toBeTruthy();

    fireEvent(getByTestId('map-switch'), 'valueChange', true);

    const map = await waitFor(() => getByTestId('map'));
    expect(map).toBeTruthy();

    fireEvent(getByTestId('map-switch'), 'valueChange', false);

    const listViewAfterToggle = getByTestId('event-list');
    expect(listViewAfterToggle).toBeTruthy();
  });

  it('should sorts events by distance and date', async () => {
    const { getByTestId, findByText } = render(
      <HomeScreen navigation={mockNavigation} />,
    );

    await findByText('Sort by Date');

    fireEvent.press(getByTestId('sort-btn'));

    await findByText('Sort by Distance');
  });
});
