import React from 'react';
import { View } from 'react-native';
import Select2 from 'rn-select2';
import { useTheme } from '../../context/ThemeContext';

const SearchableDropdown = ({ 
  data, 
  value, 
  onSelect, 
  placeholder = "Select an item...",
  popupTitle = "Select Option",
  title = "Select"
}) => {
  const { isDarkMode } = useTheme();

  return (
    <View className="w-full">
      <Select2
        isSelectSingle
        styles={{
          container: {
            borderRadius: 16,
            backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
            borderColor: isDarkMode ? '#334155' : '#e2e8f0',
            borderWidth: 2,
          },
          topBar: {
            container: {
              borderBottomWidth: 0,
              paddingVertical: 12,
            },
            text: {
              color: isDarkMode ? '#f8fafc' : '#0f172a',
              fontWeight: 'bold',
            },
            placeholder: {
              color: isDarkMode ? '#64748b' : '#94a3b8',
            },
          },
          searchBar: {
            container: {
              backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
              borderBottomColor: isDarkMode ? '#334155' : '#e2e8f0',
            },
            input: {
              color: isDarkMode ? '#f8fafc' : '#0f172a',
            },
          },
          listItem: {
            container: {
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              borderBottomColor: isDarkMode ? '#334155' : '#f1f5f9',
            },
            text: {
              color: isDarkMode ? '#cbd5e1' : '#334155',
              fontWeight: '500',
            },
            selectedContainer: {
              backgroundColor: isDarkMode ? '#312e81' : '#e0e7ff',
            },
            selectedText: {
              color: isDarkMode ? '#818cf8' : '#4338ca',
              fontWeight: 'bold',
            },
          }
        }}
        popupTitle={popupTitle}
        title={title}
        data={data}
        onSelect={onSelect}
        onRemoveItem={onSelect}
        value={value}
        searchPlaceHolderText={placeholder}
      />
    </View>
  );
};

export default SearchableDropdown;
