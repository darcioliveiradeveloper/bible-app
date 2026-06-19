import AsyncStorage from '@react-native-async-storage/async-storage';

const XP_KEY = '@BíbliaViva:user_xp';
const STREAK_KEY = '@BíbliaViva:streak_days';
const READ_CHAPTERS_KEY = '@BíbliaViva:read_chapters';

/**
 * Salva o progresso geral (XP e Streak)
 */
export const saveProgress = async (xp, streak) => {
  try {
    await AsyncStorage.setItem(XP_KEY, String(xp));
    await AsyncStorage.setItem(STREAK_KEY, String(streak));
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
  }
};

/**
 * Busca o progresso geral
 */
export const loadProgress = async () => {
  try {
    const savedXp = await AsyncStorage.getItem(XP_KEY);
    const savedStreak = await AsyncStorage.getItem(STREAK_KEY);
    return {
      xp: savedXp ? parseInt(savedXp, 10) : 0,
      streak: savedStreak ? parseInt(savedStreak, 10) : 1,
    };
  } catch (error) {
    return { xp: 0, streak: 1 };
  }
};

/**
 * Marca um capítulo como lido, adiciona XP e salva no histórico
 */
export const markChapterAsRead = async (livro, capitulo) => {
  try {
    const key = `${livro}-${capitulo}`;
    const stored = await AsyncStorage.getItem(READ_CHAPTERS_KEY);
    const readChapters = stored ? JSON.parse(stored) : [];
    
    // Verifica se já foi lido para não ganhar XP duplicado
    if (!readChapters.includes(key)) {
      readChapters.push(key);
      await AsyncStorage.setItem(READ_CHAPTERS_KEY, JSON.stringify(readChapters));
      
      // Incrementa XP e Streak
      const current = await loadProgress();
      const newXp = current.xp + 10;
      const newStreak = current.streak + 1; // Lógica simples de streak
      
      await saveProgress(newXp, newStreak);
      return { success: true, xp: newXp };
    }
    return { success: false, message: "Já lido" };
  } catch (error) {
    return { success: false };
  }
};

/**
 * Retorna a lista de capítulos lidos para o ChapterSelector
 */
export const getReadChapters = async () => {
  try {
    const stored = await AsyncStorage.getItem(READ_CHAPTERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};
