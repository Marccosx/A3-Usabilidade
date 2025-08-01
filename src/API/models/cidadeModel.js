const db = require('../databases/connection');

const cidadeModel = {
    create: (cidade, callback) => {
        const { nome, id_estado } = cidade;
        db.run(
            `INSERT INTO cidade (nome, id_estado) VALUES (?, ?)`,
            [nome, id_estado],
            function (err) {
                if (err) return callback(err);
                callback(null, { id: this.lastID });
            }
        );
    },
    list: (callback) => {
        db.all(
            `SELECT cidade.id, cidade.nome, estado.sigla 
             FROM cidade 
             JOIN estado ON cidade.id_estado = estado.id`,
            [],
            (err, rows) => {
                if (err) return callback(err);
                callback(null, rows);
            }
        );
    },
    buscarCidadePorId: (id, callback) => {
        db.get(`SELECT * FROM cidade where id = ?`, [id], (err, row) => {
            if (err) return callback(err);
            callback(null, row);
        });
    },
    buscarCidadePorNomeEstado: (nome, id_estado, callback) => {
        db.get(`SELECT * FROM cidade WHERE nome = ? AND id_estado = ?`, [nome, id_estado], callback);
    },
    update: (id, nome, id_estado, callback) => {
        db.run(
            `UPDATE cidade SET nome=?, id_estado=?  WHERE id=?`,[nome, id_estado, id],
            function (err) {
                if (err) return callback(err);
                callback(null, { changes: this.changes });
            }
        );
    },
    buscarCidadePorIDEstado: (id_estado, callback) =>{
        db.all(`SELECT * FROM cidade WHERE id_estado =?`, [id_estado], callback );
    },
    delete: (id, callback) => {
        db.run(
            `DELETE FROM cidade WHERE id=?`,
            [id],
            function (err) {
                if (err) return callback(err);
                callback(null, { changes: this.changes })
            });
    }
};

module.exports = cidadeModel;