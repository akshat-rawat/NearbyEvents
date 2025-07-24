import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Event from '../models/Event.dto';
import {
  formatDate,
  formatTime,
  getDistanceFromLatLonInKm,
} from '../utils/helpers';

interface Props {
  event: Event;
  showBorder?: boolean;
  showTime?: boolean;
  onPress?: () => void;
}

const EventCard = ({
  event,
  showBorder = true,
  showTime = false,
  onPress,
}: Props) => {
  const date = formatDate(event.startTime);
  const timeDuration = `${formatTime(event.startTime)} - ${formatTime(
    event.endTime,
  )}`;
  const distance = getDistanceFromLatLonInKm(
    event.location.latitude,
    event.location.longitude,
    -50,
    30,
  );

  return (
    <TouchableOpacity
      style={[styles.card, { borderWidth: showBorder ? 1 : 0 }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/icons/calendar.png')} />
        <Text style={styles.iconText}>{date}</Text>
      </View>
      {showTime && (
        <View style={styles.iconContainer}>
          <Image source={require('../assets/icons/clock.png')} />
          <Text style={styles.iconText}>{timeDuration}</Text>
        </View>
      )}
      <View style={styles.iconContainer}>
        <Image source={require('../assets/icons/location.png')} />
        <Text style={styles.iconText}>{distance} km</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    borderColor: '#EEEEEE',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  description: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#757575',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
  },
});

export default EventCard;
