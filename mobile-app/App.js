import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BibleScreen from './src/modules/reading/BibleScreen';
import BookListScreen from './src/modules/reading/BookListScreen';
import BookSelector from './src/modules/reading/BookSelector';
import ChapterSelector from './src/modules/reading/ChapterSelector';
import ReadingScreen from './src/modules/reading/ReadingScreen';
import ConfigScreen from './src/modules/reading/ConfigScreen';

import { getDailyVerse } from './src/modules/dailyVerse/dailyVerseService';
import { loadProgress } from './src/modules/reading/progressService';
import { getActiveVersion } from './src/modules/reading/offlineService';

export default function App() {
  const [navigationStack, setNavigationStack] = useState(['HOME']);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTestament, setSelectedTestament] = useState(null); // Estado para o filtro de livros

  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [dailyVerse, setDailyVerse] = useState(null);
  const [activeVersion, setActiveVersion] = useState('KJV');

  const navigateTo = (screen) => {
    setNavigationStack([...navigationStack, screen]);
  };

  const navigateBack = () => {
    if (navigationStack.length > 1) {
      const newStack = [...navigationStack];
      newStack.pop();
      setNavigationStack(newStack);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', navigateBack);
    return () => backHandler.remove();
  }, [navigationStack]);

  useEffect(() => {
    const initApp = async () => {
      const progress = await loadProgress();
      if (progress) { setXp(progress.xp || 0); setStreak(progress.streak || 1); }
      const version = await getActiveVersion();
      setActiveVersion(version === 'default' || version === 'kjv' ? 'KJV' : version.toUpperCase());
      setDailyVerse(getDailyVerse(version));
    };
    if (navigationStack[navigationStack.length - 1] === 'HOME') initApp();
  }, [navigationStack]);

  const currentScreen = navigationStack[navigationStack.length - 1];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" translucent={true} />

      {currentScreen === 'HOME' && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.mainTitle}>📖 Bíblia Viva</Text>
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>🏆 Seu Progresso</Text>
            <View style={styles.progressRow}>
              <Text style={styles.progressItem}>✨ {xp} XP</Text>
              <Text style={styles.progressItem}>🔥 {streak} Dias Seguidos</Text>
            </View>
          </View>
          {dailyVerse && (
            <View style={styles.dailyVerseCard}>
              <Text style={styles.dailyVerseTitle}>💡 Versículo do Dia</Text>
              <Text style={styles.dailyVerseText}>"{dailyVerse.texto}"</Text>
            </View>
          )}

          <View style={styles.gridContainer}>
            <View style={styles.navRow}>
              <TouchableOpacity style={styles.navBox} onPress={() => navigateTo('BIBLE_MAIN')}>
                <Text style={styles.navEmoji}>📖</Text>
                <Text style={styles.navText}>Bíblia</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBox} onPress={() => {}}>
                <Text style={styles.navEmoji}>🌿</Text>
                <Text style={styles.navText}>Planos</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.navRow}>
              <TouchableOpacity style={styles.navBox} onPress={() => {}}>
                <Text style={styles.navEmoji}>🎮</Text>
                <Text style={styles.navText}>Jogos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBox} onPress={() => {}}>
                <Text style={styles.navEmoji}>💬</Text>
                <Text style={styles.navText}>Versículo do Dia</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.navRow}>
              <TouchableOpacity style={styles.navBox} onPress={() => navigateTo('CONFIG')}>
                <Text style={styles.navEmoji}>⚙️</Text>
                <Text style={styles.navText}>Ajustes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBox} onPress={() => navigateTo('PROFILE')}>
                <Text style={styles.navEmoji}>👤</Text>
                <Text style={styles.navText}>Perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      {currentScreen === 'BIBLE_MAIN' && <BibleScreen onBack={navigateBack} onNavigate={navigateTo} />}
      
      {/* Integração completa aqui */}
      {currentScreen === 'BOOK_LIST' && (
        <BookListScreen 
          onBack={navigateBack} 
          onNavigateToBooks={(testamento) => {
            setSelectedTestament(testamento);
            navigateTo('BOOKS');
          }} 
        />
      )}
      
      {currentScreen === 'BOOKS' && (
        <BookSelector 
          testamento={selectedTestament} 
          onBack={navigateBack} 
          onSelectBook={(b) => { setSelectedBook(b); navigateTo('CHAPTERS'); }} 
        />
      )}
      
      {currentScreen === 'CHAPTERS' && (
        <ChapterSelector 
          livro={selectedBook} 
          onBack={navigateBack} 
          onSelectChapter={(c) => { setSelectedChapter(c); navigateTo('READING'); }} 
        />
      )}
      
      {currentScreen === 'READING' && (
        <ReadingScreen 
          livro={selectedBook} 
          capitulo={selectedChapter} 
          onBack={navigateBack} 
        />
      )}
      
      {currentScreen === 'CONFIG' && <ConfigScreen onBack={navigateBack} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { padding: 20 },
  mainTitle: { fontSize: 25, fontWeight: 'bold', color: '#1E1E1E', textAlign: 'center', marginVertical: 20 },
  progressCard: { backgroundColor: '#2A2522', padding: 16, borderRadius: 12, marginBottom: 15 },
  progressTitle: { color: '#D4AF37', fontWeight: 'bold', fontSize: 14, marginBottom: 6 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressItem: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  dailyVerseCard: { backgroundColor: '#FFF', padding: 18, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  dailyVerseTitle: { fontWeight: 'bold', marginBottom: 8 },
  dailyVerseText: { fontSize: 15, color: '#444', fontStyle: 'italic' },
  gridContainer: { marginTop: 10 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  navBox: { backgroundColor: '#FFF', width: '48%', padding: 15, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  navEmoji: { fontSize: 24, marginBottom: 5 },
  navText: { fontSize: 13, fontWeight: '600' }
});