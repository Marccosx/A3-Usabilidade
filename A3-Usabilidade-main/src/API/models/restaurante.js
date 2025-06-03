const mongoose = require('mongoose');

const restauranteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    horarioFuncionamento: {
        type: String,
        required: true
    },
    avaliacao: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Restaurante', restauranteSchema); 