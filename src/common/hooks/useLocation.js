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
        const parsedLoc = JSON.parse(savedLoc);
        setLocation(parsedLoc);
        setLoading(false);
        
        // If name is generic/bad, force a refresh in background
        if (parsedLoc.cityName === 'Current Location' || parsedLoc.cityName === 'My Location (GPS)' || parsedLoc.cityName === 'Unknown Location') {
          console.log('Generic name detected, refreshing...');
          triggerGPS();
        }
        return;
      }

      // 2. Try GPS if native module available (First time load)
      if (NativeModules.RNGetLocation) {
        const GetLocation = require('react-native-get-location').default;
        const loc = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        });

        // RESOLVE NAME IMMEDIATELY
        const cityName = await reverseGeocode(loc.latitude, loc.longitude);

        const gpsLoc = {
          latitude: loc.latitude,
          longitude: loc.longitude,
          cityName: cityName
        };
        setLocation(gpsLoc);
        saveLocation(gpsLoc); // Save it so we don't ask again next time
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

  const reverseGeocode = async (lat, lon) => {
    try {
      let cityName = null;

      // 1. Try Native Android Geocoder first
      if (NativeModules.GeoModule) {
        try {
          const nativeName = await NativeModules.GeoModule.getCityName(lat, lon);
          console.log('[Geo] Native Result:', nativeName);
          if (nativeName && !nativeName.includes('Error') && !nativeName.includes('Unknown') && !nativeName.includes('Not Available')) {
            return nativeName;
          }
        } catch (e) {
          console.warn('[Geo] Native Failed:', e);
        }
      }

      // 2. Fallback to OpenStreetMap
      try {
        console.log('[Geo] Trying OSM Fallback...');
        const osmRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
          headers: { 
            'User-Agent': 'MafatihUlJinanApp/1.0',
            'Accept-Language': 'en'
          }
        });
        if (osmRes.ok) {
          const data = await osmRes.json();
          const city = data.address.city || data.address.town || data.address.village || data.address.county || data.address.state;
          if (city) return city;
        }
      } catch (e) {
        console.warn('[Geo] OSM Failed:', e.message);
      }

      // 3. Fallback to BigDataCloud
      try {
        console.log('[Geo] Trying BDC Fallback...');
        const bdcRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        if (bdcRes.ok) {
          const data = await bdcRes.json();
          const city = data.city || data.locality || data.principalSubdivision;
          if (city) return city;
        }
      } catch (e) {
        console.warn('[Geo] BDC Failed:', e.message);
      }
      
      return 'Unknown Location';
    } catch (error) {
      console.warn('All Geocoding Failed:', error);
      return 'Unknown Location';
    }
  };

  const triggerGPS = async () => {
    try {
      setLoading(true);
      if (!NativeModules.RNGetLocation) {
        throw new Error('GPS module not installed');
      }
      const GetLocation = require('react-native-get-location').default;
      const loc = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      // Get readable city name
      const cityName = await reverseGeocode(loc.latitude, loc.longitude);
      
      const gpsLoc = {
        latitude: loc.latitude,
        longitude: loc.longitude,
        cityName: cityName // This will now be the resolved name or 'Location Found'
      };
      await saveLocation(gpsLoc);
      return { success: true };
    } catch (err) {
      // console.warn('GPS Error:', err.message); // Silenced as UI handles it
      
      let friendlyError = err.message;
      if (err.code === 'UNAVAILABLE') {
        friendlyError = 'Location services are disabled. Please turn on GPS.';
      } else if (err.code === 'UNAUTHORIZED') {
        friendlyError = 'Permission denied. Please allow location access in settings.';
      } else if (err.message.includes('GPS module not installed')) {
        friendlyError = 'Please rebuild the app to enable GPS features.';
      }
      return { success: false, error: friendlyError };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return { location, loading, error, saveLocation, triggerGPS, refresh: fetchLocation };
};

export default useLocation;
