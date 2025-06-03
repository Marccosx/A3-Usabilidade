const db = require('../connection');

function criarTabelasProduto() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS produto(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT,
                    descricao TEXT,
                    preco REAL,
                    ativo BOOLEAN,
                    id_restaurante INTEGER,
                    FOREIGN KEY (id_restaurante) REFERENCES restaurante(id)
                );
            `, (err) => {
                if (err) {
                    console.error('Erro ao criar tabela produto:', err);
                    reject(err);
                    return;
                }
                console.log('Tabela produto criada com sucesso!');
            });

            db.run(`
                CREATE TABLE IF NOT EXISTS foto_produto(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT,
                    contentType TEXT,
                    tamanho REAL,
                    id_produto INTEGER,
                    FOREIGN KEY (id_produto) REFERENCES produto(id)
                );
            `, (err) => {
                if (err) {
                    console.error('Erro ao criar tabela foto_produto:', err);
                    reject(err);
                    return;
                }
                console.log('Tabela foto_produto criada com sucesso!');
                resolve();
            });
        });
    });
}

module.exports = criarTabelasProduto;