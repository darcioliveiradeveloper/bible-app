import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
      <View style={styles.headerBlack}>
        <Text style={styles.headerTitle}>Livro de {livro}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
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

      <View style={styles.footerFixed}>
        <TouchableOpacity style={styles.footerButton} onPress={onBack}>
          <Text style={styles.footerButtonText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerBlack: { backgroundColor: '#000000', paddingVertical: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  listContent: { paddingBottom: 120 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', padding: 5 },
  chapterBox: { backgroundColor: '#F0F0F0', width: '22%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: '1.5%', borderRadius: 12, borderWidth: 1, borderColor: '#DDD' },
  chapterRead: { backgroundColor: '#28a745', borderColor: '#1e7e34' },
  chapterText: { color: '#000', fontSize: 16, fontWeight: '600' },
  footerFixed: { position: 'absolute', bottom: 0, left: 20, right: 20, backgroundColor: '#FFFFFF', paddingBottom: 0 },
  footerButton: { backgroundColor: '#000000', padding: 15, borderRadius: 12, alignItems: 'center' },
  footerButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});

// Arquivo: ChapterSelector.js | Data: 21/06/2026 | Hora: 03:10