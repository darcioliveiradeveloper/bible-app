const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/user-interactions.json');

// Inicializa o arquivo se ele não existir
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ favorites: [], notes: [] }, null, 2), 'utf-8');
}

/**
 * Carrega todas as interações do usuário.
 */
function loadInteractions() {
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {
        return { favorites: [], notes: [] };
    }
}

/**
 * Salva as interações no arquivo JSON.
 */
function saveInteractions(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Adiciona um versículo aos favoritos (evitando duplicados).
 */
function addFavorite(book, chapter, verse) {
    const data = loadInteractions();
    const alreadyExists = data.favorites.some(f => f.book === book && f.chapter === chapter && f.verse === verse);
    
    if (!alreadyExists) {
        data.favorites.push({ book, chapter, verse, addedAt: new Date().toISOString() });
        saveInteractions(data);
    }
    return data.favorites;
}

/**
 * Cria ou atualiza uma nota pessoal para um versículo específico.
 */
function addNote(book, chapter, verse, comment) {
    const data = loadInteractions();
    
    // Remove se já existir uma nota para o mesmo versículo para não duplicar
    data.notes = data.notes.filter(n => !(n.book === book && n.chapter === chapter && n.verse === verse));
    
    data.notes.push({
        book,
        chapter,
        verse,
        comment,
        createdAt: new Date().toISOString()
    });
    
    saveInteractions(data);
    return data.notes;
}

module.exports = { addFavorite, addNote, loadInteractions };
