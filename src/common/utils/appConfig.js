import packageJson from '../../../package.json';

export const APP_CONFIG = {
  appName: 'مفاتیح الجنان',
  appNameEn: 'Mafatih ul Jinan',
  version: packageJson.version,
  edition: 'Premium Edition',
};

export const DEFAULT_FONT_SIZES = {
  arabicSize: 30,      // Article Detail main text
  translationSize: 18, // Article Detail translation
  headerSize: 24,      // Article Detail header
  listTitleSize: 20    // List Item title
};
