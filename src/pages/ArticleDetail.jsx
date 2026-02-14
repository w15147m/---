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

import { useTheme } from '../context/ThemeContext';
import { useFont } from '../context/FontContext';

const ArticleDetail = ({ route, navigation }) => {
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
            <View key={item.id} className="mb-0">
              {/* Lined Background Container */}
              <View 
                className="relative py-0"
                style={{
                  backgroundColor: isDarkMode 
                    ? (index % 2 === 0 ? '#0f172a' : '#1e293b') // slate-900 : slate-800
                    : (index % 2 === 0 ? '#ffffff' : '#fcfcfc') 
                }}
              >
                {/* Notebook Lines Background */}
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
                  {Array.from({ length: Math.ceil((item.arabic_text?.length || 0) / 40) + 4 }).map((_, i) => (
                    <View 
                      key={i} 
                      style={{ 
                        height: 60, 
                        borderBottomWidth: 1, 
                        borderBottomColor: isDarkMode ? '#334155' : '#cbd5e1', // slate-700 : slate-300
                        width: '100%'
                      }} 
                    />
                  ))}
                </View>

                {item.instruction && (
                  <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-center italic px-2 mt-6 mb-2">
                    ({item.instruction})
                  </Text>
                )}
                
                <Text 
                  className="text-slate-900 dark:text-white text-center px-1"
                  style={{ 
                    fontFamily: 'KFGQPCUthmanTahaNaskh-Bold',
                    fontSize: arabicSize,
                    lineHeight: 60, 
                    paddingTop: 8, // Adjust to sit on the line
                    paddingBottom: 12 // Clear descenders
                  }}
                >
                  {item.arabic_text}
                </Text>

                {/* Sub-content (Translations) */}
                <View className="px-4 pb-8 space-y-4 pt-4">
                  {item.urdu_translation && (
                     <Text 
                       className="text-slate-600 dark:text-slate-300 text-center font-serif"
                       style={{ fontSize: translationSize, lineHeight: translationSize * 1.6 }}
                     >
                      {item.urdu_translation}
                    </Text>
                  )}
                  {item.english_translation && (
                    <Text 
                      className="text-slate-400 dark:text-slate-500 text-center italic"
                      style={{ fontSize: translationSize - 4, lineHeight: (translationSize - 4) * 1.6 }}
                    >
                      {item.english_translation}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticleDetail;
