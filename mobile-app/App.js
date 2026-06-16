import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Platform } from 'react-native';

import BookSelector from './src/modules/reading/BookSelector';
import ChapterSelector from './src/modules/reading/ChapterSelector';
import ReadingScreen from './src/modules/reading/ReadingScreen';
import ConfigScreen from './src/modules/reading/ConfigScreen';

import { getDailyVerse } from './src/modules/dailyVerse/dailyVerseService';
import { loadProgress } from './src/modules/reading/progressService';
import { getActiveVersion } from './src/modules/reading/offlineService';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('HOME');
  const [selectedTestament, setSelectedTestament] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [dailyVerse, setDailyVerse] = useState(null);
  const [activeVersion, setActiveVersion] = useState('KJV');

  useEffect(() => {
    const initApp = async () => {
      try {
        const progress = await loadProgress();
        if (progress) {
          setXp(progress.xp || 0);
          setStreak(progress.streak || 1);
        }

        const version = await getActiveVersion();
        
        if (version === 'default' || version === 'kjv') {
          setActiveVersion('KJV');
        } else {
          setActiveVersion(version.toUpperCase());
        }

        const verse = getDailyVerse(version);
        setDailyVerse(verse);
      } catch (error) {
        console.log("Erro ao inicializar dados na Home:", error);
      }
    };

    if (currentScreen === 'HOME') {
      initApp();
    }
  }, [currentScreen]);

  const handleSelectTestament = (testament) => {
    setSelectedTestament(testament);
    setCurrentScreen('BOOKS');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" translucent={true} />

      {currentScreen === 'HOME' && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.mainTitle}>📖 Bíblia Viva</Text>
          </View>

          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>🏆 Seu Progresso</Text>
            <View style={styles.progressRow}>
              <Text style={styles.progressItem}>✨ {xp} XP</Text>
              <Text style={styles.progressItem}>🔥 {streak} Dias Seguidos</Text>
            </View>
          </View>

          {dailyVerse ? (
            <View style={styles.dailyVerseCard}>
              <Text style={styles.dailyVerseTitle}>💡 Versículo do Dia</Text>
              <Text style={styles.dailyVerseText}>"{dailyVerse.texto}"</Text>
              <Text style={styles.dailyVerseReference}>
                {dailyVerse.livro} {dailyVerse.capitulo}:{dailyVerse.versiculo} ({activeVersion})
              </Text>
            </View>
          ) : (
            <View style={styles.dailyVerseCard}>
              <Text style={styles.dailyVerseTitle}>💡 Versículo do Dia</Text>
              <Text style={styles.dailyVerseText}>Sincronizando mensagem de fé...</Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>Navegar por Testamentos</Text>
          <View style={styles.testamentRow}>
            <TouchableOpacity style={styles.testamentButton} onPress={() => handleSelectTestament('Velho')}>
              <Text style={styles.testamentEmoji}>📜</Text>
              <Text style={styles.testamentButtonText}>Antigo{"\n"}Testamento</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.testamentButton} onPress={() => handleSelectTestament('Novo')}>
              <Text style={styles.testamentEmoji}>✝️</Text>
              <Text style={styles.testamentButtonText}>Novo{"\n"}Testamento</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Painel de Controle</Text>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} onPress={() => setCurrentScreen('CONFIG')}>
              <Text style={styles.actionButtonEmoji}>⚙️</Text>
              <Text style={styles.actionButtonText}>Versões &{"\n"}Ajustes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => setCurrentScreen('PROFILE')}>
              <Text style={styles.actionButtonEmoji}>👤</Text>
              <Text style={styles.actionButtonText}>Meu Perfil{"\n"}(Em Breve)</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerTip}>
            💡 Dica: Sua Bíblia padrão "{activeVersion}" funciona 100% offline sem consumir internet!
          </Text>
        </ScrollView>
      )}

      {currentScreen === 'BOOKS' && (
        <BookSelector
          testamento={selectedTestament}
          onBack={() => setCurrentScreen('HOME')}
          onSelectBook={(bookName) => {
            setSelectedBook(bookName);
            setCurrentScreen('CHAPTERS');
          }}
        />
      )}

      {currentScreen === 'CHAPTERS' && (
        <ChapterSelector
          livro={selectedBook}
          onBack={() => setCurrentScreen('BOOKS')}
          onSelectChapter={(chapterNum) => {
            setSelectedChapter(chapterNum);
            setCurrentScreen('READING');
          }}
        />
      )}

      {currentScreen === 'READING' && (
        <ReadingScreen
          livro={selectedBook}
          capitulo={selectedChapter}
          onBack={() => setCurrentScreen('CHAPTERS')}
        />
      )}

      {currentScreen === 'CONFIG' && (
        <ConfigScreen onBack={() => setCurrentScreen('HOME')} />
      )}

      {currentScreen === 'PROFILE' && (
        <View style={styles.fallbackScreen}>
          <Text style={styles.fallbackTitle}>👤 Meu Perfil</Text>
          <Text style={styles.fallbackText}>Histórico e conquistas em desenvolvimento.</Text>
          <TouchableOpacity style={styles.fallbackButton} onPress={() => setCurrentScreen('HOME')}>
            <Text style={styles.fallbackButtonText}>Voltar para Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { padding: 20, paddingTop: Platform.OS === 'android' ? 45 : 10, paddingBottom: 40 },
  headerTitleContainer: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  mainTitle: { fontSize: 25, fontWeight: 'bold', color: '#1E1E1E' },
  progressCard: { backgroundColor: '#2A2522', padding: 16, borderRadius: 12, marginBottom: 15, elevation: 2 },
  progressTitle: { color: '#D4AF37', fontWeight: 'bold', fontSize: 14, marginBottom: 6 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressItem: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  dailyVerseCard: { backgroundColor: '#FFF', padding: 18, borderRadius: 12, marginBottom: 20, elevation: 1, borderWidth: 1, borderColor: '#EAEAEA' },
  dailyVerseTitle: { color: '#1E1E1E', fontWeight: 'bold', fontSize: 14, marginBottom: 8 },
  dailyVerseText: { fontSize: 15, color: '#444', lineHeight: 22, fontStyle: 'italic' },
  dailyVerseReference: { fontSize: 12, color: '#777', fontWeight: 'bold', marginTop: 8, textAlign: 'right' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12, marginTop: 10 },
  testamentRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  testamentButton: { backgroundColor: '#FFF', width: '48%', height: 100, borderRadius: 12, alignItems: 'center', justifyContent: 'center', elevation: 1, borderWidth: 1, borderColor: '#EAEAEA' },
  testamentEmoji: { fontSize: 24, marginBottom: 4 },
  testamentButtonText: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' },
  actionButton: { backgroundColor: '#FFF', width: '48%', height: 90, borderRadius: 12, alignItems: 'center', justifyContent: 'center', elevation: 1, borderWidth: 1, borderColor: '#EAEAEA' },
  actionButtonEmoji: { fontSize: 22, marginBottom: 4 },
  actionButtonText: { fontSize: 13, fontWeight: '600', color: '#333', textAlign: 'center' },
  footerTip: { textAlign: 'center', fontSize: 12, color: '#999', marginTop: 15, paddingHorizontal: 10, lineHeight: 18 },
  fallbackScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, backgroundColor: '#FAFAFA' },
  fallbackTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E1E1E', marginBottom: 15 },
  fallbackText: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 30, lineHeight: 22 },
  fallbackButton: { backgroundColor: '#1E1E1E', paddingHorizontal: 30, paddingVertical: 14, borderRadius: 10 },
  fallbackButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' }
});
