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
      <View className="flex-1 bg-slate-950 justify-center items-center">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-950">
      <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6">
          
          {/* Modular Header */}
          <HomeHeader onOpenDrawer={() => navigation.openDrawer()} />

          {/* Hero Section */}
          <View className="items-center justify-center my-4">
            <Image 
              source={require('../assets/ui-assets/Quran.png')}
              style={{ width: width * 0.5, height: width * 0.35 }}
              resizeMode="contain"
            />
          </View>

          {topLevelChapters.length > 0 ? (
            <View className="flex-1">
              {/* Main Horizontal Tabs */}
              <View className="mb-4">
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                >
                  {topLevelChapters.map((chapter) => {
                    const isActive = activeTabId === chapter.id;
                    return (
                      <TouchableOpacity
                        key={chapter.id}
                        onPress={() => setActiveTabId(chapter.id)}
                        className={`mr-8 pb-3 items-center ${isActive ? 'border-b-4 border-sky-400' : ''}`}
                      >
                        <Text 
                          className={`text-xl font-bold ${isActive ? 'text-white' : 'text-white/50'}`}
                        >
                          {chapter.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Sub-Tabs (Specific / General) if exist */}
              {subChapters.length > 0 && (
                <View className="bg-sky-400/20 rounded-2xl flex-row p-1 mb-4">
                  {subChapters.map((sub) => {
                    const isActive = activeSubTabId === sub.id;
                    return (
                      <TouchableOpacity
                        key={sub.id}
                        onPress={() => setActiveSubTabId(sub.id)}
                        className={`flex-1 py-3 items-center rounded-xl ${isActive ? 'bg-sky-400 shadow-lg' : ''}`}
                      >
                        <Text 
                          className={`text-lg transition-all ${isActive ? 'text-white font-bold' : 'text-white/60 font-medium'}`}
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
              <Text className="text-white/50 text-center">No categories found in the library yet.</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Explorer;
