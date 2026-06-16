import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

// Lista oficial integrada para evitar erros de importação perdida
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

export default function BookSelector({ testamento, onBack, onSelectBook }) {
  const books = BIBLE_BOOKS.filter(book => book.testament === testamento);

  return (
    <View style={styles.container}>
      {/* Garante que os ícones do topo fiquem visíveis */}
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FA" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {testamento === 'antigo' ? '📜 Antigo Testamento' : '✝️ Novo Testamento'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {books.map((book) => (
          <TouchableOpacity 
            key={book.name} 
            style={styles.bookRow} 
            onPress={() => onSelectBook(book.name)}
          >
            <Text style={styles.bookText}>{book.name}</Text>
            <Text style={styles.arrow}>➔</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Voltar para o Início</Text>
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
  bookRow: {
    backgroundColor: '#FFF', padding: 16, borderRadius: 10, marginBottom: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#E2E2E2', elevation: 1
  },
  bookText: { fontSize: 16, fontWeight: '600', color: '#1E1E1E' }, 
  arrow: { color: '#888', fontSize: 16 },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#F5F5FA', 
    paddingTop: 10,
    paddingBottom: 45, // Subiu mais para afastar totalmente da barra do celular
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
