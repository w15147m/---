import { useState, useEffect } from 'react';
import { NativeModules } from 'react-native';

/**
 * Hook to get the user's current GPS coordinates.
 * Safely handles missing native modules by using dynamic loading (require).
 */
export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        
        // Check if the native module is actually linked/available
        if (!NativeModules.RNGetLocation) {
          throw new Error('Native location module not found. Please rebuild the app.');
        }

        // Dynamic require to prevent crash at import time
        const GetLocation = require('react-native-get-location').default;

        const loc = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        });

        setLocation({
          latitude: loc.latitude,
          longitude: loc.longitude,
        });
        setError(null);
      } catch (err) {
        console.warn('Location Fetch Fallback:', err.message);
        setError(err.message);
        // Default coordinates as fallback (Tehran for now, until user provides city)
        setLocation({ latitude: 35.6892, longitude: 51.3890 });
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, loading, error };
};

export default useLocation;
