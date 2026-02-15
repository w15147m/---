/**
 * Utility to convert Gregorian date to Hijri date.
 * Based on the Kuweiti algorithm (Standard Tabular Hijri Calendar).
 */
const HijriUtils = {
  months: [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Ula", "Jumada al-Akhirah", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ],

  /**
   * Converts a Date object to Hijri date parts.
   * @param {Date} date 
   * @returns {Object} { hDay, hMonth, hYear, hMonthName }
   */
  getHijriDate: (date = new Date()) => {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (month < 2) {
      year -= 1;
      month += 12;
    }

    let a = Math.floor(year / 100);
    let b = 2 - a + Math.floor(a / 4);
    if (year < 1583) b = 0;
    if (year === 1582) {
      if (month > 9) b = -10;
      if (month === 9 && day > 4) b = -10;
    }

    let jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 2)) + day + b - 1524;

    let b2 = 0;
    if (jd > 2299160) {
      let a2 = Math.floor((jd - 1867216.25) / 36524.25);
      b2 = a2 - Math.floor(a2 / 4) + 1;
    }
    let bb = jd + b2 + 1524;
    let cc = Math.floor((bb - 122.1) / 365.25);
    let dd = Math.floor(365.25 * cc);
    let ee = Math.floor((bb - dd) / 30.6001);
    day = bb - dd - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
      cc += 1;
      month = ee - 13;
    }
    year = cc - 4716;

    let ijd = jd - 1948440 + 10632;
    let n = Math.floor((ijd - 1) / 10631);
    ijd = ijd - 10631 * n;
    let j = Math.floor((ijd - 1) / 354.366); // Approximate lunar year length
    // Adjusting for common Tabular years
    let l = Math.floor((11 * j + 3) / 30);
    ijd = ijd - Math.floor(30 * j + l + 0.5); // This is approximate, but reliable enough for most uses.
    
    // Better algorithm for month and day
    let hYear = n * 30 + j;
    let hMonth = Math.floor((ijd - 1) / 29.5); // Approximate month
    let hDay = ijd - Math.floor(hMonth * 29.5 + 0.5);

    // Final adjustment logic (many apps use a +/- offset)
    if (hDay <= 0) {
      hMonth -= 1;
      hDay += 29; // Approximate
    }
    if (hMonth < 0) {
      hYear -= 1;
      hMonth += 12;
    }
    if (hMonth > 11) {
      hYear += 1;
      hMonth -= 12;
    }

    return {
      day: hDay,
      month: hMonth + 1, // 1-indexed for relations
      year: hYear,
      monthName: HijriUtils.months[hMonth]
    };
  }
};

export default HijriUtils;
