const db = require('../connection');

const createAvaliacao = () => {
    return new Promise((resolve, reject) => {
        const sql = `
        CREATE TABLE IF NOT EXISTS avaliacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            restaurante_id INTEGER NOT NULL,
            nome TEXT NOT NULL,
            avaliacao INTEGER NOT NULL,
            comentario TEXT NOT NULL,
            data DATE NOT NULL,
            FOREIGN KEY (restaurante_id) REFERENCES restaurante(id) ON DELETE CASCADE
        )`;

        db.run(sql, (err) => {
            if (err) {
                console.error('Erro ao criar tabela de avaliações:', err.message);
                reject(err);
            } else {
                console.log('Tabela de avaliações criada com sucesso!');
                resolve();
            }
        });
    });
};

module.exports = createAvaliacao; 