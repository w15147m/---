import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { db } from '../db/client';
import { items, articles } from '../db/schema';
import { eq, asc } from 'drizzle-orm';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const ArticleDetail = ({ route, navigation }) => {
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
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
      {/* Header with extra top spacing */}
      <View className="flex-row items-center px-6 pt-10 pb-4 border-b border-slate-50 dark:border-slate-900">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="mr-4 p-2 rounded-xl bg-slate-50 dark:bg-slate-900"
        >
          <ChevronLeftIcon size={24} color="#0ea5e9" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text 
            className="text-slate-900 dark:text-white text-3xl text-right" 
            numberOfLines={1}
            style={{ fontFamily: 'Mehr-Nastaliq' }}
          >
            {article.title_ar}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        {articleItems.map((item, index) => (
          <View key={item.id} className={`mb-8 p-6 rounded-[32px] ${index % 2 === 0 ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : 'bg-slate-50/50 dark:bg-slate-900/20'}`}>
            {item.instruction && (
              <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-center mb-6 italic">
                {item.instruction}
              </Text>
            )}
            
            <Text 
              className="text-slate-900 dark:text-white text-3xl text-center leading-[60px] mb-8"
              style={{ fontFamily: 'KFGQPCUthmanTahaNaskh-Bold' }}
            >
              {item.arabic_text}
            </Text>

            <View className="space-y-4">
              {item.urdu_translation && (
                <View className="border-t border-slate-100 dark:border-slate-800 pt-4">
                   <Text className="text-slate-600 dark:text-slate-300 text-center text-lg leading-7">
                    {item.urdu_translation}
                  </Text>
                </View>
              )}
              {item.english_translation && (
                <View className="border-t border-slate-100 dark:border-slate-800 pt-4">
                  <Text className="text-slate-400 dark:text-slate-500 text-center text-sm leading-5 italic">
                    {item.english_translation}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticleDetail;
