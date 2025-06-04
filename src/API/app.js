const express = require('express');
const bodyParser = require('body-parser');
const { PORTA } = require('./config');
const cors = require('cors');

const app = express();
// Execute as migrations ao iniciar o servidor
const createUsuario = require('./databases/migrations/001_create_tables_usuario');
const createEndereco = require('./databases/migrations/002_create_tables_endereco');
const createRestaurante = require('./databases/migrations/003_create_tables_restaurante');
const createProduto = require('./databases/migrations/004_create_tables_produto');
const createPedido = require('./databases/migrations/005_create_tables_pedido');

createUsuario();
createEndereco();
createRestaurante();
createProduto();
createPedido();

//require('./databases/seeds');

app.use(bodyParser.json());
app.use(cors());

// Rotas de usuário
const usuarioRoutes = require('./routes/usuarioRoutes');
const cidadeRoutes = require('./routes/cidadeRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const restauranteRoutes = require('./routes/restauranteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const carrinhoPedidosRoutes = require('./routes/carrinhoRoutes');

app.use('/enderecos', enderecoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/cidades', cidadeRoutes);
app.use('/restaurantes', restauranteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/carrinho', carrinhoPedidosRoutes);

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});