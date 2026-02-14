import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { ChevronLeftIcon, CloudArrowDownIcon, DocumentArrowDownIcon, DocumentArrowUpIcon } from 'react-native-heroicons/outline';
import RNFS from 'react-native-fs';
import { useTheme } from '../context/ThemeContext';

const TestSync = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [localFileExists, setLocalFileExists] = useState(false);
  const REPO_URL = 'https://raw.githubusercontent.com/aminpaydar/Mafatih/master/mafatih-server/chapters.json';
  const LOCAL_FILE_PATH = `${RNFS.DocumentDirectoryPath}/taqeebat_local.json`;

  useEffect(() => {
    checkLocalFile();
  }, []);

  const checkLocalFile = async () => {
    const exists = await RNFS.exists(LOCAL_FILE_PATH);
    setLocalFileExists(exists);
  };

  const fetchTaqeebat = async () => {
    setLoading(true);
    try {
      const response = await fetch(REPO_URL);
      const json = await response.json();
      
      const articles = [];
      json.forEach(chapter => {
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

      const result = {
        totalChapters: json.length,
        taqeebatCount: articles.length,
        articles: articles // Keep all for saving
      };

      setData(result);
      Alert.alert('Success', `Found ${articles.length} Taqeebat articles!`);
    } catch (error) {
      console.error('Fetch Error:', error);
      Alert.alert('Error', 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const saveToLocalJson = async () => {
    if (!data) {
      Alert.alert('Wait', 'Please fetch data first!');
      return;
    }

    setLoading(true);
    try {
      await RNFS.writeFile(LOCAL_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
      setLocalFileExists(true);
      Alert.alert('Success', 'Data saved to local JSON file!');
    } catch (error) {
      console.error('Save Error:', error);
      Alert.alert('Error', 'Failed to save to local file');
    } finally {
      setLoading(false);
    }
  };

  const loadFromLocalJson = async () => {
    setLoading(true);
    try {
      const exists = await RNFS.exists(LOCAL_FILE_PATH);
      if (!exists) {
        Alert.alert('Error', 'Local file does not exist yet');
        return;
      }

      const content = await RNFS.readFile(LOCAL_FILE_PATH, 'utf8');
      const json = JSON.parse(content);
      setData(json);
      Alert.alert('Success', `Loaded ${json.taqeebatCount} articles from local file!`);
    } catch (error) {
      console.error('Load Error:', error);
      Alert.alert('Error', 'Failed to read local file');
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
          <Text className="text-slate-900 dark:text-white text-lg font-bold mb-2">Remote Source</Text>
          <Text className="text-slate-500 dark:text-slate-400 text-xs mb-6 italic" numberOfLines={1}>
            {REPO_URL}
          </Text>

          <TouchableOpacity 
            onPress={fetchTaqeebat}
            disabled={loading}
            className="bg-indigo-600 p-4 rounded-2xl flex-row items-center justify-center mb-4"
          >
            {loading ? <ActivityIndicator color="white" /> : (
              <><CloudArrowDownIcon size={20} color="white" /><Text className="text-white font-bold ml-2">Fetch Taqeebat</Text></>
            )}
          </TouchableOpacity>

          <View className="flex-row space-x-2">
            <TouchableOpacity 
              onPress={saveToLocalJson}
              disabled={!data || loading}
              className={`flex-1 p-4 rounded-2xl flex-row items-center justify-center ${!data ? 'bg-slate-200 dark:bg-slate-800' : 'bg-emerald-600'}`}
            >
              <DocumentArrowDownIcon size={20} color="white" />
              <Text className="text-white font-bold ml-2">Save JSON</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={loadFromLocalJson}
              disabled={loading || !localFileExists}
              className={`flex-1 p-4 rounded-2xl flex-row items-center justify-center ${!localFileExists ? 'bg-slate-200 dark:bg-slate-800' : 'bg-amber-600'}`}
            >
              <DocumentArrowUpIcon size={20} color="white" />
              <Text className="text-white font-bold ml-2">Load JSON</Text>
            </TouchableOpacity>
          </View>
        </View>

        {data && (
          <View className="space-y-4">
            <View className="flex-row justify-between bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl">
              <Text className="text-slate-500">Taqeebat Found</Text>
              <Text className="text-slate-900 dark:text-white font-bold">{data.taqeebatCount}</Text>
            </View>

            <Text className="text-slate-900 dark:text-white text-lg font-bold mt-4 mb-2">Preview (Articles)</Text>
            {data.articles.slice(0, 10).map((art, idx) => (
              <View key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mb-2">
                <Text className="text-sky-500 text-right text-lg font-islamic mb-1">
                  {art.title.replace(/\n/g, '').trim()}
                </Text>
                <Text className="text-slate-400 text-xs">Items: {art.items?.length || 0}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestSync;
