const fs = require('fs');
const path = require('path');

/**
 * Retorna todos os versículos de um capítulo específico de um livro.
 * @param {string} version - 'ara', 'nvi' ou 'kji'
 * @param {string} book - Nome do livro (Ex: 'Gênesis')
 * @param {number} chapter - Número do capítulo
 */
function getChapter(version = 'ara', book, chapter) {
    try {
        const filePath = path.join(__dirname, `../../data/bible-${version}.json`);
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const verses = JSON.parse(fileData);

        // Filtra os versículos que pertencem ao livro E ao capítulo digitado
        const chapterVerses = verses.filter(v => 
            v.livro.toLowerCase() === book.toLowerCase() && v.capitulo === Number(chapter)
        );

        // Ordena por número do versículo para garantir a ordem correta de leitura
        return chapterVerses.sort((a, b) => a.versiculo - b.versiculo);
    } catch (error) {
        console.error(`Erro ao carregar o capítulo:`, error.message);
        return [];
    }
}

module.exports = { getChapter };

