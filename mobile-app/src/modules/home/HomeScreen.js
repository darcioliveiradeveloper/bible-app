import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Ou apenas useEffect se preferir
import { loadProgress } from './progressService'; 

export default function HomeScreen({ onNavigate, onGoToConfig }) {
  const [progress, setProgress] = useState({ xp: 0, streak: 1 });

  // Carrega o progresso sempre que a tela ganha foco
  useEffect(() => {
    async function fetchProgress() {
      const data = await loadProgress();
      setProgress(data);
    }
    fetchProgress();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>📖 Bíblia Viva</Text>

      {/* Card de Progresso Dinâmico */}
      <View style={styles.progressCard}>
        <Text style={styles.cardHeader}>🏆 Seu Progresso</Text>
        <Text style={styles.cardStats}>
          ✨ {progress.xp} XP    🔥 {progress.streak} Dias Seguidos
        </Text>
      </View>

      {/* Card Versículo do Dia */}
      <View style={styles.verseCard}>
        <Text style={styles.verseHeader}>💡 Versículo do Dia</Text>
        <Text style={styles.verseText}>"Portanto esperai-me, diz o SENHOR..."</Text>
      </View>

      {/* Navegar por Testamentos */}
      <Text style={styles.sectionTitle}>Navegar por Testamentos</Text>
      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navBox} onPress={() => onNavigate('Antigo')}>
          <Text style={styles.navEmoji}>📜</Text>
          <Text style={styles.navText}>Antigo Testamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBox} onPress={() => onNavigate('Novo')}>
          <Text style={styles.navEmoji}>✝️</Text>
          <Text style={styles.navText}>Novo Testamento</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navBox} onPress={onGoToConfig}>
          <Text style={styles.navEmoji}>⚙️</Text>
          <Text style={styles.navText}>Versões</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FAFAFA' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  progressCard: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 3 },
  cardHeader: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  cardStats: { color: '#FFD700', marginTop: 5, fontSize: 16, fontWeight: 'bold' },
  verseCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  verseHeader: { fontWeight: 'bold', marginBottom: 5 },
  verseText: { fontSize: 13, color: '#555', fontStyle: 'italic' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  navBox: { backgroundColor: '#FFF', width: '48%', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  navEmoji: { fontSize: 24, marginBottom: 5 },
  navText: { fontSize: 12, fontWeight: '600' }
});
