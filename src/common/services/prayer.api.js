import * as adhan from 'adhan';

/**
 * Service to calculate prayer times (Iftar/Sahur) globally.
 * Uses the Tehran calculation method (Shia standard).
 */
const PrayerAPI = {
  /**
   * Calculates Iftar (Maghrib) and Sahur (Fajr) times for a given date and location.
   */
  getRamadanTimes: (date, latitude, longitude) => {
    try {
      const coordinates = new adhan.Coordinates(latitude, longitude);
      const params = adhan.CalculationMethod.Tehran();
      params.madhab = adhan.Madhab.Shafi;

      const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

      return {
        iftar: prayerTimes.maghrib,
        sahur: prayerTimes.fajr,
        maghrib: prayerTimes.maghrib,
        fajr: prayerTimes.fajr,
      };
    } catch (error) {
      console.error('Error calculating prayer times:', error);
      return null;
    }
  },

  /**
   * Manual time formatter for React Native compatibility.
   */
  formatTime: (date) => {
    if (!date || !(date instanceof Date)) return '--:--';
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  },
};

export default PrayerAPI;
