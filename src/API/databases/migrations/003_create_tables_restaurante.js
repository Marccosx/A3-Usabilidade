const db = require('../connection');

function criarTablesRestaurante(){
    db.serialize(()=>{
    
        
        db.run(`
            CREATE TABLE IF NOT EXISTS restaurante(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            taxaFrete REAL,
            ativo BOOLEAN,
            aberto BOOLEAN,
            avaliacao REAL,
            foto TEXT,
            dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
            dataAtualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
            
            id_endereco INTEGER,
            FOREIGN KEY (id_endereco) REFERENCES endereco(id)
            );
         `);

         db.run(`
            CREATE TABLE IF NOT EXISTS forma_pagamento(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            descricao TEXT
            );
            `);

            db.run(`
                CREATE TABLE IF NOT EXISTS avalicao_restaurante(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nota INTEGER,
                comentario TEXT,
                data DATETIME DEFAULT CURRENT_TIMESTAMP,
                id_usuario INTEGER,
                id_restaurante INTEGER,
                FOREIGN KEY (id_usuario) REFERENCES usuario(id),
                FOREIGN KEY (id_restaurante) REFERENCES restaurante(id)
                );`);
    
    })
}
module.exports = criarTablesRestaurante;