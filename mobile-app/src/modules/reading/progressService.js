import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves que usaremos para salvar no armazenamento do celular
const XP_KEY = '@BíbliaViva:user_xp';
const STREAK_KEY = '@BíbliaViva:streak_days';

/**
 * Salva o progresso atual do usuário no aparelho
 */
export const saveProgress = async (xp, streak) => {
  try {
    await AsyncStorage.setItem(XP_KEY, String(xp));
    await AsyncStorage.setItem(STREAK_KEY, String(streak));
  } catch (error) {
    console.error('Erro ao salvar o progresso no celular:', error);
  }
};

/**
 * Busca o progresso salvo no aparelho. 
 * Se não encontrar nada, retorna os valores padrão (0 XP, 1 Dia)
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
    console.error('Erro ao carregar o progresso do celular:', error);
    return { xp: 0, streak: 1 };
  }
};
