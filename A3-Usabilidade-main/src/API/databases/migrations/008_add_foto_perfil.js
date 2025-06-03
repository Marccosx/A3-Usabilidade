const db = require('../connection');

const addFotoPerfil = () => {
    // Verifica se a coluna existe
    db.get("PRAGMA table_info(restaurante)", (err, rows) => {
        if (err) {
            console.error('Erro ao verificar estrutura da tabela:', err.message);
            return;
        }

        // Adiciona a coluna se ela não existir
        db.run(`
            ALTER TABLE restaurante 
            ADD COLUMN foto_perfil TEXT;
        `, (err) => {
            if (err) {
                // Se der erro, provavelmente a coluna já existe
                console.log('Coluna foto_perfil já existe ou erro:', err.message);
            } else {
                console.log('Coluna foto_perfil adicionada com sucesso!');
            }
        });
    });
};

module.exports = addFotoPerfil; 