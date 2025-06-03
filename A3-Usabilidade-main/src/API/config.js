const path = require('path');

const CAMINHO_BANCO = path.join(__dirname, 'databases', 'banco.sqlite');
const PORTA = 3000;

module.exports = { CAMINHO_BANCO, PORTA };