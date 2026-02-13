import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ListItemMarker from './ListItemMarker';

const ArticleListItem = ({ article, index, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center py-4 border-b border-slate-100 dark:border-white/10"
    >
      {/* Number Index Marker */}
      <ListItemMarker index={index + 1} />

      {/* Content Section */}
      <View className="flex-1 ml-4 justify-center">
        <Text className="text-slate-900 dark:text-white text-xl font-bold mb-0.5">{article.title_en || 'Article Title'}</Text>
        <Text className="text-slate-400 dark:text-white/50 text-xs uppercase tracking-widest font-bold">
          {article.type || ''}  {article.detail || ''}
        </Text>
      </View>

      {/* Arabic Name */}
      <View>
        <Text 
          className="text-sky-500 text-2xl text-right mt-1"
          style={{ fontFamily: 'KFGQPCUthmanTahaNaskh-Bold', lineHeight: 40 }}
        >
          {article.title_ar}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleListItem;
