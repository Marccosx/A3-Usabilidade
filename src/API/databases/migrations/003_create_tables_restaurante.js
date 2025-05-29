const db = require('../connection');

function criarTablesRestaurante(){
    db.serialize(()=>{
    
        db.run(`
            CREATE TABLE IF NOT EXISTS cozinha(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL
            );
        `);
        
        db.run(`
            CREATE TABLE IF NOT EXISTS restaurante(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            taxaFrete REAL,
            ativo BOOLEAN,
            aberto BOOLEAN,
            dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
            dataAtualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
            
            id_endereco INTEGER,
            id_cozinha INTEGER,
            FOREIGN KEY (id_endereco) REFERENCES endereco(id),
            FOREIGN KEY (id_cozinha) REFERENCES cozinha(id)
            );
         `);

         db.run(`
            CREATE TABLE IF NOT EXISTS forma_pagamento(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            descricao TEXT
            );
            `);

        db.run(`
            CREATE TABLE IF NOT EXISTS restaurante_forma_pagamento(
            id_restaurante INTEGER,
            id_forma_pagamento INTEGER,
            PRIMARY KEY (id_restaurante, id_forma_pagamento),
            FOREIGN KEY (id_restaurante) REFERENCES restaurante(id),
            FOREIGN KEY (id_forma_pagamento) REFERENCES forma_pagamento(id)
            );
            `);
    })
}
module.exports = criarTablesRestaurante;