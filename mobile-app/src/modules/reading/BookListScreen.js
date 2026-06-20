import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function BookListScreen({ onBack, onNavigateToBooks }) {
  // A estrutura segue exatamente o que foi solicitado
  const menuData = [
    { title: 'Antigo Testamento', type: 'Antigo', isHeader: true },
    { title: 'Pentateuco', type: 'Categoria' },
    { title: 'Livros Históricos', type: 'Categoria' },
    { title: 'Livros Poéticos', type: 'Categoria' },
    { title: 'Profetas Maiores', type: 'Categoria' },
    { title: 'Profetas Menores', type: 'Categoria' },
    { title: 'Novo Testamento', type: 'Novo', isHeader: true },
    { title: 'Evangelhos', type: 'Categoria' },
    { title: 'Atos', type: 'Categoria' },
    { title: 'Epístolas', type: 'Categoria' },
    { title: 'Apocalipse', type: 'Categoria' },
  ];

  const handlePress = (item) => {
    // Ao clicar em Antigo ou Novo, navegamos para o BookSelector com o parâmetro correto
    if (item.type === 'Antigo' || item.type === 'Novo') {
      onNavigateToBooks(item.type); 
    } else {
      // Futuramente aqui entra a lógica de categorias
      console.log(`Categoria selecionada: ${item.title}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backButton}>←</Text></TouchableOpacity>
        <Text style={styles.title}>Livros</Text>
      </View>
      <ScrollView>
        {menuData.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.item, item.isHeader && styles.headerItem]}
            onPress={() => handlePress(item)}
          >
            <Text style={[styles.itemText, item.isHeader && styles.headerText]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50 },
  backButton: { fontSize: 24, marginRight: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  item: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerItem: { backgroundColor: '#A9A9A9' },
  itemText: { fontSize: 16, color: '#000' },
  headerText: { fontWeight: 'bold', color: '#FFF' }
});