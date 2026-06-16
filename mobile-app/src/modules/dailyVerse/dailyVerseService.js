// Mapeamento dos arquivos JSON reais
const bibleVersions = {
    default: require('../../../assets/bibles/bible-default.json'), // KJV Nativa
    ara: require('../../../assets/bibles/bible-ara.json'),
    nvi: require('../../../assets/bibles/bible-nvi.json'),
};

/**
 * Retorna o versículo do dia com lógica de fallback inteligente.
 */
function getDailyVerse(version = 'default') {
    try {
        // Tenta pegar a versão solicitada
        let bibleData = bibleVersions[version.toLowerCase()] || bibleVersions['default'];

        // FALLBACK: Se o arquivo da versão estiver vazio ou sem livros, usa a 'default' (KJV)
        if (!bibleData || !bibleData.books || bibleData.books.length === 0) {
            bibleData = bibleVersions['default'];
        }

        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 0);
        const diff = today - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const bookIndex = dayOfYear % bibleData.books.length;
        const selectedBook = bibleData.books[bookIndex];

        const chapterIndex = dayOfYear % selectedBook.chapters.length;
        const selectedChapter = selectedBook.chapters[chapterIndex];

        const verseIndex = dayOfYear % selectedChapter.verses.length;
        const selectedVerse = selectedChapter.verses[verseIndex];

        return {
            livro: selectedBook.name,
            capitulo: selectedChapter.number,
            versiculo: selectedVerse.number,
            texto: selectedVerse.text
        };

    } catch (error) {
        console.error(`Erro no versículo do dia:`, error.message);
        return null;
    }
}

module.exports = { 
    getDailyVerse,
    getDailyVerseFromApi: getDailyVerse 
};
