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
      <View style={styles.header}><Text style={styles.title}>{categoria || testamento}</Text></View>
      <ScrollView>
        {books.map((book) => (
          <TouchableOpacity key={book.name} style={styles.item} onPress={() => onSelectBook(book.name)}>
            <Text style={styles.itemText}>{book.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={onBack}><Text>Voltar</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { paddingVertical: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#EEE' },
  itemText: { fontSize: 18 },
  backButton: { padding: 20, alignItems: 'center' }
});