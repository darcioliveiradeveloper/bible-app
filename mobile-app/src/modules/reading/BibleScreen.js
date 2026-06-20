import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function BibleScreen({ onBack, onNavigate }) {
  const menuItems = [
    { title: 'Livros', icon: '📖', screen: 'BOOK_LIST' },
    { title: 'Progresso de Leitura', icon: '📊', screen: null },
    { title: 'Plano de Leitura', icon: '📅', screen: null },
    { title: 'Pesquisar na Bíblia', icon: '🔍', screen: null },
    { title: 'Favoritos', icon: '🔖', screen: null },
    { title: 'Comentários', icon: '💬', screen: null },
    { title: 'Temas', icon: '☰', screen: null },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bíblia</Text>
        <Text style={styles.headerRight}>ⓘ 💎</Text>
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => item.screen && onNavigate(item.screen)}
          >
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, justifyContent: 'space-between' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  headerIcon: { color: '#FFF', fontSize: 24 },
  headerRight: { color: '#FFF', fontSize: 18 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-between' },
  card: { backgroundColor: '#262626', width: '47%', padding: 20, margin: 5, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardIcon: { fontSize: 32, marginBottom: 10 },
  cardText: { color: '#FFF', fontSize: 14, fontWeight: '600', textAlign: 'center' }
});