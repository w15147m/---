/**
 * Data mapping for Daily Amal (Prayers, Supplications, and Ziyarats).
 * Maps weekdays, Hijri dates, and special events to their respective articles.
 */

export const WEEKDAY_AMAL = {
  0: [ // Sunday
    { id: 'sun_1', title_ur: 'دعائے روزِ اتوار', title_en: 'Sunday Dua', article_name: 'Sunday Dua' },
    { id: 'sun_2', title_ur: 'زیارتِ حضرت علی (ع) و فاطمہ (س)', title_en: 'Ziyarat of Imam Ali (as) & Lady Fatima (sa)', article_name: 'Ziyarat Sunday' }
  ],
  1: [ // Monday
    { id: 'mon_1', title_ur: 'دعائے روزِ پیر', title_en: 'Monday Dua', article_name: 'Monday Dua' },
    { id: 'mon_2', title_ur: 'زیارتِ امام حسن (ع) و حسین (ع)', title_en: 'Ziyarat of Imam Hasan (as) & Imam Husayn (as)', article_name: 'Ziyarat Monday' }
  ],
  2: [ // Tuesday
    { id: 'tue_1', title_ur: 'دعائے روزِ منگل', title_en: 'Tuesday Dua', article_name: 'Tuesday Dua' },
    { id: 'tue_2', title_ur: 'زیارتِ ائمہ بقیع (ع)', title_en: 'Ziyarat of Baqi Imams (as)', article_name: 'Ziyarat Tuesday' }
  ],
  3: [ // Wednesday
    { id: 'wed_1', title_ur: 'دعائے روزِ بدھ', title_en: 'Wednesday Dua', article_name: 'Wednesday Dua' },
    { id: 'wed_2', title_ur: 'زیارتِ ائمہ موسوی (ع)', title_en: 'Ziyarat of Imams Kazim, Rida, Jawad & Hadi (as)', article_name: 'Ziyarat Wednesday' }
  ],
  4: [ // Thursday
    { id: 'thu_1', title_ur: 'دعائے روزِ جمعرات', title_en: 'Thursday Dua', article_name: 'Thursday Dua' },
    { id: 'thu_2', title_ur: 'زیارتِ امام حسن عسکری (ع)', title_en: 'Ziyarat of Imam Hasan al-Askari (as)', article_name: 'Ziyarat Thursday' },
    { id: 'thu_3', title_ur: 'دعائے کمیل', title_en: 'Dua Kumayl', article_name: 'Dua Kumayl', isEvening: true }
  ],
  5: [ // Friday
    { id: 'fri_1', title_ur: 'دعائے روزِ جمعہ', title_en: 'Friday Dua', article_name: 'Friday Dua' },
    { id: 'fri_2', title_ur: 'زیارتِ امام زمانہ (عج)', title_en: 'Ziyarat of Imam al-Mahdi (atfs)', article_name: 'Ziyarat Friday' },
    { id: 'fri_3', title_ur: 'دعائے ندبہ', title_en: 'Dua Nudba', article_name: 'Dua Nudba', isMorning: true },
    { id: 'fri_4', title_ur: 'دعائے سمات', title_en: 'Dua Simat', article_name: 'Dua Simat', isEvening: true }
  ],
  6: [ // Saturday
    { id: 'sat_1', title_ur: 'دعائے روزِ ہفتہ', title_en: 'Saturday Dua', article_name: 'Saturday Dua' },
    { id: 'sat_2', title_ur: 'زیارتِ رسول اللہ (ص)', title_en: 'Ziyarat of Prophet Muhammad (s)', article_name: 'Ziyarat Saturday' }
  ]
};

export const HIJRI_EVENTS = {
  '1/1': [{ id: 'muh_1', title_ur: 'دعائے اولِ محرم', title_en: 'Dua for 1st Muharram', article_name: '1st Muharram Dua' }],
  // Add more events as needed
  '19/9': [{ id: 'ram_19', title_ur: 'اعمالِ شبِ ۱۹ رمضان', title_en: 'Amal of 19th Ramadan', article_name: '19th Ramadan' }],
  '21/9': [{ id: 'ram_21', title_ur: 'اعمالِ شبِ ۲۱ رمضان', title_en: 'Amal of 21st Ramadan', article_name: '21st Ramadan' }],
  '23/9': [{ id: 'ram_23', title_ur: 'اعمالِ شبِ ۲۳ رمضان', title_en: 'Amal of 23rd Ramadan', article_name: '23rd Ramadan' }],
  '15/8': [{ id: 'shb_15', title_ur: 'اعمالِ شبِ نیمہ شعبان', title_en: 'Amal of 15th Shaban', article_name: '15th Shaban' }]
};

export const MONTHLY_AMAL = {
  9: [ // Ramadan
    { id: 'ram_daily', title_ur: 'دعائے روزانہ ماہِ رمضان', title_en: 'Daily Ramadan Dua', article_name: 'Dua-e-Mahe-Ramadan' }
  ]
};
