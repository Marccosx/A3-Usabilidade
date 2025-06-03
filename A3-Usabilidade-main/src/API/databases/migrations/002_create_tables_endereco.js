const db = require('../connection');

function createTablesEndereco() {

    db.serialize(() => {

        db.run(`
            CREATE TABLE IF NOT EXISTS estado(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            sigla TEXT NOT NULL

            );
            `);

        db.run(`
            CREATE TABLE IF NOT EXISTS cidade(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            id_estado INTEGER,
            
            FOREIGN KEY (id_estado) REFERENCES estado(id)
            );
            `);

        db.run(`
            CREATE TABLE IF NOT EXISTS endereco(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            rua TEXT,
            numero TEXT,
            bairro TEXT,
            cep TEXT,
            complemento TEXT,
            id_cidade INTEGER,
            
            FOREIGN KEY (id_cidade) REFERENCES cidade(id)
            );
            `);
    })
}

module.exports = createTablesEndereco;