import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';
import { getLocalVerseOffline, getActiveVersion } from './offlineService';
import { markChapterAsRead } from './progressService';

export default function ReadingScreen({ onBack, onNext, livro, capitulo }) {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const activeVer = await getActiveVersion();
      setVersion(activeVer.toUpperCase());
      const data = await getLocalVerseOffline(activeVer, livro, capitulo);
      setVerses(data || []);
      setLoading(false);
    };
    loadData();
  }, [livro, capitulo]);

  const handleSave = async () => {
    const result = await markChapterAsRead(livro, capitulo);
    if (result.success || result.message === "Já lido") {
      setIsSaved(true);
    }
  };

  const handleNavigation = (action) => {
    if (!isSaved) {
      Alert.alert("Atenção", "Salve o progresso para não perder seu XP!", [
        { text: "Continuar lendo" },
        { text: "Sair sem salvar", onPress: action }
      ]);
    } else {
      action();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Cabeçalho Preto validado */}
      <View style={styles.header}>
        <Text style={styles.bookTitle}>{livro}</Text>
        <Text style={styles.chapterSubtitle}>Cap. {capitulo} - {version}</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        onScroll={({ nativeEvent }) => {
          const isBottom = nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20;
          if (isBottom) setShowSaveButton(true);
        }}
        scrollEventThrottle={16}
      >
        {verses.map((item) => (
          <Text key={item.id} style={styles.verseText}>
            <Text style={styles.verseNumber}>{item.versiculo} </Text>{item.texto}
          </Text>
        ))}
      </ScrollView>

      {/* Barra inferior com paddingBottom: 45 conforme validado */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation(onBack)}>
          <Text style={styles.buttonText}>← Voltar</Text>
        </TouchableOpacity>

        {showSaveButton && (
          <TouchableOpacity 
            style={[styles.saveButton, isSaved && styles.savedButton]} 
            onPress={handleSave}
            disabled={isSaved}
          >
            <Text style={styles.buttonText}>{isSaved ? "Salvo" : "Salvar"}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation(onNext)}>
          <Text style={styles.buttonText}>Próximo →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5FA' },
  header: { 
    backgroundColor: '#000', 
    paddingTop: 35, 
    paddingBottom: 10, 
    alignItems: 'center' 
  },
  bookTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  chapterSubtitle: { fontSize: 13, color: '#AAA', marginTop: 2 },
  scrollContent: { padding: 20, paddingBottom: 150 },
  verseText: { fontSize: 18, marginBottom: 15, color: '#333' },
  verseNumber: { fontWeight: 'bold', color: '#000' },
  bottomBar: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    flexDirection: 'row', justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 45, // Valor validado por você
    backgroundColor: '#F5F5FA'
  },
  navButton: { backgroundColor: '#1E1E1E', height: 45, width: '28%', borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  saveButton: { backgroundColor: '#1E1E1E', height: 45, width: '28%', borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  savedButton: { backgroundColor: '#28a745' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 }
});