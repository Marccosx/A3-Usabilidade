import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GerenciarProdutos.css';

const GerenciarProdutos = () => {
    const { id } = useParams();
    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState({
        nome: '',
        descricao: '',
        preco: 0,
        imagem: '',
        id_restaurante: id
    });
    const [editando, setEditando] = useState(null);
    const [erro, setErro] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [restaurante, setRestaurante] = useState(null);

    useEffect(() => {
        carregarRestaurante();
        carregarProdutos();
    }, [id]);

    const carregarRestaurante = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/restaurantes/${id}`);
            if (response.data.success) {
                setRestaurante(response.data.data);
            }
        } catch (error) {
            console.error('Erro ao carregar restaurante:', error);
            setErro('Erro ao carregar informações do restaurante');
        }
    };

    const carregarProdutos = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/produtos/restaurante/${id}`);
            if (response.data.success) {
                setProdutos(response.data.data);
                setErro('');
            }
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            setErro('Erro ao carregar produtos: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editando) {
                response = await axios.put(`http://localhost:3000/produtos/${editando}`, novoProduto);
            } else {
                response = await axios.post('http://localhost:3000/produtos', novoProduto);
            }

            if (response.data.success) {
                setNovoProduto({
                    nome: '',
                    descricao: '',
                    preco: 0,
                    imagem: '',
                    id_restaurante: id
                });
                setEditando(null);
                setPreviewImage(null);
                setErro('');
                carregarProdutos();
            }
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            setErro('Erro ao salvar produto: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (produtoId) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                const response = await axios.delete(`http://localhost:3000/produtos/${produtoId}`);
                if (response.data.success) {
                    carregarProdutos();
                    setErro('');
                }
            } catch (error) {
                console.error('Erro ao deletar produto:', error);
                setErro('Erro ao deletar produto: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const handleEdit = (produto) => {
        setNovoProduto({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            imagem: produto.imagem,
            id_restaurante: id
        });
        setPreviewImage(produto.imagem);
        setEditando(produto.id);
        setErro('');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setNovoProduto({...novoProduto, imagem: reader.result});
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="produtos-container">
            <div className="content-wrapper">
                <h1 className="page-title">
                    Gerenciar Produtos
                    {restaurante && <span className="restaurante-nome">Restaurante: {restaurante.nome}</span>}
                </h1>

                {erro && (
                    <div className="error-message" role="alert">
                        <span>{erro}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="produto-form">
                    <h2 className="form-title">{editando ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
                    
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="foto">Foto do Produto</label>
                            <div className="foto-produto-container">
                                <label htmlFor="foto-input" className="foto-produto-label">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" className="foto-produto-preview" />
                                    ) : (
                                        <div className="foto-produto-placeholder">
                                            <span>Clique para adicionar foto</span>
                                        </div>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="foto-input"
                                    className="foto-produto-input"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nome">Nome do Produto</label>
                            <input
                                id="nome"
                                type="text"
                                placeholder="Nome do Produto"
                                value={novoProduto.nome}
                                onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descricao">Descrição</label>
                            <textarea
                                id="descricao"
                                placeholder="Descrição do Produto"
                                value={novoProduto.descricao}
                                onChange={(e) => setNovoProduto({...novoProduto, descricao: e.target.value})}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="preco">Preço</label>
                            <input
                                id="preco"
                                type="number"
                                step="0.01"
                                placeholder="Preço"
                                value={novoProduto.preco}
                                onChange={(e) => setNovoProduto({...novoProduto, preco: parseFloat(e.target.value)})}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-submit">
                            {editando ? 'Salvar Alterações' : 'Adicionar Produto'}
                        </button>
                        {editando && (
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => {
                                    setEditando(null);
                                    setNovoProduto({
                                        nome: '',
                                        descricao: '',
                                        preco: 0,
                                        imagem: '',
                                        id_restaurante: id
                                    });
                                    setPreviewImage(null);
                                }}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>

                <div className="produtos-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Preço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>
                                        <div className="produto-photo">
                                            {produto.imagem ? (
                                                <img 
                                                    src={produto.imagem} 
                                                    alt={produto.nome}
                                                    className="produto-photo-img"
                                                />
                                            ) : (
                                                <div className="produto-photo-placeholder">
                                                    <span>Sem foto</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.descricao}</td>
                                    <td>R$ {produto.preco.toFixed(2)}</td>
                                    <td className="actions">
                                        <button
                                            onClick={() => handleEdit(produto)}
                                            className="btn-edit"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(produto.id)}
                                            className="btn-delete"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GerenciarProdutos; 