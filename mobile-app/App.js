import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Importações das Telas (Componentes)
import HomeScreen from './src/modules/reading/HomeScreen';
import BibleScreen from './src/modules/reading/BibleScreen';
import BookSelector from './src/modules/reading/BookSelector';
import ChapterSelector from './src/modules/reading/ChapterSelector';
import ReadingScreen from './src/modules/reading/ReadingScreen';
import ConfigScreen from './src/modules/reading/ConfigScreen';
import ProgressScreen from './src/modules/reading/ProgressScreen';
import ProfileScreen from './src/modules/reading/ProfileScreen';
import ProgressMessageScreen from './src/modules/reading/ProgressMessageScreen';
import Header from './src/components/Header';
import Footer from './src/components/Footer';


export default function App() {
  const [navigationStack, setNavigationStack] = useState(['HOME']);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTestament, setSelectedTestament] = useState(null);

  // Lógica de Navegação Centralizada
  const navigateTo = (screen) => setNavigationStack([...navigationStack, screen]);

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

  const currentScreen = navigationStack[navigationStack.length - 1];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Minha Bíblia" />
        {/* Roteamento de Telas */}

        {currentScreen === 'HOME' && 
          <HomeScreen 
            onNavigate={navigateTo} />}

        {currentScreen === 'BIBLE_MAIN' && (
          <BibleScreen 
            onBack={navigateBack} 
            onNavigateToProgress={() => navigateTo('PROGRESS')}
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

       {currentScreen === 'PROGRESS' && (
        <ProgressScreen 
          onBack={navigateBack} 
          onNavigateToChapterSelector={(bookName) => {
          setSelectedBook(bookName);
          navigateTo('PROGRESS_MESSAGE');
        }}
      />
      )}

{currentScreen === 'PROGRESS_MESSAGE' && (
  <ProgressMessageScreen 
    livro={selectedBook}
    onComplete={() => {
      const stack = navigationStack.slice(0, -1);
      setNavigationStack([...stack, 'CHAPTERS']);
    }}
    onReset={() => {
      const stack = navigationStack.slice(0, -1);
      setNavigationStack([...stack, 'CHAPTERS']);
    }}
    onCancel={() => navigateBack()}
  />
  )}

        {currentScreen === 'CONFIG' && <ConfigScreen onBack={navigateBack} />}
        {currentScreen === 'PROFILE' && <ProfileScreen onBack={navigateBack} />}

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
