const db = require ('../db');

function createTableUsuario(){

    db.serialize(()=>{
        db.run(`
            CREATE TABLE IF NOT EXISTS grupo(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            )
             `)

        db.run(`
            CREATE TABLE IF NOT EXISTS usuario(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            senha TEXT,
            dataCadastro (DATETIME("now")),
            id_grupo INTERGER,

            FOREING KEY (id_grupo) REFERENCES grupo(id) ON DELETE CASCADE,
            )
            `);


        

        db.run(`
            CREATE TABLE IF NOT EXISTS permissao(
            id INTEGER PRUMARY KEY AUTOINCREMENT,
            nome TEXT,
            descricao TEXT,
            id_grupo INTERGER,

            FOREING KEY (id_grupo) REFERENCES grupo(id) ON DELETE CASCADE,
            )
            
            `)
    })
}


