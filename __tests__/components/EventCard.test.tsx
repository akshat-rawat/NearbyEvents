import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EventCard from '../../src/components/EventCard';
import { MOCK_EVENT_LIST } from '../../src/utils/constants';

jest.mock('../../src/utils/helpers', () => ({
  formatDate: jest.fn().mockReturnValue('25 Jul'),
  formatTime: jest.fn().mockReturnValue('10am'),
  getDistanceFromLatLonInKm: jest.fn().mockReturnValue(5),
}));

jest.mock('../../src/hooks/useCurrentLocation', () => ({
  useCurrentLocation: jest.fn().mockReturnValue({
    latitude: 12.9716,
    longitude: 77.5946,
  }),
}));

describe('EventCard', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('should render title, description, date and distance', () => {
    const { getByText, getByTestId } = render(
      <EventCard event={MOCK_EVENT_LIST[0]} onPress={mockOnPress} />,
    );

    expect(getByText('Event 1')).toBeTruthy();
    expect(getByText('Description one')).toBeTruthy();
    expect(getByText('25 Jul')).toBeTruthy();
    expect(getByText('5 km')).toBeTruthy();

    const eventCard = getByTestId('event-card');
    expect(eventCard).toBeTruthy();
  });

  it('should render time when showTime is true', () => {
    const { getByText } = render(
      <EventCard
        event={MOCK_EVENT_LIST[0]}
        showTime={true}
        onPress={mockOnPress}
      />,
    );

    expect(getByText('10am - 10am')).toBeTruthy();
  });

  it('should not render time when showTime is false', () => {
    const { queryByText } = render(
      <EventCard
        event={MOCK_EVENT_LIST[0]}
        showTime={false}
        onPress={mockOnPress}
      />,
    );

    expect(queryByText('10am - 10am')).toBeNull();
  });

  it('should call onPress when event card is pressed', () => {
    const { getByTestId } = render(
      <EventCard event={MOCK_EVENT_LIST[0]} onPress={mockOnPress} />,
    );

    const eventCard = getByTestId('event-card');
    fireEvent.press(eventCard);

    expect(mockOnPress).toHaveBeenCalledWith('1');
  });

  it('should apply border style when showBorder is true', () => {
    const { getByTestId } = render(
      <EventCard
        event={MOCK_EVENT_LIST[0]}
        showBorder={true}
        onPress={mockOnPress}
      />,
    );

    const eventCard = getByTestId('event-card');
    expect(eventCard.props.style.borderWidth).toBe(1);
  });

  it('should not apply border style when showBorder is false', () => {
    const { getByTestId } = render(
      <EventCard
        event={MOCK_EVENT_LIST[0]}
        showBorder={false}
        onPress={mockOnPress}
      />,
    );

    const eventCard = getByTestId('event-card');
    expect(eventCard.props.style.borderWidth).toBe(0);
  });
});
