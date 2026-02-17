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
        // Check if it's specifically an internet issue
        if (result.needsInternet) {
          showAlert(
            "Internet Required",
            "Turn on WiFi or mobile data to get your city name automatically.",
            "warning",
            () => {
              // Open WiFi/Network Settings
              if (Platform.OS === 'android') {
                Linking.sendIntent('android.settings.WIFI_SETTINGS');
              } else {
                Linking.openSettings();
              }

              // Show continue modal
              setTimeout(() => {
                showAlert(
                  "Internet Settings",
                  "Once internet is enabled, press Continue to get your city.",
                  "info",
                  () => checkLocation(),
                  "Continue"
                );
              }, 500);
            },
            "Open WiFi Settings"
          );
        } else {
          // GPS/Permission error (existing logic)
          showAlert(
            "Location Required",
            result.error || "Please turn on GPS to see prayer times.",
            "error",
            () => {
              // Open Location Settings
              if (Platform.OS === 'android') {
                Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
              } else {
                Linking.openSettings();
              }

              // Show continue modal
              setTimeout(() => {
                showAlert(
                  "Location Settings",
                  "Once you have enabled GPS, press Continue to refresh.",
                  "info",
                  () => checkLocation(),
                  "Continue"
                );
              }, 500);
            },
            "Open Settings"
          );
        }
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
