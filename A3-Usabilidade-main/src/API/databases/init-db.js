const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Criar conexão com o banco
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    }
});

// Habilitar chaves estrangeiras
db.run('PRAGMA foreign_keys = ON');

// Exportar a conexão do banco de dados
module.exports = db; 