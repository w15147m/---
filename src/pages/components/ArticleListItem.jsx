import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ListItemMarker from './ListItemMarker';

const ArticleListItem = ({ article, index, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row-reverse items-center py-4 border-b border-slate-100 dark:border-white/10"
    >
      {/* Number Index Marker (Right Side) */}
      <View className="pl-4">
        <ListItemMarker index={index + 1} />
      </View>

      {/* Content Section (Arabic Title) */}
      <View className="flex-1 justify-center">
        <Text 
          className="text-sky-500 text-2xl text-right"
          style={{ fontFamily: 'KFGQPCUthmanTahaNaskh-Bold', lineHeight: 45 }}
        >
          {article.title_ar}
        </Text>
        {/* Optional Subtext if needed, currently hidden/removed per request */}
      </View>
    </TouchableOpacity>
  );
};

export default ArticleListItem;
