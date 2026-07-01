import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, StatusBar } from 'react-native';
import { getActiveVersion, setActiveVersion, getDownloadedVersions, downloadBibleVersion } from './OfflineService';

export default function ConfigScreen({ onBack }) {
  const [activeVersion, setActiveVersionState] = useState('DEFAULT');
  const [downloads, setDownloads] = useState({ default: true, ara: false, nvi: false });
  const [downloadingVersion, setDownloadingVersion] = useState(null);
  const [progress, setProgress] = useState(0);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [justDownloadedVersion, setJustDownloadedVersion] = useState('');

  useEffect(() => {
    loadScreenData();
  }, []);

  const loadScreenData = async () => {
    const currentActive = await getActiveVersion();
    const currentDownloads = await getDownloadedVersions();
    
    if (currentActive === 'default' || currentActive === 'kjv') {
      setActiveVersionState('KJV (PADRÃO)');
    } else {
      setActiveVersionState(currentActive.toUpperCase());
    }
    
    setDownloads(currentDownloads);
  };

  const handleDownload = async (versionCode) => {
    setDownloadingVersion(versionCode);
    setProgress(0);

    const success = await downloadBibleVersion(versionCode, (prog) => {
      setProgress(Math.round(prog * 100));
    });

    setDownloadingVersion(null);

    if (success) {
      const currentDownloads = await getDownloadedVersions();
      setDownloads(currentDownloads);

      setJustDownloadedVersion(versionCode);
      setShowConfirmModal(true);
    } else {
      Alert.alert("Erro", `Não foi possível baixar a versão ${versionCode.toUpperCase()}.`);
    }
  };

  const handleDefineDefault = async (versionCode) => {
    await setActiveVersion(versionCode);
    await loadScreenData();
    setShowConfirmModal(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <View style={styles.statusBarSpacer} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚙️ Versões e Ajustes</Text>
        <Text style={styles.headerSubtitle}>Gerencie o armazenamento interno da sua Bíblia</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Bloco de Versão Atual */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Versão Ativa de Uso</Text>
          <Text style={styles.infoValue}>⭐ {activeVersion}</Text>
          <Text style={styles.infoDesc}>Esta é a versão padrão que está rodando nos menus e nas telas de leitura.</Text>
        </View>

        <Text style={styles.sectionTitle}>Biblioteca de Versões Offline</Text>

        {/* VERSÃO KJV - PRÉ-INSTALADA */}
        <View style={styles.versionCard}>
          <View style={styles.versionHeader}>
            <Text style={styles.versionName}>King James Version (KJV)</Text>
            <View style={styles.badgeSuccess}><Text style={styles.badgeText}>De Fábrica</Text></View>
          </View>
          <Text style={styles.versionDesc}>Tradução clássica e histórica. Já vem completa instalada no app e não necessita download.</Text>
          {activeVersion !== 'KJV (PADRÃO)' && (
            <TouchableOpacity style={styles.useButton} onPress={() => handleDefineDefault('default')}>
              <Text style={styles.useButtonText}>Definir como Padrão</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* VERSÃO ARA - BAIXÁVEL */}
        <View style={styles.versionCard}>
          <View style={styles.versionHeader}>
            <Text style={styles.versionName}>Almeida Revista e Atualizada (ARA)</Text>
            {downloads.ara ? (
              <View style={styles.badgeSuccess}><Text style={styles.badgeText}>Disponível</Text></View>
            ) : (
              <View style={styles.badgePending}><Text style={styles.badgeTextPending}>Nuvem</Text></View>
            )}
          </View>
          <Text style={styles.versionDesc}>Linguagem tradicional, formal e muito respeitada, excelente para estudos bíblicos profundos.</Text>
          
          {downloadingVersion === 'ara' ? (
            <View style={styles.progressContainer}>
              <ActivityIndicator size="small" color="#1E1E1E" />
              <Text style={styles.progressText}>Baixando arquivos... {progress}%</Text>
            </View>
          ) : !downloads.ara ? (
            <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload('ara')}>
              <Text style={styles.downloadButtonText}>⬇️ Baixar Conteúdo Adicional</Text>
            </TouchableOpacity>
          ) : activeVersion !== 'ARA' ? (
            <TouchableOpacity style={styles.useButton} onPress={() => handleDefineDefault('ara')}>
              <Text style={styles.useButtonText}>Definir como Padrão</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.currentLabel}>✓ Versão principal selecionada</Text>
          )}
        </View>

        {/* VERSÃO NVI - BAIXÁVEL */}
        <View style={styles.versionCard}>
          <View style={styles.versionHeader}>
            <Text style={styles.versionName}>Nova Versão Internacional (NVI)</Text>
            {downloads.nvi ? (
              <View style={styles.badgeSuccess}><Text style={styles.badgeText}>Disponível</Text></View>
            ) : (
              <View style={styles.badgePending}><Text style={styles.badgeTextPending}>Nuvem</Text></View>
            )}
          </View>
          <Text style={styles.versionDesc}>Linguagem moderna, fluida e clara, perfeita para entendimento fácil do dia a dia.</Text>
          
          {downloadingVersion === 'nvi' ? (
            <View style={styles.progressContainer}>
              <ActivityIndicator size="small" color="#1E1E1E" />
              <Text style={styles.progressText}>Baixando arquivos... {progress}%</Text>
            </View>
          ) : !downloads.nvi ? (
            <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload('nvi')}>
              <Text style={styles.downloadButtonText}>⬇️ Baixar Conteúdo Adicional</Text>
            </TouchableOpacity>
          ) : activeVersion !== 'NVI' ? (
            <TouchableOpacity style={styles.useButton} onPress={() => handleDefineDefault('nvi')}>
              <Text style={styles.useButtonText}>Definir como Padrão</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.currentLabel}>✓ Versão principal selecionada</Text>
          )}
        </View>
      </ScrollView>

      {/* MODAL DE PERGUNTA DE MUDANÇA PADRÃO */}
      {showConfirmModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>🎉 Sucesso!</Text>
            <Text style={styles.modalTitle}>Mudar versão padrão?</Text>
            <Text style={styles.modalMessage}>
              A versão <Text style={{fontWeight: 'bold'}}>{justDownloadedVersion.toUpperCase()}</Text> foi instalada offline.{"\n\n"}
              Deseja transformá-la na sua nova Bíblia padrão de uso imediato no app?
            </Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={styles.modalButtonNo} onPress={() => setShowConfirmModal(false)}>
                <Text style={styles.modalButtonTextNo}>Manter KJV</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonYes} onPress={() => handleDefineDefault(justDownloadedVersion)}>
                <Text style={styles.modalButtonTextYes}>Sim, alterar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Salvar e Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  statusBarSpacer: { height: 50, backgroundColor: '#FAFAFA' },
  header: { paddingHorizontal: 20, marginBottom: 15 },
  headerTitle: { fontSize: 23, fontWeight: 'bold', color: '#1E1E1E' },
  headerSubtitle: { fontSize: 13, color: '#666', marginTop: 4 },
  scrollContent: { padding: 20, paddingBottom: 120 },
  infoCard: { backgroundColor: '#1E1E1E', padding: 18, borderRadius: 14, marginBottom: 25, elevation: 2 },
  infoTitle: { color: '#BBB', fontSize: 13, fontWeight: '600' },
  infoValue: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginVertical: 6 },
  infoDesc: { color: '#999', fontSize: 12, lineHeight: 18 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  versionCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 14, marginBottom: 15, borderWidth: 1, borderColor: '#EAEAEA', elevation: 1 },
  versionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  versionName: { fontSize: 15, fontWeight: 'bold', color: '#222', flex: 1, marginRight: 10 },
  versionDesc: { fontSize: 13, color: '#666', lineHeight: 20, marginBottom: 14 },
  badgeSuccess: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#2E7D32', fontSize: 11, fontWeight: 'bold' },
  badgePending: { backgroundColor: '#ECEFF1', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeTextPending: { color: '#546E7A', fontSize: 11, fontWeight: 'bold' },
  downloadButton: { backgroundColor: '#2A2522', height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  downloadButtonText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  useButton: { backgroundColor: '#FFF', height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#1E1E1E' },
  useButtonText: { color: '#1E1E1E', fontSize: 13, fontWeight: 'bold' },
  currentLabel: { fontSize: 13, color: '#2E7D32', fontWeight: 'bold', textAlign: 'center', paddingVertical: 8 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
  progressText: { fontSize: 13, color: '#333', fontWeight: 'bold', marginLeft: 10 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FAFAFA', paddingTop: 10, paddingBottom: 45, paddingHorizontal: 20 },
  backButton: { backgroundColor: '#1E1E1E', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', elevation: 4 },
  backButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  modalOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', zIndex: 999 },
  modalContent: { backgroundColor: '#FFF', width: '85%', padding: 24, borderRadius: 16, alignItems: 'center', elevation: 10 },
  modalEmoji: { fontSize: 26, marginBottom: 10 },
  modalTitle: { fontSize: 19, fontWeight: 'bold', color: '#1E1E1E', marginBottom: 10 },
  modalMessage: { fontSize: 14, color: '#444', textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  modalButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButtonNo: { width: '47%', height: 46, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#CCC' },
  modalButtonTextNo: { color: '#555', fontSize: 13, fontWeight: 'bold' },
  modalButtonYes: { width: '47%', height: 46, borderRadius: 8, backgroundColor: '#2E7D32', alignItems: 'center', justifyContent: 'center' },
  modalButtonTextYes: { color: '#FFF', fontSize: 13, fontWeight: 'bold' }
});
