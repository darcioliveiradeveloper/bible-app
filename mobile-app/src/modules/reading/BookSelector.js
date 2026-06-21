import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { fetchBooks, fetchBooksByCategory } from './bibleApiService';

export default function BookSelector({ testamento, categoria, onBack, onSelectBook }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const filtered = categoria ? fetchBooksByCategory(categoria) : fetchBooks(testamento);
    setBooks(filtered);
  }, [testamento, categoria]);

  return (
    <View style={styles.container}>
      {/* Cabeçalho padrão igual ao da BibleScreen */}
      <View style={styles.headerBlack}>
        <Text style={styles.headerTitle}>{categoria || testamento}</Text>
      </View>

      {/* ScrollView com paddingBottom para rolagem atrás do botão */}
      <ScrollView contentContainerStyle={styles.listContent}>
        {books.map((book) => (
          <TouchableOpacity key={book.name} style={styles.item} onPress={() => onSelectBook(book.name)}>
            <Text style={styles.itemText}>{book.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botão fixo no rodapé padrão igual ao da BibleScreen */}
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
  listContent: { paddingBottom: 120 }, // Espaço para rolagem atrás do botão
  item: { padding: 20, borderBottomWidth: 1, borderColor: '#EEE' },
  itemText: { fontSize: 18, color: '#000' },
  // Botão posicionado mais abaixo com bottom: 0 para evitar sobreposição com o conteúdo
  footerFixed: { position: 'absolute', bottom: 0, left: 20, right: 20 },
  footerButton: { backgroundColor: '#000000', padding: 15, borderRadius: 12, alignItems: 'center' },
  footerButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});


// Arquivo: BookSelector.js | Data: 21/06/2026 | Hora: 02:27