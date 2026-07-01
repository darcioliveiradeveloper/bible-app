import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Footer({ onBack, label = "← Voltar" }) {
  return (
    <View style={styles.footerFixed}>
      <TouchableOpacity style={styles.footerButton} onPress={onBack}>
        <Text style={styles.footerButtonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerFixed: { 
    position: 'absolute', 
    bottom: 25, 
    left: 20, 
    right: 20 
  },
  footerButton: { 
    backgroundColor: '#000000', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  footerButtonText: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});
