import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { fetchBooks } from './bibleApiService';

export default function BookSelector({ testamento, onBack, onSelectBook }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Busca a lista filtrada pelo serviço usando a lógica de índice
    const filteredBooks = fetchBooks(testamento);
    setBooks(filteredBooks);
  }, [testamento]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5FA" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {testamento === 'Antigo' ? '📜 Antigo Testamento' : '✝️ Novo Testamento'}
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
          <Text style={styles.backButtonText}>← Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F5FA' ,
  },
  header: { 
    paddingTop: 60, 
    paddingBottom: 15, 
    paddingHorizontal: 20, 
    alignItems: 'center', 
    backgroundColor: '#F5F5FA' 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1A1A2E' 
  },
  scrollContent: { 
    padding: 20, 
    paddingBottom: 140 
  },
  bookRow: {
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 10, 
    marginBottom: 10,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#E2E2E2'
  },
  bookText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1E1E1E' 
  },
  arrow: { 
    color: '#888', 
    fontSize: 16 
  },
  bottomBar: {
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,
    backgroundColor: '#F5F5FA', 
    paddingTop: 10, 
    paddingBottom: 45, 
    paddingHorizontal: 20,
  },
  backButton: { 
    backgroundColor: '#1E1E1E', 
    height: 50, 
    borderRadius: 25, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonText: { 
    color: '#FFF', 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
});
