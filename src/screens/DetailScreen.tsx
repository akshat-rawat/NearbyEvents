import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getEventById } from '../api/eventsApi';
import Event from '../models/event.dto';
import EventCard from '../components/EventCard';
import FadeInButton from '../components/FadeInButton';
import { ScreenProps } from '../navigation/RootNavigation';

export default function DetailScreen({
  route,
  navigation,
}: ScreenProps<'Details'>) {
  const { eventId } = route.params;
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

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack} style={styles.header}>
        <Image source={require('../assets/icons/chevron-left.png')} />
        <Text style={styles.title}>{event.title}</Text>
      </TouchableOpacity>

      <View>
        <Image
          source={require('../assets/images/event.png')}
          style={styles.eventImage}
          resizeMode="cover"
        />
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: event.location.latitude,
              longitude: event.location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={event.location}
              image={require('../assets/icons/selected-marker.png')}
            />
          </MapView>
        </View>
      </View>

      <EventCard event={event} showBorder={false} showTime={true} />

      <View style={styles.buttonContainer}>
        <FadeInButton
          text={event.isJoined ? 'Joined' : 'Join'}
          disabled={event.isJoined}
          onPress={() => setEvent({ ...event, isJoined: true })}
        />
      </View>
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
  mapContainer: {
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
  map: {
    width: 82,
    height: 82,
    borderRadius: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
});
