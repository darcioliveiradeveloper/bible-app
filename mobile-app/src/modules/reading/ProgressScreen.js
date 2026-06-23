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
    { title: 'Livros Históricos', isHeader: true, percent: '0%', count: '0/249' },
    { title: 'Josué', isHeader: false, percent: '0%', count: '0/24' },
    { title: 'Juízes', isHeader: false, percent: '0%', count: '0/21' },
    { title: 'Rute', isHeader: false, percent: '0%', count: '0/4' },
    { title: 'Livros Poéticos e Sapienciais', isHeader: true, percent: '0%', count: '0/150' },
    { title: 'Jó', isHeader: false, percent: '0%', count: '0/42' },
    { title: 'Salmos', isHeader: false, percent: '0%', count: '0/150' },
    { title: 'Provérbios', isHeader: false, percent: '0%', count: '0/31' },
    { title: 'Eclesiastes', isHeader: false, percent: '0%', count: '0/12' },
    { title: 'Cânticos', isHeader: false, percent: '0%', count: '0/8' },
    { title: 'Profetas Maiores', isHeader: true, percent: '0%', count: '0/183' },
    { title: 'Isaías', isHeader: false, percent: '0%', count: '0/66' },
    { title: 'Jeremias', isHeader: false, percent: '0%', count: '0/52' },
    { title: 'Lamentações', isHeader: false, percent: '0%', count: '0/5' },
    { title: 'Ezequiel', isHeader: false, percent: '0%', count: '0/48' },
    { title: 'Profetas Menores', isHeader: true, percent: '0%', count: '0/67' },
    { title: 'Oséias', isHeader: false, percent: '0%', count: '0/14' },
    { title: 'Joel', isHeader: false, percent: '0%', count: '0/3' },
    { title: 'Amós', isHeader: false, percent: '0%', count: '0/9' },
    { title: 'Obadias', isHeader: false, percent: '0%', count: '0/1' },
    { title: 'Jonas', isHeader: false, percent: '0%', count: '0/4' },
    { title: 'Miquéias', isHeader: false, percent: '0%', count: '0/7' },
    { title: 'Naum', isHeader: false, percent: '0%', count: '0/3' },
    { title: 'Habacuque', isHeader: false, percent: '0%', count: '0/3' },
    { title: 'Sofonias', isHeader: false, percent: '0%', count: '0/3' },
    { title: 'Ageu', isHeader: false, percent: '0%', count: '0/2' },
    { title: 'Zacarias', isHeader: false, percent: '0%', count: '0/14' },
    { title: 'Malaquias', isHeader: false, percent: '0%', count: '0/4' },
    { title: 'Novo Testamento', isHeader: true, percent: '0%', count: '0/260' },
    { title: 'Evangelhos', isHeader: true, percent: '0%', count: '0/89' },
    { title: 'Mateus', isHeader: false, percent: '0%', count: '0/28' },
    { title: 'Marcos', isHeader: false, percent: '0%', count: '0/16' },
    { title: 'Lucas', isHeader: false, percent: '0%', count: '0/24' },
    { title: 'João', isHeader: false, percent: '0%', count: '0/21' },
    { title: 'Histórico', isHeader: true, percent: '0%', count: '0/28' },
    { title: 'Atos', isHeader: false, percent: '0%', count: '0/28' },
    { title: 'Cartas Paulinas', isHeader: true, percent: '0%', count: '0/87' },
    { title: 'Romanos', isHeader: false, percent: '0%', count: '0/16' },
    { title: '1 Coríntios', isHeader: false, percent: '0%', count: '0/16' },
    { title: '2 Coríntios', isHeader: false, percent: '0%', count: '0/13' },
    { title: 'Gálatas', isHeader: false, percent: '0%', count: '0/6' },
    { title: 'Efésios', isHeader: false, percent: '0%', count: '0/6' },
    { title: 'Filipenses', isHeader: false, percent: '0%', count: '0/4' },
    { title: 'Colossenses', isHeader: false, percent: '0%', count: '0/4' },
    { title: '1 Tessalonicenses', isHeader: false, percent: '0%', count: '0/5' },
    { title: '2 Tessalonicenses', isHeader: false, percent: '0%', count: '0/3' },
    { title: '1 Timóteo', isHeader: false, percent: '0%', count: '0/6' },
    { title: '2 Timóteo', isHeader: false, percent: '0%', count: '0/4' },
    { title: 'Tito', isHeader: false, percent: '0%', count: '0/3' },
    { title: 'Filemom', isHeader: false, percent: '0%', count: '0/1' },
    { title: 'Epístolas Gerais', isHeader: true, percent: '0%', count: '0/121' },
    { title: 'Hebreus', isHeader: false, percent: '0%', count: '0/13' },
    { title: 'Tiago', isHeader: false, percent: '0%', count: '0/5' },
    { title: '1 Pedro', isHeader: false, percent: '0%', count: '0/5' },
    { title: '2 Pedro', isHeader: false, percent: '0%', count: '0/3' },
    { title: '1 João', isHeader: false, percent: '0%', count: '0/5' },
    { title: '2 João', isHeader: false, percent: '0%', count: '0/1' },
    { title: '3 João', isHeader: false, percent: '0%', count: '0/1' },
    { title: 'Judas', isHeader: false, percent: '0%', count: '0/1' },
    { title: 'Revelação', isHeader: true, percent: '0%', count: '0/22' },
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