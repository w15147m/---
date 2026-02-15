import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { useColorScheme } from 'nativewind';
import { getItem, setItem } from '../utils/storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [themeMode, setThemeMode] = useState('system');

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    let subscription;
    
    if (themeMode === 'system') {
      // Set initial system theme
      const systemScheme = Appearance.getColorScheme();
      if (systemScheme) {
        setColorScheme(systemScheme);
      }

      // Listen for system theme changes
      subscription = Appearance.addChangeListener(({ colorScheme: newScheme }) => {
        if (newScheme) {
          setColorScheme(newScheme);
        }
      });
    } else {
      // Set manual theme
      setColorScheme(themeMode);
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [themeMode]);

  const loadTheme = async () => {
    const savedMode = await getItem('themeMode');
    if (savedMode) {
      setThemeMode(savedMode);
    }
  };

  const changeThemeMode = async (mode) => {
    setThemeMode(mode);
    await setItem('themeMode', mode);
  };

  return (
    <ThemeContext.Provider value={{ 
      themeMode,
      isDarkMode: colorScheme === 'dark',
      setThemeMode: changeThemeMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
