import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function ProgressScreen({ onBack, onNavigateToChapterSelector }) {
  const progressData = [
    { title: 'Toda a Bíblia', isHeader: true, percent: '0%', count: '0/1189' },
    { title: 'Antigo Testamento', isHeader: true, percent: '0%', count: '0/929' },
    { title: 'Pentateuco', isHeader: true, percent: '0%', count: '0/187' },
    { title: 'Gênesis', isHeader: false, percent: '0%', count: '0/50' },
    { title: 'Êxodo', isHeader: false, percent: '0%', count: '0/40' },
    { title: 'Levítico', isHeader: false, percent: '0%', count: '0/27' },
    { title: 'Números', isHeader: false, percent: '0%', count: '0/36' },
    { title: 'Deuteronômio', isHeader: false, percent: '0%', count: '0/34' },
    // ... mantenha o restante da lista como já está no seu original
    { title: 'Apocalipse', isHeader: true, percent: '0%', count: '0/22' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backButton}>←</Text></TouchableOpacity>
        <Text style={styles.title}>Progresso de Leitura</Text>
      </View>
      <View style={styles.summaryContainer}>
        <View style={styles.circleGraphic}><Text style={styles.percentText}>0%</Text></View>
        <Text style={styles.totalText}>0/1189 capítulos lidos</Text>
        <TouchableOpacity style={styles.certificateButton}><Text style={styles.certificateText}>Certificado de Leitura</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        {progressData.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.item, item.isHeader && styles.headerItem]}
            onPress={() => !item.isHeader ? onNavigateToChapterSelector(item.title) : null}
          >
            <Text style={[styles.itemText, item.isHeader && styles.headerText]}>{item.title}</Text>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.percentTextSmall, item.isHeader && styles.headerText]}>{item.percent}</Text>
              <Text style={[styles.countText, item.isHeader && styles.headerText]}>{item.count}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  backButton: { fontSize: 24, marginRight: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  summaryContainer: { alignItems: 'center', padding: 20 },
  circleGraphic: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#CCC', justifyContent: 'center', alignItems: 'center' },
  percentText: { fontSize: 24, fontWeight: 'bold' },
  totalText: { marginVertical: 10, color: '#555' },
  certificateButton: { backgroundColor: '#F0E6FF', padding: 10, borderRadius: 20, paddingHorizontal: 20 },
  certificateText: { color: '#333' },
  listContent: { paddingBottom: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#EEE', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerItem: { backgroundColor: '#A9A9A9' },
  itemText: { fontSize: 16, color: '#000' },
  headerText: { fontWeight: 'bold', color: '#FFF' },
  percentTextSmall: { fontSize: 14 },
  countText: { fontSize: 12, color: '#666' }
});
