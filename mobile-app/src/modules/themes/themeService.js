const fs = require('fs');
const path = require('path');
const { getChapter } = require('../reading/readingService');

const themesPath = path.join(__dirname, '../../data/themes.json');

/**
 * Retorna todos os versículos completos atrelados a um tema específico.
 * @param {string} themeId - ID do tema (Ex: 'paz', 'amor')
 * @param {string} version - Versão da bíblia ('ara', 'nvi', 'kji')
 */
function getVersesByTheme(themeId, version = 'ara') {
    try {
        // 1. Carrega o arquivo de mapeamento de temas
        const themesData = JSON.parse(fs.readFileSync(themesPath, 'utf-8'));
        
        // 2. Encontra o tema desejado
        const theme = themesData.find(t => t.id.toLowerCase() === themeId.toLowerCase());
        if (!theme) return { nome: themeId, result: [] };

        const result = [];

        // 3. Para cada referência do tema, busca o texto real no nosso banco de dados da Bíblia
        theme.versiculos.forEach(ref => {
            const chapterVerses = getChapter(version, ref.livro, ref.capitulo);
            const foundVerse = chapterVerses.find(v => v.versiculo === ref.versiculo);
            
            if (foundVerse) {
                result.push(foundVerse);
            }
        });

        return {
            nome: theme.nome,
            result: result
        };
    } catch (error) {
        console.error('Erro ao buscar versículos por tema:', error.message);
        return { nome: themeId, result: [] };
    }
}

module.exports = { getVersesByTheme };
