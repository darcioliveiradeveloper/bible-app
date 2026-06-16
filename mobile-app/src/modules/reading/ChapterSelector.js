import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

const BIBLE_BOOKS = [
  { name: 'Gênesis', testament: 'antigo', chapters: 50 },
  { name: 'Êxodo', testament: 'antigo', chapters: 40 },
  { name: 'Levítico', testament: 'antigo', chapters: 27 },
  { name: 'Números', testament: 'antigo', chapters: 36 },
  { name: 'Deuteronômio', testament: 'antigo', chapters: 34 },
  { name: 'Mateus', testament: 'novo', chapters: 28 },
  { name: 'Marcos', testament: 'novo', chapters: 16 },
  { name: 'Lucas', testament: 'novo', chapters: 24 },
  { name: 'João', testament: 'novo', chapters: 21 },
  { name: 'Atos', testament: 'novo', chapters: 28 }
];

export default function ChapterSelector({ livro, onBack, onSelectChapter }) {
  const bookData = BIBLE_BOOKS.find(b => b.name === livro);
  // Se for um livro que não mapeamos acima, ele assume 50 por segurança ou usa o valor real
  const totalChapters = bookData ? bookData.chapters : 50; 

  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1); 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FA" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Capítulos de {livro}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {chapters.map((cap) => (
            <TouchableOpacity 
              key={cap} 
              style={styles.chapterBox} 
              onPress={() => onSelectChapter(cap)}
            >
              <Text style={styles.chapterText}>{cap}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Voltar para Livros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5FA' },
  header: { 
    paddingTop: 60, 
    paddingBottom: 15, 
    paddingHorizontal: 20,
    alignItems: 'center', 
    backgroundColor: '#F5F5FA',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A2E' },
  scrollContent: { padding: 20, paddingBottom: 140 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  chapterBox: {
    backgroundColor: '#FFF', width: '21%', aspectRatio: 1, 
    justifyContent: 'center', alignItems: 'center', marginBottom: 12, marginRight: '4%',
    borderRadius: 8, borderWidth: 1, borderColor: '#E2E2E2', elevation: 1
  },
  chapterText: { fontSize: 16, fontWeight: 'bold', color: '#1E1E1E' }, 
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#F5F5FA', 
    paddingTop: 10,
    paddingBottom: 45, // Subiu mais para dar o espaçamento correto
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
