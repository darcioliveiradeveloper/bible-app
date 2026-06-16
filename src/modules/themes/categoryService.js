/**
 * Dicionário que mapeia a categoria e o testamento de cada livro da Bíblia.
 * Isso garante uma estrutura modular e expansível.
 */
const BIBLE_MAP = {
    // Antigo Testamento
    "gênesis": { testamento: "Antigo", grupo: "Pentateuco" },
    "êxodo": { testamento: "Antigo", grupo: "Pentateuco" },
    "levítico": { testamento: "Antigo", grupo: "Pentateuco" },
    "números": { testamento: "Antigo", grupo: "Pentateuco" },
    "deuteronômio": { testamento: "Antigo", grupo: "Pentateuco" },
    "salmos": { testamento: "Antigo", grupo: "Poéticos" },
    
    // Novo Testamento
    "mateus": { testamento: "Novo", grupo: "Evangelhos" },
    "marcos": { testamento: "Novo", grupo: "Evangelhos" },
    "lucas": { testamento: "Novo", grupo: "Evangelhos" },
    "joão": { testamento: "Novo", grupo: "Evangelhos" },
    "filipenses": { testamento: "Novo", grupo: "Cartas" }
};

/**
 * Retorna o testamento e o grupo de um livro específico.
 * @param {string} bookName - Nome do livro
 */
function getBookCategory(bookName) {
    const key = bookName.toLowerCase();
    return BIBLE_MAP[key] || { testamento: "Desconhecido", grupo: "Desconhecido" };
}

/**
 * Filtra e organiza uma lista de versículos brutos, agrupando os livros por Testamento.
 * @param {Array} versesList - Lista de versículos vinda do JSON
 * @param {string} testament - 'Antigo' ou 'Novo'
 */
function getBooksByTestament(versesList, testament) {
    const booksSet = new Set();
    
    versesList.forEach(v => {
        const info = getBookCategory(v.livro);
        if (info.testamento.toLowerCase() === testament.toLowerCase()) {
            booksSet.add(v.livro);
        }
    });

    return Array.from(booksSet);
}

/**
 * Filtra e organiza uma lista de versículos brutos por Grupo/Título específico.
 * @param {Array} versesList - Lista de versículos vinda do JSON
 * @param {string} groupName - Ex: 'Pentateuco', 'Evangelhos', 'Poéticos'
 */
function getBooksByGroup(versesList, groupName) {
    const booksSet = new Set();
    
    versesList.forEach(v => {
        const info = getBookCategory(v.livro);
        if (info.grupo.toLowerCase() === groupName.toLowerCase()) {
            booksSet.add(v.livro);
        }
    });

    return Array.from(booksSet);
}

module.exports = { getBookCategory, getBooksByTestament, getBooksByGroup };
