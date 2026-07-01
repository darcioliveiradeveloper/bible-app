import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function ProgressMessageScreen({ livro, onComplete, onReset, onCancel }) {
  return (
    <View style={styles.container}>
      {/* Cabeçalho limpo, apenas com o título */}
      <View style={styles.header}>
        <Text style={styles.title}>Progresso de Leitura</Text>
      </View>

      <View style={styles.messageBox}>
        <Text style={styles.messageText}>
          Escolha se deseja resetar ou completar todo o progresso em {livro}.
        </Text>
        
        {/* Agora com 3 botões em coluna para melhor organização */}
        <View style={styles.buttonColumn}>
          <TouchableOpacity style={[styles.button, styles.completeButton]} onPress={onComplete}>
            <Text style={styles.buttonText}>Completar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={onReset}>
            <Text style={styles.buttonText}>Resetar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  header: { alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  messageBox: { padding: 20, alignItems: 'center' },
  messageText: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
  buttonColumn: { width: '80%', gap: 15 }, // 'gap' espaça os botões verticalmente
  button: { padding: 15, borderRadius: 12, alignItems: 'center' },
  completeButton: { backgroundColor: '#28a745' },
  resetButton: { backgroundColor: '#dc3545' },
  cancelButton: { backgroundColor: '#6c757d' }, // Cinza para o botão de cancelar
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});