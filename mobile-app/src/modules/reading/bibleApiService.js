const bibleData = require('../../../assets/bibles/bible-default.json');

export const fetchBooks = (testamento) => {
  if (!bibleData || !bibleData.books) return [];

  const isAntigo = testamento === 'Antigo';
  
  return bibleData.books
    .filter((_, index) => {
      // 0 a 38 são os 39 livros do Antigo Testamento
      return isAntigo ? index < 39 : index >= 39;
    })
    .map(book => ({
      name: book.name,
      chaptersCount: book.chapters.length
    }));
};
