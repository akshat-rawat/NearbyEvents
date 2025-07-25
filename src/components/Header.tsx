import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

interface Props {
  title: string;
  showSwitch?: boolean;
  mapMode?: boolean;
  setMapMode?: (val: boolean) => void;
  onPress?: () => void;
}

const Header = ({ title, showSwitch, mapMode, setMapMode, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        style={styles.header}
      >
        {onPress && (
          <Image source={require('../assets/icons/chevron-left.png')} />
        )}
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {showSwitch && (
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
            testID="map-switch"
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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

export default React.memo(Header);
