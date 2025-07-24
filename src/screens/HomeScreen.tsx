import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [mapMode, setMapMode] = useState(false);

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 44,
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
});
