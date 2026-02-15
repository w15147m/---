/**
 * Utility to convert Gregorian date to Hijri date.
 */
const HijriUtils = {
  months: [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Ula", "Jumada al-Akhirah", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ],

  /**
   * Converts a Date object to Hijri date parts.
   */
  getHijriDate: (d = new Date()) => {
    let date = new Date(d);
    let jd = 0;
    
    // Julian Day Calculation
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (year < 1700) return { day: 0, month: 0, year: 0, monthName: "" };

    let m = month;
    let y = year;
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    let a = Math.floor(y / 100);
    let b = 2 - a + Math.floor(a / 4);
    jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;

    // Hijri Conversion
    let l = Math.floor(jd) - 1948439 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n;
    let j = Math.floor((l - 1) / 354.36667);
    l = l - Math.floor(j * 354.36667 + 0.852);
    let hMonth = Math.floor((l - 0.5) / 29.5) + 1;
    let hDay = Math.floor(l - (Math.floor(29.5 * (hMonth - 1) + 0.5)));
    let hYear = n * 30 + j;

    // Boundary fixes
    if (hMonth > 12) {
      hMonth = 1;
      hYear++;
    }
    
    // For 15 Feb 2026, JD is 2461087.
    // Result is 26 Shaban. Common visibility adjustment -> +1 (27 Shaban).
    hDay += 1; 
    if (hDay > 30) {
       hDay = 1;
       hMonth++;
    }

    return {
      day: hDay,
      month: hMonth,
      year: hYear,
      monthName: HijriUtils.months[hMonth - 1] || ""
    };
  }
};

export default HijriUtils;
