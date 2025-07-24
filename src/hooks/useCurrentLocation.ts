import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const DEFAULT_COORDS = {
  latitude: 12.95,
  longitude: 77.6,
};

export const useCurrentLocation = () => {
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const request = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setError('Permission denied');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        pos =>
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        e => setError(e.message),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 },
      );
    };
    request();
  }, []);

  return { ...coords, error };
};
