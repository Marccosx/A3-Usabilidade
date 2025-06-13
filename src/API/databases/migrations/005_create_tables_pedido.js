const db = require('../connection');

function criarTabelasPedido(){

    db.serialize(()=>{

        db.run(`
            CREATE TABLE IF NOT EXISTS status_pedido(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT
            );
            `);


        db.run(`
            CREATE TABLE IF NOT EXISTS pedido(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo TEXT,
            subtotal TEXT,
            taxaFrete REAL,
            valorTotal REAL,
            dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
            dataEntrega DATETIME,
            dataCancelamento DATETIME,

            id_usuario INTEGER,
            id_restaurante INTEGER,
            id_forma_pagamento INTEGER,
            id_status INTEGER,

            FOREIGN KEY (id_usuario) REFERENCES usuario(id),
            FOREIGN KEY (id_restaurante) REFERENCES restaurante(id) ON DELETE CASCADE,
            FOREIGN KEY (id_forma_pagamento) REFERENCES forma_pagamento(id) ON DELETE CASCADE,
            FOREIGN KEY (id_status) REFERENCES status_pedido(id) on DELETE CASCADE
            );
            `);

        db.run(`
            CREATE TABLE IF NOT EXISTS item_pedido(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quantidade INTEGER,
            precoUnitario REAL,
            precoTotal REAL,
            obeservacao TEXT,

            id_pedido INTEGER,
            id_produto INTEGER,

            FOREIGN KEY (id_pedido)  REFERENCES pedido(id),
            FOREIGN KEY (id_produto) REFERENCES produto(id)
            );
            `);

    })

}

module.exports = criarTabelasPedido;