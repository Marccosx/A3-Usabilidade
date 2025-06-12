const db = require('../databases/connection');


const restauranteModel = {

    create: (restaurante, callback) => {
        const { nome, taxaFrete, ativo, aberto,  foto, id_endereco } = restaurante;
        db.run(
            `INSERT INTO restaurante (nome, taxaFrete, ativo, aberto, foto, id_endereco) VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, taxaFrete, ativo, aberto, foto, id_endereco],
            function (err) {
                if (err) return callback(err);
                callback(null, { id: this.lastID });
            }
        );
    },

    edit: (id, restaurante, callback) => {
        const { nome, taxaFrete, ativo, aberto, foto, id_endereco } = restaurante;
        db.run(
            `UPDATE restaurante SET nome=?, taxaFrete=?, ativo=?, aberto=?, foto=?, id_endereco=? WHERE id=?`,
            [nome, taxaFrete, ativo, aberto, foto, id_endereco, id],
            function (err) {
                if (err) return callback(err);
                callback(null, { changes: this.changes });
            }
        );
    },

    list: (callback) => {
        db.all(
            `SELECT * FROM restaurante`,
            [],
            (err, rows) => {
                if (err) return callback(err);
                callback(null, rows);
            }
        );
    },

    buscarRestaurantePorId: (id, callback) => {
        db.get(`SELECT * FROM restaurante WHERE id = ?`, [id], (err, row) => {
            if (err) return callback(err);
            callback(null, row);
        });
    },

    buscarRestaurantePorNome: (nome, callback) => {
        db.get(`SELECT * FROM restaurante WHERE nome = ?`, [nome], (err, row) => {
            if (err) return callback(err);
            callback(null, row);
        });
    },

    buscarRestaurantePorUsuario: (id_usuario, callback)=>{
        db.all(`SELECT * FROM restaurante WHERE id_usuario=?`, [id_usuario], (err, row)=>{
            if(err) return callback(err);
            callback(null, row);
        });
    },

  

    delete: (id, callback) => {
        db.run(
            `DELETE FROM restaurante WHERE id=?`,
            [id],
            function (err) {
                if (err) return callback(err);
                callback(null, { changes: this.changes });
            }
        );
    },
    


}
module.exports = restauranteModel;