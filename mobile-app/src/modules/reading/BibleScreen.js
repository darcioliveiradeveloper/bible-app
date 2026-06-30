import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import ProgressScreen from './ProgressScreen';

export default function BibleScreen({ onBack, onNavigateToBooks }) {
  const [showProgress, setShowProgress] = useState(false);

  if (showProgress) {
    return (
      <ProgressScreen 
        onBack={() => setShowProgress(false)} 
        onNavigateToChapterSelector={(bookName) => {
          setShowProgress(false);
          // Abre direto a tela de capítulos do livro escolhido
          onNavigateToBooks(bookName);
        }}
      />
    );
  }

  const menuItems = [
    { title: 'Progresso de Leitura', icon: '📊' },
    { title: 'Plano de Leitura', icon: '📅' },
    { title: 'Pesquisar na Bíblia', icon: '🔍' },
    { title: 'Favoritos', icon: '🔖' },
    { title: 'Comentários', icon: '💬' },
    { title: 'Temas', icon: '☰' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerBlack}>
        <Text style={styles.headerTitle}>Bíblia</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        <View style={styles.testamentRow}>
          <TouchableOpacity style={styles.testamentCard} onPress={() => onNavigateToBooks('Antigo')}>
            <Text style={styles.cardIcon}>📜</Text>
            <Text style={styles.cardText}>Antigo Testamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.testamentCard} onPress={() => onNavigateToBooks('Novo')}>
            <Text style={styles.cardIcon}>📖</Text>
            <Text style={styles.cardText}>Novo Testamento</Text>
          </TouchableOpacity>
        </View>

        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => {
              if (item.title === 'Progresso de Leitura') {
                setShowProgress(true);
              }
            }}
          >
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
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
  headerBlack: { backgroundColor: '#000000', paddingVertical: 15, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-between', paddingBottom: 120 },
  testamentRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 5 },
  testamentCard: { backgroundColor: '#F0F0F0', width: '48%', padding: 20, margin: 5, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: '#F0F0F0', width: '47%', padding: 20, margin: 5, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardIcon: { fontSize: 32, marginBottom: 10 },
  cardText: { color: '#000', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  footerFixed: { position: 'absolute', bottom: 0, left: 20, right: 20 },
  footerButton: { backgroundColor: '#000000', padding: 15, borderRadius: 12, alignItems: 'center' },
  footerButtonText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }
});
