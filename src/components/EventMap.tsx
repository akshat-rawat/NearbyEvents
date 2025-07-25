import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import EventCard from './EventCard';
import Event from '../models/Event.dto';

interface Props {
  events: Event[];
  onPinPress: (id: string) => void;
}

export default function EventMap({ events, onPinPress }: Props) {
  const [selected, setSelected] = React.useState<Event | null>(null);

  const getMarkerSource = (id: string) => {
    return id === selected?.id
      ? require('../assets/icons/selected-marker.png')
      : require('../assets/icons/marker.png');
  };

  const getMarkerTestID = (id: string) => {
    return id === selected?.id ? `selected-marker-${id}` : `marker-${id}`;
  };

  return (
    <View style={styles.container}>
      <MapView
        testID="map"
        style={styles.map}
        initialRegion={{
          latitude: events[0]?.location.latitude ?? 12,
          longitude: events[0]?.location.longitude ?? 77,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {events.map(event => (
          <Marker
            key={event.id}
            coordinate={event.location}
            onPress={() => setSelected(event)}
            image={getMarkerSource(event.id)}
            testID={getMarkerTestID(event.id)}
          />
        ))}
      </MapView>
      {selected && (
        <View style={styles.overlay} testID="overlay">
          <Image
            source={require('../assets/icons/selected-marker.png')}
            style={styles.markerIcon}
          />
          <EventCard
            event={selected}
            onPress={() => onPinPress(selected.id)}
            showBorder={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  overlay: {
    position: 'absolute',
    backgroundColor: '#FFF',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    paddingVertical: 12,
  },
  markerIcon: {
    left: 16,
    bottom: -12,
    width: 42,
    height: 42,
  },
});
