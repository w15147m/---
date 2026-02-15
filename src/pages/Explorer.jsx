import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ActivityIndicator, 
  TouchableOpacity, 
  ScrollView, 
  ImageBackground, 
  Image,
  Dimensions,
  StatusBar
} from 'react-native';
import { db } from '../db/client';
import { chapters } from '../db/schema';
import { isNull, eq } from 'drizzle-orm';
import { useTheme } from '../context/ThemeContext';
import HomeHeader from './components/HomeHeader';
import MainTabSelector from './components/MainTabSelector';
import SubTabSelector from './components/SubTabSelector';
import ChapterContent from './components/ChapterContent';

const { width } = Dimensions.get('window');

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
          .where(eq(chapters.parent_id, activeTabId));
        
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
      <View className="flex-1 bg-slate-50 dark:bg-slate-950 justify-center items-center">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-950">
      <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6">
          
          {/* Modular Header with dynamic title (Urdu Only) */}
          <HomeHeader 
            title={
              (() => {
                const fullTitle = topLevelChapters.find(c => c.id === activeTabId)?.name || 'Library';
                // Split by '(' to remove English translation if present
                return fullTitle.split('(')[0].trim();
              })()
            }
            onOpenDrawer={() => navigation.openDrawer()} 
          />

          {topLevelChapters.length > 0 ? (
            <View className="flex-1">
              
              {/* Sub-Tabs (Specific / General) */}
              <SubTabSelector 
                tabs={subChapters}
                activeTabId={activeSubTabId}
                onTabPress={setActiveSubTabId}
              />

              {/* Active Tab Content */}
              <View className="flex-1">
                <ChapterContent chapterId={activeSubTabId || activeTabId} />
              </View>
            </View>
          ) : (
            <View className="flex-1 justify-center items-center p-10">
              <Text className="text-slate-400 dark:text-white/50 text-center">No categories found in the library yet.</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Explorer;
