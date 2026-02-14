import React, { createContext, useContext, useEffect, useState } from 'react';
import { getItem, setItem } from '../utils/storage';
import { DEFAULT_FONT_SIZES } from '../common/utils/appConfig';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontSizes, setFontSizes] = useState(DEFAULT_FONT_SIZES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      const savedFonts = await getItem('font_sizes');
      if (savedFonts) {
        // Merge with defaults to ensure all keys exist if we add new ones later
        setFontSizes({ ...DEFAULT_FONT_SIZES, ...savedFonts });
      }
    } catch (error) {
      console.error('Failed to load font settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const changeFontSize = async (key, value) => {
    const newSizes = { ...fontSizes, [key]: value };
    setFontSizes(newSizes);
    await setItem('font_sizes', newSizes);
  };

  const resetFonts = async () => {
    setFontSizes(DEFAULT_FONT_SIZES);
    await setItem('font_sizes', DEFAULT_FONT_SIZES);
  };

  return (
    <FontContext.Provider value={{ 
      ...fontSizes, 
      setFontSize: changeFontSize,
      resetFonts,
      loading
    }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
