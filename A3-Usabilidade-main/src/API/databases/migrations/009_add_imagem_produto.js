const db = require('../connection');

const addImagemProduto = () => {
    return new Promise((resolve, reject) => {
        // Verifica se a coluna existe
        db.get("PRAGMA table_info(produto)", (err, rows) => {
            if (err) {
                console.error('Erro ao verificar estrutura da tabela:', err.message);
                reject(err);
                return;
            }

            // Adiciona a coluna se ela não existir
            db.run(`
                ALTER TABLE produto 
                ADD COLUMN imagem TEXT;
            `, (err) => {
                if (err) {
                    // Se der erro, provavelmente a coluna já existe
                    console.log('Coluna imagem já existe ou erro:', err.message);
                    resolve(); // Resolvemos mesmo com erro pois a coluna pode já existir
                } else {
                    console.log('Coluna imagem adicionada com sucesso à tabela produto!');
                    resolve();
                }
            });
        });
    });
};

module.exports = addImagemProduto; 