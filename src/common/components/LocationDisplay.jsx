import React, { useEffect } from 'react';
import { Text, TouchableOpacity, Alert, Linking, View, ActivityIndicator, Platform } from 'react-native';
import useLocation from '../hooks/useLocation';
import { useAlert } from '../../context/AlertContext';

const LocationDisplay = ({ style, textStyle }) => {
  const { location, loading, triggerGPS } = useLocation();
  const { showAlert } = useAlert();

  const checkLocation = async () => {
    // If no location or generic name, try to fetch
    if (!location || location.cityName === 'Unknown Location') {
      const result = await triggerGPS();
      
      if (!result.success) {
        // Show persistent modal
        showAlert(
          "Location Required",
          result.error || "Please turn on GPS to see prayer times.",
          "error",
          () => {
            // 1. Open Settings
            if (Platform.OS === 'android') {
              Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
            } else {
              Linking.openSettings();
            }

            // 2. Immediately show "Continue" modal to wait for user return
            setTimeout(() => {
              showAlert(
                "Location Settings",
                "Once you have enabled GPS, press Continue to refresh.",
                "info",
                () => checkLocation(), // This will loop back if it fails again
                "Continue"
              );
            }, 500);
          },
          "Open Settings"
        );
      }
    }
  };

  useEffect(() => {
    checkLocation();
  }, []);

  const handlePress = () => {
    checkLocation();
  };

  if (loading) {
    return (
      <View className="flex-row items-center">
        <ActivityIndicator size="small" color="white" className="mr-2" />
        <Text style={textStyle} className="text-white/70">Locating...</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Text style={textStyle} className="text-white/70 text-base" numberOfLines={1}>
        {location?.cityName || 'Tap to enable location'}
      </Text>
    </TouchableOpacity>
  );
};

export default LocationDisplay;
