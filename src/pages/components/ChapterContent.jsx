import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from '../../db/client';
import { articles } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { useNavigation } from '@react-navigation/native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

const ChapterContent = ({ chapterId }) => {
  const [loading, setLoading] = useState(true);
  const [chapterArticles, setChapterArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchArticles = async () => {
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
        <ActivityIndicator color="#6366f1" />
      </View>
    );
  }

  if (chapterArticles.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-10">
        <Text className="text-slate-400 dark:text-slate-500 italic">No articles found in this chapter.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      <View className="space-y-3 mb-20">
        {chapterArticles.map((article) => (
          <TouchableOpacity
            key={article.id}
            onPress={() => navigation.navigate('ArticleDetail', { articleId: article.id })}
            activeOpacity={0.7}
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl flex-row items-center border border-slate-50 dark:border-slate-800 shadow-sm"
          >
            <View className="flex-1">
              <Text className="text-slate-900 dark:text-white font-bold text-lg mb-1">{article.title_ar}</Text>
              <Text className="text-slate-500 dark:text-slate-400 text-sm">{article.title_en}</Text>
            </View>
            <ChevronRightIcon size={20} color="#94a3b8" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ChapterContent;
