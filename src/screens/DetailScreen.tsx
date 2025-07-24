import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getEventById } from '../api/eventsApi';
import Event from '../models/event.dto';
import EventCard from '../components/EventCard';

interface Props {
  eventId: string;
  onBackPress: () => void;
}

export default function DetailScreen({ eventId, onBackPress }: Props) {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEventDetails = async (id: string) => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      }
    };
    fetchEventDetails(eventId);
  }, [eventId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.header}>
        <Image source={require('../assets/icons/chevron-left.png')} />
        <Text style={styles.title}>{event?.title}</Text>
      </TouchableOpacity>
      <Image
        source={require('../assets/images/event.png')}
        style={styles.eventImage}
        resizeMode="cover"
      />
      {event && <EventCard event={event} showBorder={false} showTime={true} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 16,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 20,
    lineHeight: 36,
    fontWeight: '600',
    color: '#000000',
  },
  eventImage: {
    width: '100%',
    height: 250,
  },
});
