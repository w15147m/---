import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  Madhab,
} from 'adhan';

/**
 * Service to calculate prayer times (Iftar/Sahur) globally.
 * Uses the Tehran calculation method (Shia standard).
 */
const PrayerAPI = {
  /**
   * Calculates Iftar (Maghrib) and Sahur (Fajr) times for a given date and location.
   * @param {Date} date - The date to calculate for
   * @param {number} latitude - Latitude of the location
   * @param {number} longitude - Longitude of the location
   * @returns {Object} { iftar: Date, sahur: Date }
   */
  getRamadanTimes: (date, latitude, longitude) => {
    const coordinates = new Coordinates(latitude, longitude);
    const params = CalculationMethod.Tehran();
    params.madhab = Madhab.Shafi; // For Shia, Shafi/Maliki/Hanbali (Asr calculation) is used as it's earlier, or specific Shia settings.

    const prayerTimes = new PrayerTimes(coordinates, date, params);

    return {
      iftar: prayerTimes.maghrib,
      sahur: prayerTimes.fajr,
      fajr: prayerTimes.fajr,
      sunrise: prayerTimes.sunrise,
      dhuhr: prayerTimes.dhuhr,
      asr: prayerTimes.asr,
      maghrib: prayerTimes.maghrib,
      isha: prayerTimes.isha,
    };
  },

  /**
   * Formats a Date object into a readable time string (e.g., "05:30 AM").
   * @param {Date} date - The date to format
   * @returns {string} Formatted time string
   */
  formatTime: (date) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  },
};

export default PrayerAPI;
