const db = require('../databases/connection');

const enderecoModel = {
    create: (endereco, callback) => {
        const { rua, numero, bairro, cep, complemento, id_cidade } = endereco;
        db.run(
            `INSERT INTO endereco (rua, numero, bairro, cep, complemento, id_cidade) VALUES (?, ?, ?, ?, ?, ?)`,
            [rua, numero, bairro, cep, complemento, id_cidade],
            function (err) {
                if (err) return callback(err);
                callback(null, { id: this.lastID });
            }
        );
    },
    list: (callback) => {
        db.all(`SELECT * FROM endereco`, [], (err, rows) => {
            if (err) return callback(err);
            callback(null, rows);
        });
    },
    buscarPorId: (id, callback) => {
        db.get(`SELECT * FROM endereco WHERE id = ?`, [id], (err, row) => {
            if (err) return callback(err);
            callback(null, row);
        });
    },
    update: (id, endereco, callback) => {
        const { rua, numero, bairro, cep, complemento, id_cidade } = endereco;
        db.run(
            `UPDATE endereco SET rua=?, numero=?, bairro=?, cep=?, complemento=?, id_cidade=? WHERE id=?`,
            [rua, numero, bairro, cep, complemento, id_cidade, id],
            function (err) {
                if (err) return callback(err);
                callback(null, { changes: this.changes });
            }
        );
    },
    delete: (id, callback) => {
        db.run(
            `DELETE FROM endereco WHERE id=?`,
            [id],
            function (err) {
                if (err) return callback(err);
                callback(null, { changes: this.changes });
            }
        );
    }
};

module.exports = enderecoModel;