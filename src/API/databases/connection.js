const sqlite3 = require('sqlite3').verbose();

const { CAMINHO_BANCO } = require('../config');
const db = new sqlite3.Database(CAMINHO_BANCO, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  }
});

db.run('PRAGMA foreign_keys = ON');

module.exports = db;