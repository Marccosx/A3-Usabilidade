const db = require('../connection');

function criarTabelasProduto() {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS produto(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                descricao TEXT,
                preco REAL,
                ativo BOOLEAN,
                id_restaurante INTEGER,
                foto_produto TEXT,
                FOREIGN KEY (id_restaurante) REFERENCES restaurante(id)
            );
        `);

    });
}

module.exports = criarTabelasProduto;