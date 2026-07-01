import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadProgress } from './ProgressService';

export default function HomeScreen({ onNavigate }) {
  const [progress, setProgress] = useState({ xp: 0, streak: 1 });

  useEffect(() => {
    async function fetchProgress() {
      const data = await loadProgress();
      if (data) setProgress(data);
    }
    fetchProgress();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>📖 Bíblia Viva</Text>

        <View style={styles.progressCard}>
          <Text style={styles.cardHeader}>🏆 Seu Progresso</Text>
          <Text style={styles.cardStats}>
            ✨ {progress.xp} XP    🔥 {progress.streak} Dias Seguidos
          </Text>
        </View>

        <View style={styles.verseCard}>
          <Text style={styles.verseHeader}>💡 Versículo do Dia</Text>
          <Text style={styles.verseText}>"Portanto esperai-me, diz o SENHOR..."</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.navRow}>
            <TouchableOpacity style={styles.navBox} onPress={() => onNavigate('BIBLE_MAIN')}>
              <Text style={styles.navEmoji}>📖</Text>
              <Text style={styles.navText}>Bíblia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBox} onPress={() => onNavigate('PROGRESS')}>
              <Text style={styles.navEmoji}>📊</Text>
              <Text style={styles.navText}>Progresso</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navRow}>
            <TouchableOpacity style={styles.navBox} onPress={() => {}}>
              <Text style={styles.navEmoji}>🎮</Text>
              <Text style={styles.navText}>Jogos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBox} onPress={() => {}}>
              <Text style={styles.navEmoji}>💬</Text>
              <Text style={styles.navText}>Versículo do Dia</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navRow}>
            <TouchableOpacity style={styles.navBox} onPress={() => onNavigate('CONFIG')}>
              <Text style={styles.navEmoji}>⚙️</Text>
              <Text style={styles.navText}>Ajustes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBox} onPress={() => onNavigate('PROFILE')}>
              <Text style={styles.navEmoji}>👤</Text>
              <Text style={styles.navText}>Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { paddingBottom: 30 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' },
  progressCard: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 12, marginHorizontal: 20, marginBottom: 15, elevation: 3 },
  cardHeader: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  cardStats: { color: '#FFD700', marginTop: 5, fontSize: 16, fontWeight: 'bold' },
  verseCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginHorizontal: 20, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  verseHeader: { fontWeight: 'bold', marginBottom: 5 },
  verseText: { fontSize: 13, color: '#555', fontStyle: 'italic' },
  gridContainer: { paddingHorizontal: 20 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  navBox: { backgroundColor: '#FFF', width: '48%', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  navEmoji: { fontSize: 24, marginBottom: 5 },
  navText: { fontSize: 12, fontWeight: '600', textAlign: 'center' }
});