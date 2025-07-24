import React, { useEffect, useState } from 'react';
import { View, Text, Switch, FlatList, StyleSheet } from 'react-native';
import { getEvents } from '../api/eventsApi';
import { Event } from '../models/event.dto';

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [mapMode, setMapMode] = useState(false);

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

      <FlatList
        contentContainerStyle={styles.list}
        data={events}
        keyExtractor={e => e.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.startTime}</Text>
            <Text>{item.endTime}</Text>
            <Text>{item.description}</Text>
            <Text>
              Location: {item.location.latitude}, {item.location.longitude}
            </Text>
          </View>
        )}
      />
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
