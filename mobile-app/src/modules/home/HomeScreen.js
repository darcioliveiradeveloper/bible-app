import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Importação recomendada
import { loadProgress } from './progressService'; 

export default function HomeScreen({ onNavigate, onGoToConfig }) {
  const [progress, setProgress] = useState({ xp: 0, streak: 1 });

  useEffect(() => {
    async function fetchProgress() {
      const data = await loadProgress();
      setProgress(data);
    }
    fetchProgress();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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

        {/* Grid de Navegação */}
        <View style={styles.gridContainer}>
          {/* Linha 1 */}
          <View style={styles.navRow}>
            <TouchableOpacity style={styles.navBox} onPress={() => onNavigate('Bíblia')}>
              <Text style={styles.navEmoji}>📖</Text>
              <Text style={styles.navText}>Bíblia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBox} onPress={() => onNavigate('Planos')}>
              <Text style={styles.navEmoji}>🌿</Text>
              <Text style={styles.navText}>Planos</Text>
            </TouchableOpacity>
          </View>

          {/* Linha 2 */}
          <View style={styles.navRow}>
            <TouchableOpacity style={styles.navBox} onPress={() => onNavigate('Jogos')}>
              <Text style={styles.navEmoji}>🎮</Text>
              <Text style={styles.navText}>Jogos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBox} onPress={() => onNavigate('VersiculoDiario')}>
              <Text style={styles.navEmoji}>💬</Text>
              <Text style={styles.navText}>Versículo do Dia</Text>
            </TouchableOpacity>
          </View>

          {/* Linha 3 */}
          <View style={styles.navRow}>
            <TouchableOpacity style={styles.navBox} onPress={onGoToConfig}>
              <Text style={styles.navEmoji}>⚙️</Text>
              <Text style={styles.navText}>Ajustes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBox} onPress={() => onNavigate('Perfil')}>
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
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' },
  progressCard: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 12, marginHorizontal: 20, marginBottom: 15, elevation: 3 },
  cardHeader: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  cardStats: { color: '#FFD700', marginTop: 5, fontSize: 16, fontWeight: 'bold' },
  verseCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginHorizontal: 20, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  verseHeader: { fontWeight: 'bold', marginBottom: 5 },
  verseText: { fontSize: 13, color: '#555', fontStyle: 'italic' },
  gridContainer: { paddingHorizontal: 20, marginBottom: 30 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  navBox: { backgroundColor: '#FFF', width: '48%', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  navEmoji: { fontSize: 24, marginBottom: 5 },
  navText: { fontSize: 12, fontWeight: '600', textAlign: 'center' }
});
