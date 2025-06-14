const db = require('../databases/connection');

const UsuarioModel = {
    buscarPorEmail: (email, callback) => {
        db.get(`SELECT * FROM usuario WHERE email = ?`, [email], callback);
    },

    criarUsuario: (usuario, callback) => {
        const {nome, email, senha, id_grupo} = usuario;
        db.run(`INSERT INTO usuario (nome, email, senha, id_grupo) VALUES (?, ?, ?, ?)`, [nome, email, senha, id_grupo], callback);
    },

    listarTodos: (callback) => {
        db.all(`SELECT * FROM usuario`, callback);
    },

    edit:(id, usuario, callback)=>{
        const {nome, email, senha, id_grupo} = usuario;

        db.run(`UPDATE usuario SET nome=?, email=?, senha=?, id_grupo=? WHERE id=?`, [nome, email, senha, id_grupo, id], function (err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    },

    bucarPorId: (id, callback) => {
        db.get(`SELECT * FROM usuario WHERE id = ?`, [id], callback);
    },
}

module.exports = UsuarioModel;
