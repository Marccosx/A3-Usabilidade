const EstadoModel = require('../models/estadoModel');

exports.list = (req, res) => {
    EstadoModel.list((err, estados) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(estados);
    });
};