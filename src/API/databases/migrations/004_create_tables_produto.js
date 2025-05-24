const db = require('../db');


function criarTabelasProduto() {

    db.serialize(() => {
        db.run(`
                CREATE TABLE IF NOT EXISTS produto(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                descricao TEXT,
                preco REAL,
                ativo BOOLEAN,
                id_restaurante INTEGER

                FOREIGN KEY (id_resturante) REFERENCES restaurante(id)

                );
                `);
                
        db.run(`
            CREATE TABLE IF NOT EXISTS foto_produto(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            contentType TEXT,
            tamanho REAL,
            id_produto INTEGER

            FOREIGN KEY (id_produto) REFERENCES produto(id)
            )
            `)



    });

}