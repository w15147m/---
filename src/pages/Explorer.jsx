import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../db/client';
import { chapters } from '../db/schema';
import { isNull } from 'drizzle-orm';
import { useTheme } from '../context/ThemeContext';
import { Bars3Icon } from 'react-native-heroicons/outline';
import ChapterContent from './components/ChapterContent';

const Explorer = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [topLevelChapters, setTopLevelChapters] = useState([]);
  const [subChapters, setSubChapters] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [activeSubTabId, setActiveSubTabId] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const results = await db.select().from(chapters).where(isNull(chapters.parent_id));
        setTopLevelChapters(results);
        
        let initialTabId = null;
        const initialName = route.params?.initialChapterName;
        if (initialName) {
           const initialChapter = results.find(c => c.name === initialName);
           if (initialChapter) initialTabId = initialChapter.id;
        }

        if (!initialTabId && results.length > 0) {
          initialTabId = results[0].id;
        }

        setActiveTabId(initialTabId);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [route.params?.initialChapterName]);

  // Fetch sub-chapters when active tab changes
  useEffect(() => {
    if (!activeTabId) return;

    const fetchSubChapters = async () => {
      try {
        const results = await db.select().from(chapters)
          .where(require('drizzle-orm').eq(chapters.parent_id, activeTabId));
        
        setSubChapters(results);
        if (results.length > 0) {
          setActiveSubTabId(results[0].id);
        } else {
          setActiveSubTabId(null);
        }
      } catch (error) {
        console.error('Error fetching sub-chapters:', error);
      }
    };

    fetchSubChapters();
  }, [activeTabId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950 px-6 pt-4">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#6366f1" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-4 mb-4">
        <View>
          <Text className="text-slate-400 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
            Explore
          </Text>
          <Text className="text-2xl font-black text-slate-900 dark:text-white">Library</Text>
        </View>
        <TouchableOpacity 
          className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800"
          onPress={() => navigation.openDrawer()}
        >
          <Bars3Icon size={24} color={isDarkMode ? "#f8fafc" : "#1e293b"} />
        </TouchableOpacity>
      </View>

      {topLevelChapters.length > 0 ? (
        <View className="flex-1">
          {/* Main Horizontal Tabs */}
          <View className="mb-2">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {topLevelChapters.map((chapter) => {
                const isActive = activeTabId === chapter.id;
                return (
                  <TouchableOpacity
                    key={chapter.id}
                    onPress={() => setActiveTabId(chapter.id)}
                    className={`mr-4 pb-2 px-2 ${isActive ? 'border-b-4 border-indigo-600' : ''}`}
                  >
                    <Text className={`text-base font-bold ${isActive ? (isDarkMode ? 'text-white' : 'text-slate-900') : 'text-slate-400'}`}>
                      {chapter.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Sub-Tabs (Specific / General) if exist */}
          {subChapters.length > 0 && (
            <View className="bg-white dark:bg-slate-900 mx-4 rounded-2xl shadow-sm mb-4 flex-row p-1 border border-slate-100 dark:border-slate-800">
              {subChapters.map((sub) => {
                const isActive = activeSubTabId === sub.id;
                return (
                  <TouchableOpacity
                    key={sub.id}
                    onPress={() => setActiveSubTabId(sub.id)}
                    className={`flex-1 py-3 items-center rounded-xl ${isActive ? 'bg-indigo-600 shadow-md' : ''}`}
                  >
                    <Text 
                      style={{ fontFamily: 'AlQuranIndoPak' }}
                      className={`text-base ${isActive ? 'text-white font-bold' : 'text-slate-400 font-medium'}`}
                    >
                      {sub.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Active Tab Content */}
          <View className="flex-1">
            <ChapterContent chapterId={activeSubTabId || activeTabId} />
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center p-10">
          <Text className="text-slate-400 dark:text-slate-500 text-center">No categories found in the library yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Explorer;
