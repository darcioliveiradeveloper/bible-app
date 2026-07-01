import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function BibleScreen({ onBack, onNavigateToBooks, onNavigateToProgress }) {
  // Mantive todos os itens conforme seu design original
  return (
    <View style={styles.container}>
      <View style={styles.headerBlack}>
        <Text style={styles.headerTitle}>Bíblia</Text>
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {/* Linha dos Testamentos (Mantida como você gosta) */}
        <View style={styles.navRow}>
          <TouchableOpacity style={styles.navBox} onPress={() => onNavigateToBooks('Antigo')}>
            <Text style={styles.navEmoji}>📜</Text>
            <Text style={styles.navText}>Antigo Testamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBox} onPress={() => onNavigateToBooks('Novo')}>
            <Text style={styles.navEmoji}>📖</Text>
            <Text style={styles.navText}>Novo Testamento</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 1 de Opções */}
        <View style={styles.navRow}>
          <TouchableOpacity style={styles.navBox} onPress={onNavigateToProgress}>
            <Text style={styles.navEmoji}>📊</Text>
            <Text style={styles.navText}>Progresso de Leitura</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBox} onPress={() => {}}>
            <Text style={styles.navEmoji}>📅</Text>
            <Text style={styles.navText}>Plano de Leitura</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 2 de Opções */}
        <View style={styles.navRow}>
          <TouchableOpacity style={styles.navBox} onPress={() => {}}>
            <Text style={styles.navEmoji}>🔍</Text>
            <Text style={styles.navText}>Pesquisar na Bíblia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBox} onPress={() => {}}>
            <Text style={styles.navEmoji}>🔖</Text>
            <Text style={styles.navText}>Favoritos</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 3 de Opções */}
        <View style={styles.navRow}>
          <TouchableOpacity style={styles.navBox} onPress={() => {}}>
            <Text style={styles.navEmoji}>💬</Text>
            <Text style={styles.navText}>Comentários</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBox} onPress={() => {}}>
            <Text style={styles.navEmoji}>☰</Text>
            <Text style={styles.navText}>Temas</Text>
          </TouchableOpacity>
        </View>
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
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  headerBlack: { backgroundColor: '#000000', paddingVertical: 15, alignItems: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  gridContainer: { padding: 20, paddingBottom: 100 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  navBox: { backgroundColor: '#FFF', width: '48%', padding: 15, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  navEmoji: { fontSize: 24, marginBottom: 5 },
  navText: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
  footerFixed: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  footerButton: { backgroundColor: '#000000', padding: 15, borderRadius: 12, alignItems: 'center' },
  footerButtonText: { color: '#FFF', fontWeight: 'bold' }
});