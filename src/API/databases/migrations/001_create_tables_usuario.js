const db = require('../db');

function createTablesUsuario() {

    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS grupo(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT
            );
             `);

        db.run(`
            CREATE TABLE IF NOT EXISTS usuario(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            senha TEXT,
            dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
            id_grupo INTEGER,

            FOREIGN KEY (id_grupo) REFERENCES grupo(id) ON DELETE CASCADE,
            );
            `);




        db.run(`
            CREATE TABLE IF NOT EXISTS permissao(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            descricao TEXT,

            FOREIGN KEY (id_grupo) REFERENCES grupo(id) ON DELETE CASCADE,
            );
            
            `);

        // Relacionamento Grupo <-> Permissão (N:N)
        db.run(`
      CREATE TABLE IF NOT EXISTS grupo_permissao (
        id_grupo INTEGER,
        id_permissao INTEGER,
        PRIMARY KEY (id_grupo, id_permissao),
        FOREIGN KEY (id_grupo) REFERENCES grupo(id) ON DELETE CASCADE,
        FOREIGN KEY (id_permissao) REFERENCES permissao(id) ON DELETE CASCADE
            );
         `);

    })
}


