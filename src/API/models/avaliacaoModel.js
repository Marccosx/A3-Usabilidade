const db = require('../databases/connection');

const avaliacaoModel = {

    listarAvaliacaoes: (id_restaurante, callback) => {
        db.all(
            `SELECT * FROM avaliacao_restaurante WHERE id_restaurante = ?`,
            [id_restaurante],
            (err, avaliacoes) => {
                if (err) return callback(err);
                callback(null, avaliacoes);
            }
        );
    },

    listarTodas: (callback) => {
        db.all(
            `SELECT * FROM avaliacao_restaurante`,
            [],
            (err, avaliacoes) => {
                if (err) return callback(err);
                callback(null, avaliacoes);
            }
        );
    },

    buscarPorId: (id, callback) => {
        db.get(
            `SELECT * FROM avaliacao_restaurante WHERE id = ?`,
            [id],
            (err, avaliacao) => {
                if (err) return callback(err);
                callback(null, avaliacao);
            }
        );
    },

    create: (id_restaurante, avaliacao, callback) => {
        const { nome, avaliacao: nota, comentario } = avaliacao;

        db.run(
            `INSERT INTO avaliacao_restaurante (nome, avaliacao, comentario, id_restaurante) VALUES (?, ?, ?, ?)`,
            [nome, nota, comentario, id_restaurante],
            function (err) {
                if (err) return callback(err);
                callback(null, { id: this.lastID });
            }
        );
    },
    
    edit: (id, callback) => {
        const { nome, avaliacao, comentario } = avaliacao;
        db.run(
            `UPDATE avaliacao_restaurante SET nome = ?, avaliacao = ?, comentario = ? WHERE id = ?`,
            [nome, avaliacao, comentario, id],
            function (err) {
                if (err) return callback(err);
                callback(null, { changes: this.changes });
            }
        );
    },

    delete: (id, callback) => {
        db.run(
            `DELETE FROM avaliacao_restaurante WHERE id = ?`,
            [id],
            function (err) {
                if (err) return callback(err);
                callback(null, { changes: this.changes });
            }
        );
    }

};

module.exports = avaliacaoModel;