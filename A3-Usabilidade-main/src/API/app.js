const express = require('express');
const bodyParser = require('body-parser');
const { PORTA } = require('./config');
const cors = require('cors');
const db = require('./databases/connection');

const app = express();

// Configurações do CORS
app.use(cors());

// Configurações de limite de tamanho para requisições
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware para logar requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Configuração para arquivos estáticos
app.use('/uploads', express.static('uploads'));

// Função para executar migrações de forma síncrona
async function runMigrations() {
    const createUsuario = require('./databases/migrations/001_create_tables_usuario');
    const createEndereco = require('./databases/migrations/002_create_tables_endereco');
    const createRestaurante = require('./databases/migrations/003_create_tables_restaurante');
    const createProduto = require('./databases/migrations/004_create_tables_produto');
    const createPedido = require('./databases/migrations/005_create_tables_pedido');
    const createAvaliacao = require('./databases/migrations/006_create_tables_avaliacao');
    const alterProduto = require('./databases/migrations/007_alter_table_produto');
    const addFotoPerfil = require('./databases/migrations/008_add_foto_perfil');
    const addImagemProduto = require('./databases/migrations/009_add_imagem_produto');
    const addDescricaoRestaurante = require('./databases/migrations/010_add_descricao_restaurante');

    try {
        await createUsuario();
        await createEndereco();
        await createRestaurante();
        await createProduto();
        await createPedido();
        await createAvaliacao();
        await alterProduto();
        await addFotoPerfil();
        await addImagemProduto();
        await addDescricaoRestaurante();
        console.log('Todas as migrações foram executadas com sucesso!');

        // Executar seeds após as migrações
        require('./databases/seeds');
    } catch (error) {
        console.error('Erro ao executar migrações:', error);
        process.exit(1);
    }
}

// Executar migrações antes de iniciar o servidor
runMigrations();

// Rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const restauranteRoutes = require('./routes/restauranteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

app.use('/usuarios', usuarioRoutes);
app.use('/restaurantes', restauranteRoutes);
app.use('/produtos', produtoRoutes);

// Middleware de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
    });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada'
    });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

module.exports = app;