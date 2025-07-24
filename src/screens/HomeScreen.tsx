import React, { useEffect, useState } from 'react';
import { View, Text, Switch, FlatList, StyleSheet } from 'react-native';
import { getEvents } from '../api/eventsApi';
import Event from '../models/event.dto';
import EventCard from '../components/EventCard';
import DetailScreen from './DetailScreen';
import EventMap from '../components/EventMap';

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [mapMode, setMapMode] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getEvents();
        setEvents(eventList);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    fetchEvents();
  }, []);

  const onEventPress = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  if (selectedEventId) {
    return (
      <DetailScreen
        eventId={selectedEventId}
        onBackPress={() => setSelectedEventId(null)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Events</Text>
        <View style={styles.switchContainer}>
          <Text
            style={[
              styles.switchLabel,
              { color: mapMode ? '#757575' : '#1F1F1F' },
            ]}
          >
            List
          </Text>
          <Switch
            value={mapMode}
            onValueChange={setMapMode}
            thumbColor={'#FFF'}
            trackColor={{ false: '#1F1F1F', true: '#2B7FFF' }}
            ios_backgroundColor={'#1F1F1F'}
          />
          <Text
            style={[
              styles.switchLabel,
              { color: mapMode ? '#2B7FFF' : '#757575' },
            ]}
          >
            Map
          </Text>
        </View>
      </View>

      {mapMode ? (
        <EventMap events={events} onPinPress={onEventPress} />
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={events}
          keyExtractor={e => e.id}
          renderItem={({ item }) => (
            <EventCard event={item} onPress={() => onEventPress(item.id)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 20,
    lineHeight: 36,
    fontWeight: '600',
    color: '#000000',
  },
  switchContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 14,
    color: '#757575',
  },
  list: {
    padding: 24,
    gap: 24,
  },
});
