import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves para salvar no aparelho
const ACTIVE_VERSION_KEY = '@BIBLE_VIVA_ACTIVE_VERSION';
const DOWNLOADED_VERSIONS_KEY = '@BIBLE_VIVA_DOWNLOADED_VERSIONS';

// Mapeamento real conforme visto na imagem image_4c6980.png
const localVersions = {
  default: require('../../../assets/bibles/bible-default.json'), // KJV Nativa Completa
  kjv: require('../../../assets/bibles/bible-default.json'),     // Atalho para KJV
  ara: require('../../../assets/bibles/bible-ara.json'),         // Baixável
  nvi: require('../../../assets/bibles/bible-nvi.json'),         // Baixável
};

/**
 * Retorna qual versão está definida como padrão de uso.
 */
export const getActiveVersion = async () => {
  try {
    const version = await AsyncStorage.getItem(ACTIVE_VERSION_KEY);
    return version || 'default';
  } catch (error) {
    console.log("Erro ao buscar versão ativa:", error);
    return 'default';
  }
};

/**
 * Define uma nova versão como a padrão do sistema.
 */
export const setActiveVersion = async (versionCode) => {
  try {
    await AsyncStorage.setItem(ACTIVE_VERSION_KEY, versionCode.toLowerCase());
    return true;
  } catch (error) {
    console.log("Erro ao salvar nova versão padrão:", error);
    return false;
  }
};

/**
 * Retorna a lista de quais versões o usuário já baixou.
 * A KJV (default) sempre inicia como baixada (true).
 */
export const getDownloadedVersions = async () => {
  try {
    const json = await AsyncStorage.getItem(DOWNLOADED_VERSIONS_KEY);
    return json ? JSON.parse(json) : { default: true, ara: false, nvi: false };
  } catch (error) {
    console.log("Erro ao carregar versões baixadas:", error);
    return { default: true, ara: false, nvi: false };
  }
};

/**
 * Simula o download de uma nova versão (ARA ou NVI)
 */
export const downloadBibleVersion = async (versionCode, onProgress) => {
  try {
    for (let i = 0.1; i <= 1.0; i += 0.2) {
      await new Promise(resolve => setTimeout(resolve, 200));
      if (onProgress) onProgress(i);
    }
    
    const currentDownloads = await getDownloadedVersions();
    currentDownloads[versionCode.toLowerCase()] = true;
    await AsyncStorage.setItem(DOWNLOADED_VERSIONS_KEY, JSON.stringify(currentDownloads));
    
    return true;
  } catch (error) {
    console.log("Erro ao baixar versão:", error);
    return false;
  }
};

/**
 * Carrega e filtra os versículos da versão correta com base no JSON da imagem image_4c6980.png
 */
export const getLocalVerseOffline = async (versionCode, livro, capitulo) => {
  try {
    const activeVersion = await getActiveVersion();
    const bibleData = localVersions[activeVersion] || localVersions['default'];
    
    if (!bibleData || !bibleData.books) {
      return [];
    }

    // Estrutura do seu JSON: bibleData.books -> lista de livros
    const targetBook = bibleData.books.find(b => b.name.toLowerCase() === livro.toLowerCase());
    if (!targetBook || !targetBook.chapters) return [];

    // Busca o capítulo correto
    const targetChapter = targetBook.chapters.find(c => Number(c.number) === Number(capitulo));
    if (!targetChapter || !targetChapter.verses) return [];

    // Transforma a lista de versículos no formato esperado pela tela
    return targetChapter.verses.map(v => ({
      id: `${livro}-${capitulo}-${v.number}`,
      livro: targetBook.name,
      capitulo: targetChapter.number,
      versiculo: v.number,
      texto: v.text
    }));

  } catch (error) {
    console.log("Erro ao buscar versículos locais filtrados:", error);
    return [];
  }
};
