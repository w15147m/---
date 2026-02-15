import { useState, useEffect } from 'react';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@user_location';
const DEFAULT_FALLBACK = { 
  latitude: 24.8607, 
  longitude: 67.0011,
  cityName: 'Karachi (Default)'
};

/**
 * Hook to get the user's current GPS coordinates or saved manual location.
 */
export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const saveLocation = async (newLoc) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLoc));
      setLocation(newLoc);
    } catch (err) {
      console.error('Error saving location:', err);
    }
  };

  const fetchLocation = async () => {
    try {
      setLoading(true);
      
      // 1. Check AsyncStorage first
      const savedLoc = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedLoc) {
        setLocation(JSON.parse(savedLoc));
        setLoading(false);
        return;
      }

      // 2. Try GPS if native module available
      if (NativeModules.RNGetLocation) {
        const GetLocation = require('react-native-get-location').default;
        const loc = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        });

        const gpsLoc = {
          latitude: loc.latitude,
          longitude: loc.longitude,
          cityName: 'My Location (GPS)'
        };
        setLocation(gpsLoc);
        return;
      }

      // 3. Last fallback
      setLocation(DEFAULT_FALLBACK);
    } catch (err) {
      console.warn('Location Fetch Fallback:', err.message);
      setError(err.message);
      setLocation(DEFAULT_FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return { location, loading, error, saveLocation, refresh: fetchLocation };
};

export default useLocation;
