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
    }
}

module.exports = UsuarioModel;
