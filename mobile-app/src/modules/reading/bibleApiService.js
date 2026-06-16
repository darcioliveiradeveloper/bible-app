/**
 * Serviço para buscar capítulos da Bíblia diretamente da internet (API Pública)
 */

// Usaremos uma API pública em português que não exige chaves complicadas
const BASE_URL = 'https://bible-api.com';

/**
 * Busca todos os versículos de um livro e capítulo específicos.
 * @param {string} bookName Nome do livro (ex: "Gênesis", "João")
 * @param {number} chapter Número do capítulo
 * @returns {Promise<Array>} Lista de versículos formatados
 */
export const fetchChapterVerses = async (bookName, chapter) => {
  try {
    // Mapeamento básico de nomes em português para o padrão que a API entende
    // A API aceita os nomes em português perfeitamente na URL!
    const formattedBook = encodeURIComponent(bookName);
    
    // Faz a requisição para a API pedindo o capítulo específico
    const response = await fetch(`${BASE_URL}/${formattedBook}+${chapter}?translation=almeida`);
    
    if (!response.ok) {
      throw new Error('Não foi possível carregar os versículos.');
    }

    const data = await response.json();

    // Formatamos o retorno para bater exatamente com o padrão que o seu app já usa!
    return data.verses.map((v, index) => ({
      id: index + 1,
      livro: bookName,
      capitulo: chapter,
      versiculo: v.verse,
      texto: v.text.trim()
    }));
  } catch (error) {
    console.error('Erro na API da Bíblia:', error);
    return null; // Retorna null em caso de erro (ex: sem internet)
  }
};
