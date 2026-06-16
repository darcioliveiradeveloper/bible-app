const fs = require('fs');
const path = require('path');

// Caminho onde salvaremos as configurações e histórico do usuário localmente
const configPath = path.join(__dirname, '../../data/user-config.json');

/**
 * Salva o último capítulo lido pelo usuário.
 * @param {string} book - Nome do livro (Ex: 'Gênesis')
 * @param {number} chapter - Número do capítulo
 * @param {string} version - Versão utilizada ('ara', 'nvi', 'kji')
 */
function saveLastRead(book, chapter, version) {
    try {
        const data = {
            lastBook: book,
            lastChapter: Number(chapter),
            lastVersion: version,
            updatedAt: new Date().toISOString()
        };
        
        fs.writeFileSync(configPath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Erro ao salvar histórico de leitura:', error.message);
        return false;
    }
}

/**
 * Recupera o último capítulo lido pelo usuário.
 * Se não houver histórico, retorna um valor padrão (Gênesis 1 na ARA).
 */
function getLastRead() {
    try {
        if (!fs.existsSync(configPath)) {
            // Padrão inicial se o app for aberto pela primeira vez
            return {
                lastBook: "Gênesis",
                lastChapter: 1,
                lastVersion: "ara"
            };
        }
        
        const fileData = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Erro ao ler histórico de leitura:', error.message);
        return { lastBook: "Gênesis", lastChapter: 1, lastVersion: "ara" };
    }
}

module.exports = { saveLastRead, getLastRead };
