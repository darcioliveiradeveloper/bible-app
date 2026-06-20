const bibleData = require('../../../assets/bibles/bible-default.json');

const categories = {
  'Pentateuco': ['Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio'],
  'Livros Históricos': ['Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel', '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas', 'Esdras', 'Neemias', 'Ester'],
  'Livros Poéticos': ['Jó', 'Salmos', 'Provérbios', 'Eclesiastes', 'Cânticos'],
  'Profetas Maiores': ['Isaías', 'Jeremias', 'Lamentações', 'Ezequiel', 'Daniel'],
  'Profetas Menores': ['Oseias', 'Joel', 'Amós', 'Obadias', 'Jonas', 'Miqueias', 'Naum', 'Habacuque', 'Sofonias', 'Ageu', 'Zacarias', 'Malaquias'],
  'Evangelhos': ['Mateus', 'Marcos', 'Lucas', 'João'],
  'Atos': ['Atos'],
  'Epístolas': ['Romanos', '1 Coríntios', '2 Coríntios', 'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses', '1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago', '1 Pedro', '2 Pedro', '1 João', '2 João', '3 João', 'Judas'],
  'Apocalipse': ['Apocalipse']
};

export const fetchBooks = (testamento) => {
  if (!bibleData || !bibleData.books) return [];
  const isAntigo = testamento === 'Antigo';
  return bibleData.books
    .filter((_, index) => (isAntigo ? index < 39 : index >= 39))
    .map(book => ({ name: book.name, chaptersCount: book.chapters.length }));
};

export const fetchBooksByCategory = (categoryName) => {
  if (!bibleData || !bibleData.books) return [];
  const bookNames = categories[categoryName] || [];
  return bibleData.books
    .filter(book => bookNames.includes(book.name))
    .map(book => ({ name: book.name, chaptersCount: book.chapters.length }));
};