import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';

// Importando a lógica modular
import BookSelector from './src/modules/reading/BookSelector';
import ChapterSelector from './src/modules/reading/ChapterSelector';
import ReadingScreen from './src/modules/reading/ReadingScreen';
import { loadProgress, saveProgress } from './src/modules/reading/progressService';

export default function App() {
  const [dailyVerse, setDailyVerse] = useState(null);
  const [userXp, setUserXp] = useState(0);
  const [streakDays, setStreakDays] = useState(1);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // ESTADOS DE NAVEGAÇÃO
  const [currentScreen, setCurrentScreen] = useState('home'); 
  const [selectedTestament, setSelectedTestament] = useState('antigo');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(1);

  // ESTADOS PARA DOWNLOAD OFFLINE
  const [downloadedVersions, setDownloadedVersions] = useState({ ara: false, nvi: false, kji: false });
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);


  // 🎮 CONTROLE CENTRAL DO BOTÃO VOLTAR NATIVO DO CELULAR
  useEffect(() => {
    const backAction = () => {
      if (currentScreen === 'reading') {
        setCurrentScreen('chapters');
        return true; 
      }
      if (currentScreen === 'chapters') {
        setCurrentScreen('books');
        return true;
      }
      if (currentScreen === 'books') {
        setCurrentScreen('home');
        return true;
      }
      return false; // Permite fechar o app se estiver na Home
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [currentScreen]);


  // Efeito para carregar os dados assim que o aplicativo abre
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const { getDailyVerseFromApi } = require('./src/modules/dailyVerse/dailyVerseService');
        const verse = await getDailyVerseFromApi();
        if (verse) setDailyVerse(verse);
      } catch (err) {
        console.log("Erro ao processar versículo diário na Home:", err);
      }

      try {
        const progress = await loadProgress();
        setUserXp(progress.xp);
        setStreakDays(progress.streak);
      } catch (err) {
        console.log("Erro ao carregar progresso do armazenamento:", err);
      }

      try {
        const { getDownloadedVersions } = require('./src/modules/reading/offlineService');
        const downloads = await getDownloadedVersions();
        setDownloadedVersions(downloads);
      } catch (err) {
        console.log("Erro ao checar arquivos baixados:", err);
      } finally {
        setIsLoadingProgress(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleNavigateToTestament = (testamento) => {
    setSelectedTestament(testamento);
    setCurrentScreen('books');
  };

  const handleSelectBook = (bookName) => {
    setSelectedBook(bookName);
    setCurrentScreen('chapters');
  };

  const handleSelectChapter = (chapterNumber) => {
    setSelectedChapter(chapterNumber);
    setCurrentScreen('reading');
  };

  const handleDownload = async (versionCode) => {
    setIsDownloading(true);
    setDownloadProgress(0);
    const { downloadBibleVersion, getDownloadedVersions } = require('./src/modules/reading/offlineService');
    
    const success = await downloadBibleVersion(versionCode, (progress) => {
      setDownloadProgress(Math.round(progress * 100));
    });

    if (success) {
      alert(`Versão ${versionCode.toUpperCase()} baixada com sucesso! Agora funciona totalmente offline. 🎉`);
      const downloads = await getDownloadedVersions();
      setDownloadedVersions(downloads);
    } else {
      alert('Falha ao baixar versão. Verifique sua conexão com a internet.');
    }
    setIsDownloading(false);
  };

  const handleFinishReading = async () => {
    const newXp = userXp + 10;
    setUserXp(newXp);
    await saveProgress(newXp, streakDays);
    alert('Parabéns! Seu progresso foi salvo permanentemente no aparelho. 🎉');
    setCurrentScreen('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoadingProgress ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4E3629" />
          <Text style={styles.loadingText}>Iniciando o Bíblia Viva...</Text>
        </View>
      ) : (
        <>
          {/* TELA: HOME (Contém seu próprio ScrollView isolado) */}
          {currentScreen === 'home' && (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View>
                <Text style={styles.appTitle}>📖 Bíblia Viva</Text>

                {/* Card de Gamificação */}
                <View style={styles.gamificationCard}>
                  <Text style={styles.gamificationTitle}>🏆 Seu Progresso</Text>
                  <View style={styles.statsRow}>
                    <Text style={styles.statText}>✨ {userXp} XP</Text>
                    <Text style={styles.statText}>🔥 {streakDays} Dias Seguidos</Text>
                  </View>
                </View>

                {/* Card do Versículo do Dia */}
                {dailyVerse && (
                  <View style={styles.dailyVerseCard}>
                    <Text style={styles.dailyVerseHeader}>🌅 Versículo do Dia</Text>
                    <Text style={styles.dailyVerseText}>"{dailyVerse.texto}"</Text>
                    <Text style={styles.dailyVerseReference}>
                      {dailyVerse.livro} {dailyVerse.capitulo}:{dailyVerse.versiculo} (ARA)
                    </Text>
                  </View>
                )}

                {/* Central de Downloads Offline */}
                <View style={styles.downloadSection}>
                  <Text style={styles.downloadSectionTitle}>📥 Versões para Uso Offline</Text>
                  
                  {isDownloading && (
                    <Text style={styles.downloadingProgressText}>Baixando arquivos... {downloadProgress}%</Text>
                  )}

                  <View style={styles.downloadRow}>
                    {['ara', 'nvi', 'kji'].map((v) => (
                      <TouchableOpacity
                        key={v}
                        disabled={isDownloading}
                        style={[
                          styles.downloadButton,
                          { backgroundColor: downloadedVersions[v] ? '#27AE60' : '#E2E2E2' }
                        ]}
                        onPress={() => handleDownload(v)}
                      >
                        <Text style={{ color: downloadedVersions[v] ? '#FFF' : '#333', fontWeight: 'bold', fontSize: 12 }}>
                          {v.toUpperCase()} {downloadedVersions[v] ? '✓' : '⬇️'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Navegação por Testamentos */}
                <Text style={styles.sectionTitle}>Navegar por Testamentos</Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    style={styles.categoryButton} 
                    onPress={() => handleNavigateToTestament('antigo')}
                  >
                    <Text style={styles.categoryButtonText}>📜 Antigo Testamento</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.categoryButton} 
                    onPress={() => handleNavigateToTestament('novo')}
                  >
                    <Text style={styles.categoryButtonText}>✝️ Novo Testamento</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.tipText}>
                  💡 Dica: Seu progresso e versões baixadas são salvos no seu aparelho!
                </Text>
              </View>
            </ScrollView>
          )}

          {/* TELA: SELEÇÃO DE LIVROS (Livres do ScrollView externo) */}
          {currentScreen === 'books' && (
            <BookSelector 
              testamento={selectedTestament} 
              onBack={() => setCurrentScreen('home')}
              onSelectBook={handleSelectBook}
            />
          )}

          {/* TELA: SELEÇÃO DE CAPÍTULOS */}
          {currentScreen === 'chapters' && (
            <ChapterSelector 
              livro={selectedBook}
              onBack={() => setCurrentScreen('books')}
              onSelectChapter={handleSelectChapter}
            />
          )}

          {/* TELA: LEITURA DOS VERSÍCULOS */}
          {currentScreen === 'reading' && (
            <ReadingScreen 
              livro={selectedBook}
              capitulo={selectedChapter}
              versionCode="ara"
              onBack={() => setCurrentScreen('chapters')}
              onFinishReading={handleFinishReading}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FA',
  },
  scrollContent: {
    padding: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A2E',
    textAlign: 'center',
    marginVertical: 20,
  },
  gamificationCard: {
    backgroundColor: '#4E3629',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  gamificationTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dailyVerseCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    borderLeftWidth: 5,
    borderLeftColor: '#4E3629',
    elevation: 2,
  },
  dailyVerseHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  dailyVerseText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    lineHeight: 24,
  },
  dailyVerseReference: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4E3629',
    textAlign: 'right',
    marginTop: 10,
  },
  downloadSection: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    elevation: 1,
  },
  downloadSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E3629',
    marginBottom: 10,
  },
  downloadingProgressText: {
    color: '#2980B9',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  downloadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downloadButton: {
    padding: 12,
    borderRadius: 8,
    flex: 0.31,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#FFF',
    flex: 0.48,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4E3629',
  },
  tipText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
    marginTop: 10,
  }
});
