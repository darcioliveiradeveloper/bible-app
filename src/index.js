const fs = require('fs');
const path = require('path');
const { getDailyVerse } = require('./modules/dailyVerse/dailyVerseService');
const { getLastRead } = require('./modules/reading/historyService');
const { getVersesByTheme } = require('./modules/themes/themeService');
const { addFavorite, addNote, loadInteractions } = require('./modules/reading/interactionService');

console.log("=== BIBLE APP (MOCK BACKEND) - VERSÃO 2.2 ===\n");

// =======================================================
// 1. FUNCIONALIDADE v2.2: Testando Favoritos e Notas
// =======================================================
console.log("📝 --- AÇÕES DO USUÁRIO NO TEXTO ---");

// Simulando o usuário clicando no coração para favoritar João 3:16
addFavorite("João", 3, 16);
console.log("❤️  Versículo favoritado: João 3:16");

// Simulando o usuário criando uma nota de estudo em Salmos 23:1
addNote("Salmos", 23, 1, "Este versículo me traz paz em momentos de ansiedade e decisões difíceis.");
console.log("✍️  Nota pessoal adicionada em Salmos 23:1");

console.log("-".repeat(50));

// Simulando a renderização da aba "Meu Perfil / Meu Diário" do app
console.log("👤 --- MEU DIÁRIO BÍBLICO (DADOS SALVOS) ---");
const minhasInteracoes = loadInteractions();

console.log(`📌 Meus Favoritos:`);
minhasInteracoes.favorites.forEach(f => console.log(`  - [Favorito] ${f.book} ${f.chapter}:${f.verse}`));

console.log(`\n📌 Minhas Notas de Estudo:`);
minhasInteracoes.notes.forEach(n => {
    console.log(`  - [Nota em ${n.book} ${n.chapter}:${n.verse}]: "${n.comment}"`);
});

console.log("=".repeat(50) + "\n");

// =======================================================
// 2. RELEMBRANDO MÓDULOS ANTERIORES (Tema e Versículo do Dia)
// =======================================================
const temaPesquisado = "amor";
const buscaTema = getVersesByTheme(temaPesquisado, "ara");
console.log(`💡 Versículos sobre [${buscaTema.nome}]:`);
buscaTema.result.forEach(v => console.log(`> ${v.livro} ${v.capitulo}:${v.versiculo} - "${v.texto}"`));
console.log("-".repeat(50));

const daily = getDailyVerse('ara');
if (daily) {
    console.log(`🌅 [VERSÍCULO DO DIA (ARA)]: ${daily.livro} ${daily.capitulo}:${daily.versiculo} - "${daily.texto}"`);
}
