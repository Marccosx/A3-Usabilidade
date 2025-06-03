const db = require('./connection');

// Função para executar uma query como Promise
function runQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

// Função principal do seed
async function executeSeed() {
    try {
        console.log('Iniciando processo de seed...');

        // Desabilitar verificação de chave estrangeira temporariamente
        await runQuery('PRAGMA foreign_keys = OFF');

        // Limpar todas as tabelas na ordem correta
        console.log('Limpando tabelas...');
        await runQuery('DELETE FROM produto');
        await runQuery('DELETE FROM restaurante_forma_pagamento');
        await runQuery('DELETE FROM forma_pagamento');
        await runQuery('DELETE FROM restaurante');
        await runQuery('DELETE FROM cozinha');
        await runQuery('DELETE FROM estado');
        console.log('Todas as tabelas foram limpas com sucesso!');

        // Reabilitar verificação de chave estrangeira
        await runQuery('PRAGMA foreign_keys = ON');

        // Inserir estados
        console.log('Inserindo estados...');
        const estados = [
            { id: 5, nome: 'Bahia', sigla: 'BA' } // Apenas Bahia, já que os restaurantes são de Salvador
        ];

        for (const estado of estados) {
            await runQuery(
                'INSERT INTO estado (id, nome, sigla) VALUES (?, ?, ?)',
                [estado.id, estado.nome, estado.sigla]
            );
        }
        console.log('Estados inseridos com sucesso!');

        // Inserir tipos de cozinha
        console.log('Inserindo tipos de cozinha...');
        const cozinhas = [
            { nome: 'Baiana' },
            { nome: 'Italiana' },
            { nome: 'Hamburgueria' }
        ];

        for (const cozinha of cozinhas) {
            const result = await runQuery(
                'INSERT INTO cozinha (nome) VALUES (?)',
                [cozinha.nome]
            );
            cozinha.id = result.lastID;
            console.log(`Cozinha ${cozinha.nome} inserida com ID ${cozinha.id}`);
        }

        // Inserir restaurantes
        const restaurantes = [
            {
                nome: 'Sabor Brasileiro',
                descricao: 'Restaurante especializado em comida baiana tradicional',
                taxaFrete: 5.00,
                ativo: 1,
                aberto: 1,
                foto_perfil: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
                id_cozinha: cozinhas[0].id // Baiana
            },
            {
                nome: 'Pizza Express',
                descricao: 'As melhores pizzas de Salvador',
                taxaFrete: 6.00,
                ativo: 1,
                aberto: 1,
                foto_perfil: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
                id_cozinha: cozinhas[1].id // Italiana
            },
            {
                nome: 'Burger House',
                descricao: 'Hambúrgueres artesanais com toque baiano',
                taxaFrete: 4.50,
                ativo: 1,
                aberto: 1,
                foto_perfil: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add',
                id_cozinha: cozinhas[2].id // Hamburgueria
            }
        ];

        console.log('Inserindo restaurantes...');
        for (const restaurante of restaurantes) {
            const result = await runQuery(
                `INSERT INTO restaurante (nome, descricao, taxaFrete, ativo, aberto, foto_perfil, id_cozinha, dataCadastro, dataAtualizacao) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
                [
                    restaurante.nome,
                    restaurante.descricao,
                    restaurante.taxaFrete,
                    restaurante.ativo,
                    restaurante.aberto,
                    restaurante.foto_perfil,
                    restaurante.id_cozinha
                ]
            );
            restaurante.id = result.lastID;
            console.log(`Restaurante ${restaurante.nome} inserido com ID ${restaurante.id}`);
        }

        // Inserir produtos para cada restaurante
        console.log('Inserindo produtos...');
        
        // Produtos do Sabor Brasileiro (Comida Baiana)
        const produtosSaborBrasileiro = [
            {
                nome: 'Acarajé',
                descricao: 'Tradicional acarajé baiano com vatapá, caruru e camarão',
                preco: 12.90,
                ativo: 1,
                imagem: 'https://images.unsplash.com/photo-1578332049773-b6f35e0e07a4'
            },
            {
                nome: 'Moqueca de Peixe',
                descricao: 'Moqueca de peixe com arroz, pirão e farofa',
                preco: 89.90,
                ativo: 1,
                imagem: 'https://images.unsplash.com/photo-1599084993091-1cb5c0629b31'
            },
            {
                nome: 'Bobó de Camarão',
                descricao: 'Bobó de camarão cremoso com arroz branco',
                preco: 79.90,
                ativo: 1,
                imagem: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe'
            }
        ];

        // Produtos do Pizza Express
        const produtosPizzaExpress = [
            {
                nome: 'Pizza Margherita',
                descricao: 'Molho de tomate, mussarela, manjericão fresco e azeite',
                preco: 49.90,
                ativo: 1,
                imagem: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca'
            },
            {
                nome: 'Pizza Pepperoni',
                descricao: 'Molho de tomate, mussarela e pepperoni',
                preco: 54.90,
                ativo: 1,
                imagem: 'https://images.unsplash.com/photo-1628840042765-356cda07504e'
            },
            {
                nome: 'Pizza Quatro Queijos',
                descricao: 'Molho de tomate, mussarela, gorgonzola, parmesão e catupiry',
                preco: 59.90,
                ativo: 1,
                imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
            }
        ];

        // Produtos do Burger House
        const produtosBurgerHouse = [
            {
                nome: 'Classic Burger',
                descricao: 'Hambúrguer artesanal, queijo cheddar, alface, tomate e molho especial',
                preco: 29.90,
                ativo: 1,
                imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
            },
            {
                nome: 'Bacon Burger',
                descricao: 'Hambúrguer artesanal, bacon crocante, queijo cheddar e molho barbecue',
                preco: 34.90,
                ativo: 1,
                imagem: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b'
            },
            {
                nome: 'Mega Burger',
                descricao: 'Dois hambúrgueres artesanais, bacon, queijo cheddar, anéis de cebola e molho especial',
                preco: 39.90,
                ativo: 1,
                imagem: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90'
            }
        ];

        // Inserir produtos do Sabor Brasileiro
        for (const produto of produtosSaborBrasileiro) {
            await runQuery(
                `INSERT INTO produto (nome, descricao, preco, ativo, imagem, id_restaurante) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    produto.nome,
                    produto.descricao,
                    produto.preco,
                    produto.ativo,
                    produto.imagem,
                    restaurantes[0].id
                ]
            );
            console.log(`Produto ${produto.nome} inserido para ${restaurantes[0].nome}`);
        }

        // Inserir produtos do Pizza Express
        for (const produto of produtosPizzaExpress) {
            await runQuery(
                `INSERT INTO produto (nome, descricao, preco, ativo, imagem, id_restaurante) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    produto.nome,
                    produto.descricao,
                    produto.preco,
                    produto.ativo,
                    produto.imagem,
                    restaurantes[1].id
                ]
            );
            console.log(`Produto ${produto.nome} inserido para ${restaurantes[1].nome}`);
        }

        // Inserir produtos do Burger House
        for (const produto of produtosBurgerHouse) {
            await runQuery(
                `INSERT INTO produto (nome, descricao, preco, ativo, imagem, id_restaurante) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    produto.nome,
                    produto.descricao,
                    produto.preco,
                    produto.ativo,
                    produto.imagem,
                    restaurantes[2].id
                ]
            );
            console.log(`Produto ${produto.nome} inserido para ${restaurantes[2].nome}`);
        }

        // Verificar restaurantes e produtos inseridos
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    r.nome as restaurante,
                    r.descricao as restaurante_descricao,
                    c.nome as tipo_cozinha,
                    p.nome as produto,
                    p.descricao as produto_descricao,
                    p.preco
                FROM restaurante r 
                LEFT JOIN cozinha c ON r.id_cozinha = c.id
                LEFT JOIN produto p ON p.id_restaurante = r.id
                ORDER BY r.nome, p.nome
            `, [], (err, rows) => {
                if (err) {
                    console.error('Erro ao verificar dados:', err);
                    reject(err);
                } else {
                    console.log('Dados inseridos:', JSON.stringify(rows, null, 2));
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error('Erro durante o seed:', error);
        throw error;
    }
}

// Executar o seed
executeSeed()
    .then(() => {
        console.log('Seed concluído com sucesso!');
        db.close();
    })
    .catch((error) => {
        console.error('Falha no processo de seed:', error);
        db.close();
    });