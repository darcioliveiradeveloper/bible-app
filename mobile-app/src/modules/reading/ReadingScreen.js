import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { getLocalVerseOffline, getActiveVersion } from './offlineService';

export default function ReadingScreen({ onBack, livro, capitulo }) {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentVersion, setCurrentVersion] = useState('DEFAULT');

  useEffect(() => {
    const loadVerses = async () => {
      setLoading(true);
      try {
        // 1. Identifica qual a versão ativa configurada no aparelho
        const activeVer = await getActiveVersion();
        setCurrentVersion(activeVer.toUpperCase());

        // 2. Busca os dados filtrados diretamente do banco offline
        console.log(`Buscando local da versão ativa [${activeVer}]: ${livro}, Cap ${capitulo}`);
        const data = await getLocalVerseOffline(activeVer, livro, capitulo);
        
        if (data && data.length > 0) {
          setVerses(data);
        } else {
          setVerses([]);
        }
      } catch (error) {
        console.log("Erro ao carregar versículos locais na leitura:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadVerses();
  }, [livro, capitulo]);

  return (
    <View style={styles.container}>
      {/* Controla a barra superior para não cobrir o relógio */}
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <View style={styles.statusBarSpacer} />

      {/* Cabeçalho flutuante escuro */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{livro} · Capítulo {capitulo}</Text>
        <Text style={styles.headerSubtitle}>Versão em Uso: {currentVersion}</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E1E1E" />
          <Text style={styles.loadingText}>Carregando versículos...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {verses.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhum texto encontrado para este capítulo.{"\n"}
              Verifique se o livro foi escrito corretamente no banco ou se a versão {currentVersion} contém esses dados.
            </Text>
          ) : (
            verses.map((item) => (
              <Text key={item.id || `${item.livro}-${item.capitulo}-${item.versiculo}`} style={styles.verseText}>
                <Text style={styles.verseNumber}>{item.versiculo} </Text>
                {item.texto}
              </Text>
            ))
          )}
        </ScrollView>
      )}

      {/* Rodapé alto e seguro contra botões nativos */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Voltar para Capítulos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  statusBarSpacer: { height: 50, backgroundColor: '#FAFAFA' }, 
  header: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2
  },
  headerTitle: { color: '#FFF', fontSize: 19, fontWeight: 'bold' },
  headerSubtitle: { color: '#BBB', fontSize: 12, marginTop: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#666' },
  scrollContent: { padding: 20, paddingBottom: 140 },
  verseText: { fontSize: 18, lineHeight: 28, color: '#222', marginBottom: 15, textAlign: 'justify' },
  verseNumber: { fontWeight: 'bold', color: '#1E1E1E', fontSize: 13 }, 
  emptyText: { textAlign: 'center', color: '#666', marginTop: 40, lineHeight: 22 },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FAFAFA', 
    paddingTop: 10,
    paddingBottom: 45, 
    paddingHorizontal: 20,
  },
  backButton: { 
    backgroundColor: '#1E1E1E', 
    height: 50, 
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4
  },
  backButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
});
