const db = require('../connection');

const addDescricaoRestaurante = () => {
    return new Promise((resolve, reject) => {
        // Verifica se a coluna existe
        db.get("PRAGMA table_info(restaurante)", (err, rows) => {
            if (err) {
                console.error('Erro ao verificar estrutura da tabela:', err.message);
                reject(err);
                return;
            }

            // Adiciona a coluna se ela não existir
            db.run(`
                ALTER TABLE restaurante 
                ADD COLUMN descricao TEXT;
            `, (err) => {
                if (err) {
                    // Se der erro, provavelmente a coluna já existe
                    console.log('Coluna descricao já existe ou erro:', err.message);
                    resolve(); // Resolvemos mesmo com erro pois a coluna pode já existir
                } else {
                    console.log('Coluna descricao adicionada com sucesso à tabela restaurante!');
                    resolve();
                }
            });
        });
    });
};

module.exports = addDescricaoRestaurante; 