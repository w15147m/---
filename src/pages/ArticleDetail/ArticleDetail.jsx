import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { db } from '../../db/client';
import { items, articles } from '../../db/schema';
import { eq, asc } from 'drizzle-orm';

import { useTheme } from '../../context/ThemeContext';
import { useFont } from '../../context/FontContext';
import ArticleItem from './components/ArticleItem';

const ArticleDetail = ({ route }) => {
  const { isDarkMode } = useTheme();
  const { arabicSize, translationSize, headerSize } = useFont();
  const { articleId } = route.params;
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [articleItems, setArticleItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleRes = await db.select().from(articles).where(eq(articles.id, articleId)).limit(1);
        if (articleRes.length > 0) {
          setArticle(articleRes[0]);
          const itemsRes = await db.select()
            .from(items)
            .where(eq(items.article_id, articleId))
            .orderBy(asc(items.sequence_order));
          setArticleItems(itemsRes);
        }
      } catch (error) {
        console.error('Error fetching article detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [articleId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-950 justify-center items-center">
        <ActivityIndicator color="#6366f1" />
      </SafeAreaView>
    );
  }

  if (!article) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-slate-950 justify-center items-center">
        <Text className="text-slate-500">Article not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
      {/* Header Title Card */}
      <View className="items-center px-2 pt-14 pb-4">
        <View className="bg-white dark:bg-slate-900 w-full rounded-2xl py-4 shadow-sm border border-slate-100 dark:border-slate-800">
          <Text
            className="text-slate-900 dark:text-white text-center"
            numberOfLines={1}
            style={{
              fontFamily: 'KFGQPCUthmanTahaNaskh-Bold',
              fontSize: headerSize,
              lineHeight: headerSize * 1.6
            }}
          >
            {article.title_ar}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 40 }}>
        {/* Main Content Card */}
        <View className="bg-white dark:bg-slate-900 rounded-[20px] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
          {articleItems.map((item, index) => (
            <ArticleItem
              key={item.id}
              item={item}
              index={index}
              isDarkMode={isDarkMode}
              arabicSize={arabicSize}
              translationSize={translationSize}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticleDetail;
