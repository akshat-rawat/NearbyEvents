import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Event } from '../models/Event.dto';
import {
  capitalizeWords,
  formatDate,
  formatTime,
  getDistanceFromLatLonInKm,
} from '../utils/helpers';

interface Props {
  event: Event;
  onPress: () => void;
}

const EventCard = ({ event, onPress }: Props) => {
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
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.title}>{capitalizeWords(event.title)}</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
      <Text style={styles.iconText}>{date}</Text>
      <Text style={styles.iconText}>{timeDuration}</Text>
      <Text style={styles.iconText}>{distance} km</Text>
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
  iconText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
  },
});

export default EventCard;
