import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, StatusBar, Platform } from 'react-native';
import { getLocalVerseOffline, getActiveVersion } from './OfflineService';
import { markChapterAsRead } from './ProgressService';

export default function ReadingScreen({ onBack, onNext, livro, capitulo }) {
  const [verses, setVerses] = useState([]);
  const [version, setVersion] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const activeVer = await getActiveVersion();
      setVersion(activeVer.toUpperCase());
      const data = await getLocalVerseOffline(activeVer, livro, capitulo);
      setVerses(data || []);
    };
    loadData();
  }, [livro, capitulo]);

  const handleSave = async () => {
    const result = await markChapterAsRead(livro, capitulo);
    if (result.success || result.message === "Já lido") setIsSaved(true);
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

<StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      
      {/* Cabeçalho limpo */}
      <View style={styles.headerBlack}>
        <Text style={styles.headerTitle}>{livro}</Text>
        <Text style={styles.headerSubtitle}>Cap. {capitulo} - {version}</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        onScroll={({ nativeEvent }) => {
          const isBottom = nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20;
          if (isBottom) setShowSaveButton(true);
        }}
        scrollEventThrottle={8}
      >
        {verses.map((item) => (
          <Text key={item.id} style={styles.verseText}>
            <Text style={styles.verseNumber}>{item.versiculo} </Text>{item.texto}
          </Text>
        ))}
      </ScrollView>

      {/* Rodapé mantido original */}
      <View style={styles.footerFixed}>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleNavigation(onBack)}>
          <Text style={styles.footerButtonText}>← Voltar</Text>
        </TouchableOpacity>
        
        {showSaveButton && (
          <TouchableOpacity style={[styles.footerButton, isSaved && styles.savedButton]} onPress={handleSave} disabled={isSaved}>
            <Text style={styles.footerButtonText}>{isSaved ? "Salvo" : "Salvar"}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.footerButton} onPress={() => handleNavigation(onNext)}>
          <Text style={styles.footerButtonText}>Próximo →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerBlack: { backgroundColor: '#000000', paddingVertical: 5, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { color: '#CCCCCC', fontSize: 14, marginTop: 1 },
  scrollContent: { padding: 20, paddingBottom: 120 },
  verseText: { fontSize: 18, marginBottom: 15, color: '#333' },
  verseNumber: { fontWeight: 'bold', color: '#000' },
  footerFixed: { position: 'absolute', bottom: 0, left: 5, right: 5, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFFFFF', paddingBottom: 0 },
  footerButton: { backgroundColor: '#000000', padding: 10, borderRadius: 12, alignItems: 'center', flex: 1, marginHorizontal: 5 },
  footerButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  savedButton: { backgroundColor: '#28a745' }
});


// Arquivo: ReadingScreen.js | Data: 22/06/2026 | Hora: 23:00
