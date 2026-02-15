import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  FlatList, 
  TextInput,
  SafeAreaView
} from 'react-native';
import { 
  MapPinIcon, 
  MagnifyingGlassIcon,
  XMarkIcon
} from 'react-native-heroicons/solid';

const CITIES = [
  { name: 'Karachi, PK', lat: 24.8607, lon: 67.0011 },
  { name: 'Lahore, PK', lat: 31.5204, lon: 74.3587 },
  { name: 'Islamabad, PK', lat: 33.6844, lon: 73.0479 },
  { name: 'Tehran, IR', lat: 35.6892, lon: 51.3890 },
  { name: 'London, UK', lat: 51.5074, lon: -0.1278 },
  { name: 'New York, US', lat: 40.7128, lon: -74.0060 },
  { name: 'Dubai, UAE', lat: 25.2048, lon: 55.2708 },
  { name: 'Mumbai, IN', lat: 19.0760, lon: 72.8777 },
];

const LocationModal = ({ isVisible, onClose, onSelectCity }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCities = searchQuery.trim() === '' 
    ? CITIES 
    : CITIES.filter(city => city.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-slate-50 dark:bg-slate-900 rounded-t-[40px] h-[80%] p-6">
          <SafeAreaView className="flex-1">
            
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-slate-900 dark:text-white text-2xl font-black">
                  Set Your Location
                </Text>
                <Text className="text-slate-500 dark:text-slate-400 text-sm">
                  Choose your city for accurate prayer times
                </Text>
              </View>
              <TouchableOpacity onPress={onClose} className="p-2">
                <XMarkIcon size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="flex-row items-center bg-slate-200/50 dark:bg-slate-800 rounded-2xl px-4 py-3 mb-6">
              <MagnifyingGlassIcon size={20} color="#94a3b8" />
              <TextInput
                placeholder="Search city..."
                placeholderTextColor="#94a3b8"
                className="flex-1 ml-3 text-slate-900 dark:text-white font-medium"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* City List */}
            <FlatList
              data={filteredCities}
              keyExtractor={(item) => item.name}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => onSelectCity(item)}
                  className="flex-row items-center py-4 border-b border-slate-200 dark:border-slate-800"
                >
                  <View className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl mr-4">
                    <MapPinIcon size={20} color="#6366f1" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-900 dark:text-white text-lg font-bold">
                      {item.name}
                    </Text>
                    <Text className="text-slate-500 text-xs">
                      Lat: {item.lat.toFixed(2)}, Lon: {item.lon.toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            {/* GPS Fallback Tip */}
            <View className="mt-4 p-4 bg-sky-50 dark:bg-sky-950/20 rounded-2xl border border-sky-100 dark:border-sky-900/50">
              <Text className="text-sky-700 dark:text-sky-400 text-xs text-center leading-relaxed">
                Tip: If your city isn't listed, pick the nearest major city for similar accuracy.
              </Text>
            </View>

          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;
