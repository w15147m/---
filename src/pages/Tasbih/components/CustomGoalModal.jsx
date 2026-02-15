import React from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { XMarkIcon, CheckIcon } from 'react-native-heroicons/outline';
import SearchableDropdown from '../../../common/components/SearchableDropdown';

const CustomGoalModal = ({
  isVisible,
  onClose,
  tempGoal,
  setTempGoal,
  tempZikrId,
  setTempZikrId,
  onApply,
  zikrData,
  isDarkMode
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white dark:bg-slate-900 rounded-t-[40px] p-8 pb-12 shadow-2xl">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-black text-slate-900 dark:text-white">Custom Goal</Text>
            <TouchableOpacity onPress={onClose}>
              <XMarkIcon size={28} color={isDarkMode ? "#94a3b8" : "#64748b"} />
            </TouchableOpacity>
          </View>

          <Text className="text-slate-500 dark:text-slate-400 font-bold mb-3 uppercase tracking-wider text-xs">Set Target Count</Text>
          <TextInput
            value={tempGoal}
            onChangeText={setTempGoal}
            keyboardType="numeric"
            placeholder="Enter goal (e.g. 100)"
            placeholderTextColor="#94a3b8"
            className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-xl font-bold text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 mb-6"
          />

          <Text className="text-slate-500 dark:text-slate-400 font-bold mb-3 uppercase tracking-wider text-xs">Select Zikr</Text>
          
          <View className="mb-8">
            <SearchableDropdown
              popupTitle="Choose your Zikr"
              title="Select Zikr"
              data={{ type: 'list', data: zikrData }}
              onSelect={setTempZikrId}
              value={tempZikrId}
              placeholder="Filter Zikrs..."
            />
          </View>

          <TouchableOpacity
            onPress={onApply}
            className="bg-indigo-600 w-full p-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-indigo-500/30"
          >
            <CheckIcon size={24} color="white" />
            <Text className="text-white font-black text-lg ml-2">Start Zikr</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomGoalModal;
