import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from '../../db/client';
import { articles } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { useNavigation } from '@react-navigation/native';
import ListItemMarker from './ListItemMarker';

const ChapterContent = ({ chapterId }) => {
  const [loading, setLoading] = useState(true);
  const [chapterArticles, setChapterArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchArticles = async () => {
      if (!chapterId) return;
      try {
        const results = await db.select().from(articles).where(eq(articles.chapter_id, chapterId));
        setChapterArticles(results);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [chapterId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center p-10">
        <ActivityIndicator color="#0ea5e9" />
      </View>
    );
  }

  if (chapterArticles.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-10">
        <Text className="text-white/40 italic">No articles found in this section.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="mb-20">
        {chapterArticles.map((article, index) => (
          <TouchableOpacity
            key={article.id}
            onPress={() => navigation.navigate('ArticleDetail', { articleId: article.id })}
            activeOpacity={0.7}
            className="flex-row items-center py-4 border-b border-white/10"
          >
            {/* Number Index Marker */}
            <ListItemMarker index={index + 1} />

            {/* Content Section */}
            <View className="flex-1 ml-4 justify-center">
              <Text className="text-white text-xl font-bold mb-0.5">{article.title_en || 'Surah Title'}</Text>
              <Text className="text-white/50 text-xs uppercase tracking-widest font-bold">
                {article.type || 'MOCK'} • {article.detail || '7 VERSES'}
              </Text>
            </View>

            {/* Arabic Name */}
            <View>
              <Text className="text-sky-400 text-2xl font-islamic text-right">
                {article.title_ar}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ChapterContent;
