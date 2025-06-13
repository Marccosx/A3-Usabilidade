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
        foto_produto: '',
        id_restaurante: id,
        ativo: false,
        categoria: ''
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
            if (response.status === 200) {
                setRestaurante(response.data);
            }
        } catch (error) {
            console.error('Erro ao carregar restaurante:', error);
            setErro('Erro ao carregar informações do restaurante');
        }
    };

    const carregarProdutos = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/produtos/restaurante/${id}`);
            if (response.status === 200) {
                setProdutos(response.data);
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
                response = await axios.put(`http://localhost:3000/produtos/edit/${editando}`, novoProduto);
            } else {
                response = await axios.post('http://localhost:3000/produtos/create/', novoProduto);
            }

            if (response.status === 200 || response.status === 201) {

                alert(editando ? 'Produto atualizado com sucesso!' : 'Produto adicionado com sucesso!');
                setNovoProduto({
                    nome: '',
                    descricao: '',
                    preco: 0,
                    foto_produto: '',
                    id_restaurante: id,
                    ativo: false,
                    categoria: ''
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
                const response = await axios.delete(`http://localhost:3000/produtos/delete/${produtoId}`);
                if (response.status === 200) {
                    alert('Produto excluído com sucesso!');
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
        let preview = '';
        if (produto.foto_produto) {
            try {
                const imgObj = JSON.parse(produto.foto_produto);
                preview = imgObj.caminho;
            } catch {
                preview = produto.foto_produto; // fallback se não for JSON
            }
        }
        setNovoProduto({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            foto_produto: produto.foto_produto,
            ativo: produto.ativo,
            id_restaurante: id,
            categoria: produto.categoria || ''
        });
        setPreviewImage(preview);
        setEditando(produto.id);
        setErro('');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setNovoProduto({ ...novoProduto, foto_produto: reader.result });
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

                    <div className="form-grid reorganizado">
                        <div className="top-row">
                            <div className="form-group foto-group">
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
                            <div className="form-group ativo-group">
                                <label htmlFor="ativo">Pedido está ativo?</label>
                                <label className="switch">
                                    <input
                                        id="ativo"
                                        type="checkbox"
                                        checked={novoProduto.ativo}
                                        onChange={(e) => setNovoProduto({ ...novoProduto, ativo: e.target.checked })}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                        <div className="bottom-row">
                            <div className="form-group">
                                <label htmlFor="nome">Nome do Produto</label>
                                <input
                                    id="nome"
                                    type="text"
                                    placeholder="Nome do Produto"
                                    value={novoProduto.nome}
                                    onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="descricao">Descrição</label>
                                <textarea
                                    id="descricao"
                                    placeholder="Descrição do Produto"
                                    value={novoProduto.descricao}
                                    onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="preco">Preço</label>
                                <input
                                    id="preco"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Preço"
                                    value={novoProduto.preco === undefined || novoProduto.preco === null ? '' : novoProduto.preco}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setNovoProduto({
                                            ...novoProduto,
                                            preco: value === '' ? '' : parseFloat(value.replace(',', '.'))
                                        });
                                    }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoria">Categoria</label>
                                <select
                                    id="categoria"
                                    value={novoProduto.categoria}
                                    onChange={(e) => setNovoProduto({ ...novoProduto, categoria: e.target.value })}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    <option value="Lanches">Lanches</option>
                                    <option value="Almoço">Almoço</option>
                                    <option value="Vegano">Vegano</option>
                                    <option value="Outros">Outros</option>
                                </select>
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
                                            id_restaurante: id,
                                            categoria: '',
                                            ativo: false,
                                        });
                                        setPreviewImage(null);
                                    }}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
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
                            {produtos.map((produto) => {
                                let imagemSrc = '';
                                if (produto.foto_produto) {
                                    try {
                                        const imgObj = JSON.parse(produto.foto_produto);
                                        imagemSrc = imgObj.caminho;
                                    } catch {
                                        imagemSrc = produto.foto_produto; // fallback se não for JSON
                                    }
                                }
                                return (
                                    <tr key={produto.id}>
                                        <td>
                                            <div className="produto-photo">
                                                {imagemSrc ? (
                                                    <img
                                                        src={imagemSrc}
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
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GerenciarProdutos;