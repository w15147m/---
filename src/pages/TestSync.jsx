import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { ChevronLeftIcon, CloudArrowDownIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../context/ThemeContext';

const TestSync = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const REPO_URL = 'https://raw.githubusercontent.com/aminpaydar/Mafatih/master/mafatih-server/chapters.json';

  const fetchTaqeebat = async () => {
    setLoading(true);
    try {
      const response = await fetch(REPO_URL);
      const json = await response.json();
      
      // Filter for Taqeebat chapters
      // The JSON structure: array of chapters -> sections -> articles -> items
      const taqeebatChapters = json.filter(chapter => 
        chapter.title.includes('تعقیبات') || 
        (chapter.sections && chapter.sections.some(s => s.articles && s.articles.some(a => a.title && a.title.includes('تعقیبات'))))
      );

      // Extract only articles that are Taqeebat
      const articles = [];
      taqeebatChapters.forEach(chapter => {
        if (chapter.sections) {
          chapter.sections.forEach(section => {
            if (section.articles) {
              section.articles.forEach(article => {
                if (article.title.includes('تعقیب')) {
                   articles.push(article);
                }
              });
            }
          });
        }
      });

      setData({
        totalChapters: json.length,
        taqeebatCount: articles.length,
        articles: articles.slice(0, 10) // Preview first 10
      });

      Alert.alert('Success', `Found ${articles.length} Taqeebat articles!`);
    } catch (error) {
      console.error('Fetch Error:', error);
      Alert.alert('Error', 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
      <View className="flex-row items-center px-6 pt-10 pb-4 border-b border-slate-50 dark:border-slate-900">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="mr-4 p-2 rounded-xl bg-slate-50 dark:bg-slate-900"
        >
          <ChevronLeftIcon size={24} color="#0ea5e9" />
        </TouchableOpacity>
        <Text className="text-slate-900 dark:text-white text-xl font-bold">Data Sync Test</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <View className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-[32px] mb-6">
          <Text className="text-slate-900 dark:text-white text-lg font-bold mb-2">Source URL</Text>
          <Text className="text-slate-500 dark:text-slate-400 text-xs mb-6 italic" numberOfLines={1}>
            {REPO_URL}
          </Text>

          <TouchableOpacity 
            onPress={fetchTaqeebat}
            disabled={loading}
            className="bg-indigo-600 p-4 rounded-2xl flex-row items-center justify-center"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <CloudArrowDownIcon size={20} color="white" className="mr-2" />
                <Text className="text-white font-bold ml-2">Fetch & Filter Taqeebat</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {data && (
          <View className="space-y-4">
            <View className="flex-row justify-between bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
              <Text className="text-slate-500">Total Chapters in JSON</Text>
              <Text className="text-slate-900 dark:text-white font-bold">{data.totalChapters}</Text>
            </View>
            <View className="flex-row justify-between bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-2xl">
              <Text className="text-emerald-700 dark:text-emerald-400">Taqeebat Found</Text>
              <Text className="text-emerald-700 dark:text-emerald-400 font-bold">{data.taqeebatCount}</Text>
            </View>

            <Text className="text-slate-900 dark:text-white text-lg font-bold mt-4 mb-2">Preview (Articles)</Text>
            {data.articles.map((art, idx) => (
              <View key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mb-2">
                <Text className="text-sky-500 text-right text-lg font-islamic mb-1">
                  {art.title.replace(/\n/g, '').trim()}
                </Text>
                <Text className="text-slate-400 text-xs">Items count: {art.items?.length || 0}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestSync;
