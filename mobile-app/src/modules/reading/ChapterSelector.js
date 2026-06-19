import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { getReadChapters } from './progressService';
const bibleData = require('../../../assets/bibles/bible-default.json');

export default function ChapterSelector({ livro, onBack, onSelectChapter }) {
  const [readChapters, setReadChapters] = useState([]);

  useEffect(() => {
    const loadReadStatus = async () => {
      const read = await getReadChapters();
      setReadChapters(read);
    };
    loadReadStatus();
  }, []);

  const bookData = bibleData.books.find(b => b.name === livro);
  const chapters = Array.from({ length: bookData ? bookData.chapters.length : 0 }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Cabeçalho centralizado seguindo o estilo validado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Livro de {livro}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {chapters.map((cap) => {
            const isRead = readChapters.includes(`${livro}-${cap}`);
            return (
              <TouchableOpacity 
                key={cap} 
                style={[styles.chapterBox, isRead && styles.chapterRead]} 
                onPress={() => onSelectChapter(cap)}
              >
                <Text style={styles.chapterText}>{cap}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Botão de rodapé ajustado com paddingBottom: 45 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.buttonText}>Voltar para livros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5FA' },
  header: { 
    backgroundColor: '#000', 
    paddingTop: 45, 
    paddingBottom: 20, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  scrollContent: { padding: 20, paddingBottom: 120 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  chapterBox: { backgroundColor: '#FFF', width: '21%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: '2%', borderRadius: 8, borderWidth: 1, borderColor: '#E2E2E2' },
  chapterRead: { backgroundColor: '#28a745', borderColor: '#1e7e34' },
  chapterText: { fontWeight: 'bold' },
  bottomBar: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    paddingHorizontal: 20, 
    paddingTop: 15,
    paddingBottom: 45, // Ajustado conforme sua validação anterior
    backgroundColor: '#F5F5FA' 
  },
  backButton: { backgroundColor: '#1E1E1E', height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});