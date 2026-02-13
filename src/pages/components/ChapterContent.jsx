import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from '../../db/client';
import { articles } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { useNavigation } from '@react-navigation/native';
import ArticleListItem from './ArticleListItem';

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
          <ArticleListItem 
            key={article.id}
            article={article}
            index={index}
            onPress={() => navigation.navigate('ArticleDetail', { articleId: article.id })}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ChapterContent;
