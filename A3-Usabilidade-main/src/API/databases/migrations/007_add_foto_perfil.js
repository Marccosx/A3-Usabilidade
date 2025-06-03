const db = require('../connection');

const addFotoPerfilColumn = () => {
    const sql = `
    ALTER TABLE restaurantes 
    ADD COLUMN foto_perfil TEXT;
    `;

    db.run(sql, (err) => {
        if (err) {
            if (err.message.includes('duplicate column name')) {
                console.log('Coluna foto_perfil já existe na tabela restaurantes.');
            } else {
                console.error('Erro ao adicionar coluna foto_perfil:', err.message);
            }
        } else {
            console.log('Coluna foto_perfil adicionada com sucesso à tabela restaurantes.');
        }
    });
};

// Executar a migração
addFotoPerfilColumn(); 