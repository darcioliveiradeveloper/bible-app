const fs = require('fs');
const path = require('path');

/**
 * Retorna o versículo do dia baseado na data atual e na versão escolhida.
 * @param {string} version - 'ara', 'nvi' ou 'kji'
 */
function getDailyVerse(version = 'ara') {
    try {
        // 1. Caminho dinâmico para o arquivo JSON da versão escolhida
        const filePath = path.join(__dirname, `../../data/bible-${version}.json`);
        
        // 2. Lendo o arquivo de forma síncrona para o teste
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const verses = JSON.parse(fileData);

        if (verses.length === 0) return null;

        // 3. Lógica matemática para escolher o versículo baseado no dia do ano
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 0);
        const diff = today - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        // O operador % (resto da divisão) garante que o índice sempre caiba no tamanho da nossa lista
        const verseIndex = dayOfYear % verses.length;

        return verses[verseIndex];
    } catch (error) {
        console.error(`Erro ao carregar o versículo do dia para a versão ${version}:`, error.message);
        return null;
    }
}

module.exports = { getDailyVerse };

