import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ title }) {
  return (
    <View style={styles.headerBlack}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBlack: { 
    backgroundColor: '#000000', 
    paddingVertical: 20,
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  headerTitle: { 
    color: '#FFFFFF', 
    fontSize: 22, 
    fontWeight: 'bold' 
  }
});
