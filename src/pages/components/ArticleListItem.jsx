import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ListItemMarker from './ListItemMarker';

const ArticleListItem = ({ article, index, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center py-4 border-b border-white/10"
    >
      {/* Number Index Marker */}
      <ListItemMarker index={index + 1} />

      {/* Content Section */}
      <View className="flex-1 ml-4 justify-center">
        <Text className="text-white text-xl font-bold mb-0.5">{article.title_en || 'Article Title'}</Text>
        <Text className="text-white/50 text-xs uppercase tracking-widest font-bold">
          {article.type || 'CONTENT'} • {article.detail || 'DETAIL'}
        </Text>
      </View>

      {/* Arabic Name */}
      <View>
        <Text className="text-sky-400 text-2xl font-islamic text-right">
          {article.title_ar}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleListItem;
