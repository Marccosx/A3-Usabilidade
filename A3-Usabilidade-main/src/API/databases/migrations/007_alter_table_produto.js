const db = require('../connection');

function alterTableProduto() {
    db.serialize(() => {
        // Verifica se a coluna já existe
        db.all("PRAGMA table_info(produto)", (err, rows) => {
            if (err) {
                console.error('Erro ao verificar estrutura da tabela:', err);
                return;
            }

            // Se a coluna não existir, adiciona ela
            const hasColumn = Array.isArray(rows) && rows.some(row => row.name === 'id_restaurante');
            
            if (!hasColumn) {
                console.log('Adicionando coluna id_restaurante à tabela produto...');
                
                // Adiciona a coluna id_restaurante
                db.run(`
                    ALTER TABLE produto
                    ADD COLUMN id_restaurante INTEGER
                    REFERENCES restaurante(id)
                    ON DELETE CASCADE;
                `, (err) => {
                    if (err) {
                        console.error('Erro ao adicionar coluna:', err);
                        return;
                    }

                    // Atualiza a tabela para garantir que todos os produtos tenham um restaurante
                    db.run(`
                        UPDATE produto
                        SET id_restaurante = (
                            SELECT id FROM restaurante LIMIT 1
                        )
                        WHERE id_restaurante IS NULL;
                    `, (err) => {
                        if (err) {
                            console.error('Erro ao atualizar produtos:', err);
                            return;
                        }

                        // Adiciona a constraint NOT NULL
                        db.run(`
                            CREATE TABLE produto_temp (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                nome TEXT NOT NULL,
                                descricao TEXT,
                                preco REAL NOT NULL,
                                imagem TEXT,
                                id_restaurante INTEGER NOT NULL,
                                FOREIGN KEY (id_restaurante) REFERENCES restaurante(id) ON DELETE CASCADE
                            );
                        `, (err) => {
                            if (err) {
                                console.error('Erro ao criar tabela temporária:', err);
                                return;
                            }

                            db.run(`
                                INSERT INTO produto_temp (id, nome, descricao, preco, imagem, id_restaurante)
                                SELECT id, nome, descricao, preco, imagem, id_restaurante
                                FROM produto;
                            `, (err) => {
                                if (err) {
                                    console.error('Erro ao copiar dados:', err);
                                    return;
                                }

                                db.run(`DROP TABLE produto;`, (err) => {
                                    if (err) {
                                        console.error('Erro ao dropar tabela antiga:', err);
                                        return;
                                    }

                                    db.run(`ALTER TABLE produto_temp RENAME TO produto;`, (err) => {
                                        if (err) {
                                            console.error('Erro ao renomear tabela:', err);
                                            return;
                                        }
                                        console.log('Migração da tabela produto concluída com sucesso!');
                                    });
                                });
                            });
                        });
                    });
                });
            } else {
                console.log('Coluna id_restaurante já existe na tabela produto.');
            }
        });
    });
}

module.exports = alterTableProduto; 