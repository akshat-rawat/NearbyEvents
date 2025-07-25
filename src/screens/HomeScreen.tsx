import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Switch,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getEvents } from '../api/eventsApi';
import Event from '../models/event.dto';
import EventCard from '../components/EventCard';
import EventMap from '../components/EventMap';
import { sortByDate, sortByDistance } from '../utils/sort';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { ScreenProps } from '../navigation/RootNavigation';

export default function HomeScreen({ navigation }: ScreenProps<'Home'>) {
  const [events, setEvents] = useState<Event[]>([]);
  const [mapMode, setMapMode] = useState(false);
  const [sortedEvents, setSortedEvents] = useState<Event[]>([]);
  const [sortKey, setSortKey] = useState<'distance' | 'date'>('distance');
  const { latitude, longitude } = useCurrentLocation();

  const sortedByDistance = useMemo(() => {
    return sortByDistance(events, latitude, longitude);
  }, [events, latitude, longitude]);

  const sortedByDate = useMemo(() => {
    return sortByDate(events);
  }, [events]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getEvents();
        setEvents(eventList);
        setSortedEvents(sortByDistance(eventList, latitude, longitude));
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    fetchEvents();
  }, [latitude, longitude]);

  const onEventPress = (eventId: string) => {
    navigation.navigate('Details', { eventId: eventId });
  };

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
          data={sortedEvents}
          ListHeaderComponent={
            <View style={styles.sortContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSortKey(prev =>
                    prev === 'distance' ? 'date' : 'distance',
                  );
                  setSortedEvents(
                    sortKey === 'distance' ? sortedByDate : sortedByDistance,
                  );
                }}
              >
                <Text style={styles.sortText}>
                  Sort by {sortKey === 'distance' ? 'Date' : 'Distance'}
                </Text>
              </TouchableOpacity>
            </View>
          }
          keyExtractor={e => e.id}
          renderItem={({ item }) => (
            <EventCard event={item} onPress={onEventPress} />
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
    paddingBottom: 24,
    paddingHorizontal: 24,
    gap: 24,
  },
  sortContainer: {
    bottom: -12,
    alignItems: 'flex-end',
  },
  sortText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#1F1F1F',
  },
});
