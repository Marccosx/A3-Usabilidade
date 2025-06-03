const db = require('../connection');

const createRestaurantes = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS restaurantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        endereco TEXT NOT NULL,
        estado_id INTEGER,
        cidade TEXT NOT NULL,
        foto_perfil TEXT,
        FOREIGN KEY (estado_id) REFERENCES estado(id)
    )`;

    db.run(sql, (err) => {
        if (err) {
            console.error('Erro ao criar tabela de restaurantes:', err.message);
        } else {
            console.log('Tabela de restaurantes criada com sucesso!');
        }
    });
};

// Executar a criação da tabela
createRestaurantes(); 