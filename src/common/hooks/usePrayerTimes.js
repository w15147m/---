import { useState, useEffect } from 'react';
import PrayerAPI from '../services/prayer.api';

/**
 * Hook to calculate and manage prayer times reactively.
 * @param {Object} coordinates - { latitude, longitude }
 * @param {Date} inputDate - Optional date (defaults to today)
 */
export const usePrayerTimes = (coordinates, inputDate = new Date()) => {
  const [times, setTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimes = () => {
      try {
        setLoading(true);
        if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
          setError('Coordinates not provided');
          setLoading(false);
          return;
        }

        const calculatedTimes = PrayerAPI.getRamadanTimes(
          inputDate,
          coordinates.latitude,
          coordinates.longitude
        );

        setTimes({
          ...calculatedTimes,
          iftarStr: PrayerAPI.formatTime(calculatedTimes.iftar),
          sahurStr: PrayerAPI.formatTime(calculatedTimes.sahur),
        });
        setError(null);
      } catch (err) {
        setError('Failed to calculate prayer times');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimes();
  }, [coordinates, inputDate]);

  return { times, loading, error };
};

export default usePrayerTimes;
