const UsuarioModel = require('../models/usuarioModel');

const UsuarioController = {
  cadastrar: async (req, res) => {
    const { nome, email, senha, id_grupo } = req.body;

    if (!nome || !email || !senha || !id_grupo) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    UsuarioModel.buscarPorEmail(email, async (err, usuarioExistente) => {
      if (usuarioExistente) {
        return res.status(400).json({ erro: 'E-mail já cadastrado.' });
      }

      UsuarioModel.criarUsuario({ nome, email, senha, id_grupo }, (err) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao cadastrar usuário.', detalhe: err.message });
        }
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
      });
    });
  },

  login: (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
    }

    UsuarioModel.buscarPorEmail(email, async (err, usuario) => {
      if (!usuario) {
        return res.status(401).json({ erro: 'Usuário não encontrado.' });
      }

      const senhaConfere = (senha, usuario.senha);

      if (!senhaConfere) {
        return res.status(401).json({ erro: 'Senha incorreta.' });
      }

      res.status(200).json({ mensagem: 'Login realizado com sucesso.', usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, id_grupo: usuario.id_grupo,} });
    });
  },
  listarTodos: (req, res) => {
    UsuarioModel.listarTodos((err, usuarios) => {
      if (err) return res.status(500).json({ erro: 'Erro ao listar usuários.', detalhe: err.message });
      res.status(200).json(usuarios);
    });
  },
  
  buscarPorId: (req, res) => {
    const { id } = req.params;
    UsuarioModel.bucarPorId(id, (err, usuario) => {
      if (err) return res.status(500).json({ erro: 'Erro ao buscar usuário.', detalhe: err.message });
      res.status(200).json(usuario);
    });
  },

};

module.exports = UsuarioController;
