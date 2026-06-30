import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function ProgressMessageScreen({ livro, onBack, onComplete, onReset }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backButton}>←</Text></TouchableOpacity>
        <Text style={styles.title}>Progresso de Leitura</Text>
      </View>

      <View style={styles.messageBox}>
        <Text style={styles.messageText}>
          Escolha se deseja resetar ou completar todo o progresso em {livro}.
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
            <Text style={styles.buttonText}>Completar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={onReset}>
            <Text style={styles.buttonText}>Resetar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  backButton: { fontSize: 24, marginRight: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  messageBox: { padding: 20, alignItems: 'center' },
  messageText: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  completeButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 12 },
  resetButton: { backgroundColor: '#dc3545', padding: 15, borderRadius: 12 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});
