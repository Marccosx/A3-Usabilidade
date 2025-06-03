const db = require('../connection');

function criarTablesRestaurante() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS cozinha(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL
                );
            `, (err) => {
                if (err) {
                    console.error('Erro ao criar tabela cozinha:', err);
                    reject(err);
                    return;
                }
                console.log('Tabela cozinha criada com sucesso!');
            });
            
            db.run(`
                CREATE TABLE IF NOT EXISTS restaurante(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    descricao TEXT,
                    taxaFrete REAL,
                    ativo BOOLEAN,
                    aberto BOOLEAN,
                    foto_perfil TEXT,
                    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
                    dataAtualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
                    
                    id_endereco INTEGER,
                    id_cozinha INTEGER,
                    FOREIGN KEY (id_endereco) REFERENCES endereco(id),
                    FOREIGN KEY (id_cozinha) REFERENCES cozinha(id)
                );
            `, (err) => {
                if (err) {
                    console.error('Erro ao criar tabela restaurante:', err);
                    reject(err);
                    return;
                }
                console.log('Tabela restaurante criada com sucesso!');
            });

            db.run(`
                CREATE TABLE IF NOT EXISTS forma_pagamento(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    descricao TEXT
                );
            `, (err) => {
                if (err) {
                    console.error('Erro ao criar tabela forma_pagamento:', err);
                    reject(err);
                    return;
                }
                console.log('Tabela forma_pagamento criada com sucesso!');
            });

            db.run(`
                CREATE TABLE IF NOT EXISTS restaurante_forma_pagamento(
                    id_restaurante INTEGER,
                    id_forma_pagamento INTEGER,
                    PRIMARY KEY (id_restaurante, id_forma_pagamento),
                    FOREIGN KEY (id_restaurante) REFERENCES restaurante(id),
                    FOREIGN KEY (id_forma_pagamento) REFERENCES forma_pagamento(id)
                );
            `, (err) => {
                if (err) {
                    console.error('Erro ao criar tabela restaurante_forma_pagamento:', err);
                    reject(err);
                    return;
                }
                console.log('Tabela restaurante_forma_pagamento criada com sucesso!');
                resolve();
            });
        });
    });
}

module.exports = criarTablesRestaurante;