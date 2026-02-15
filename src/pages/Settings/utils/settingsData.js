import { MoonIcon, SunIcon, ComputerDesktopIcon } from 'react-native-heroicons/outline';

export const THEME_OPTIONS = [
  { id: 'light', label: 'Light', icon: SunIcon, color: '#f59e0b' },
  { id: 'dark', label: 'Dark', icon: MoonIcon, color: '#fbbf24' },
  { id: 'system', label: 'Follow system', icon: ComputerDesktopIcon, color: '#6366f1' }
];

export const FONT_CONFIG = [
  {
    key: 'arabicSize',
    label: 'Arabic Text Size',
    min: 20,
    max: 44,
    preview: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    description: 'Main Arabic content in articles'
  },
  {
    key: 'translationSize',
    label: 'Translation Text Size',
    min: 14,
    max: 28,
    preview: 'In the name of Allah, the Most Gracious, the Most Merciful',
    description: 'Urdu and English translations'
  },
  {
    key: 'headerSize',
    label: 'Header Text Size',
    min: 18,
    max: 36,
    preview: 'دُعَاءُ الصَّبَاحِ',
    description: 'Article titles and headers'
  },
  {
    key: 'listTitleSize',
    label: 'List Item Title Size',
    min: 16,
    max: 30,
    preview: 'تَعْقِيبَاتِ نَمَازِ صُبْح',
    description: 'Prayer and chapter list items'
  }
];
