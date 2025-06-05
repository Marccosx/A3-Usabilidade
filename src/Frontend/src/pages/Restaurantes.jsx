import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Restaurantes.css';

const Restaurantes = () => {
    const navigate = useNavigate();
    const [restaurantes, setRestaurantes] = useState([]);
    const [novoRestaurante, setNovoRestaurante] = useState({
        nome: '',
        taxaFrete: 0,
        ativo: true,
        aberto: true,
        foto_perfil: ''
    });
    const [editando, setEditando] = useState(null);
    const [erro, setErro] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        carregarRestaurantes();
    }, []);

    const carregarRestaurantes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/restaurantes/');
            if (response.status === 200) {
                setRestaurantes(response.data);
                setErro('');
            } else {
                console.log('Usando dados de exemplo devido a erro na API', response);
                // Mantém os dados de exemplo
            }
        } catch (error) {
            console.error('Erro ao carregar restaurantes:', error);
            console.log('Usando dados de exemplo devido a erro na API');
            // Mantém os dados de exemplo
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editando) {
                response = await axios.put(`http://localhost:3000/restaurantes/edit/${editando}`, novoRestaurante);
            } else {
                response = await axios.post('http://localhost:3000/restaurantes/create/', novoRestaurante);
            }

            if (response.data.success) {
                setNovoRestaurante({
                    nome: '',
                    taxaFrete: 0,
                    ativo: true,
                    aberto: true,
                    foto_perfil: ''
                });
                setEditando(null);
                setErro('');
                carregarRestaurantes();
            } else {
                setErro('Erro ao salvar restaurante: ' + response.data.message);
            }
        } catch (error) {
            console.error('Erro ao salvar restaurante:', error);
            setErro('Erro ao salvar restaurante: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este restaurante?')) {
            try {
                const response = await axios.delete(`http://localhost:3000/restaurantes/delete/${id}`);
                if (response.data.success) {
                    carregarRestaurantes();
                    setErro('');
                } else {
                    setErro('Erro ao deletar restaurante: ' + response.data.message);
                }
            } catch (error) {
                console.error('Erro ao deletar restaurante:', error);
                setErro('Erro ao deletar restaurante: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const handleEdit = (restaurante) => {
        setNovoRestaurante({
            nome: restaurante.nome,
            taxaFrete: restaurante.taxaFrete,
            ativo: restaurante.ativo,
            aberto: restaurante.aberto,
            foto: restaurante.foto_perfil,
            id_endereco: restaurante.id_endereco,
        });
        setPreviewImage(restaurante.foto_perfil);
        setEditando(restaurante.id);
        setErro('');
    };

    const handleView = (id) => {
        navigate(`/restaurante/${id}`);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setNovoRestaurante({...novoRestaurante, foto_perfil: reader.result});
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="restaurantes-container">
            <div className="content-wrapper">
                <h1 className="page-title">Gerenciar Restaurantes</h1>
                
                {erro && (
                    <div className="error-message" role="alert">
                        <span>{erro}</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="restaurant-form">
                    <h2 className="form-title">
                        {editando ? 'Editar Restaurante' : 'Adicionar Novo Restaurante'}
                    </h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <div className="foto-perfil-container">
                                <label htmlFor="foto_perfil" className="foto-perfil-label">
                                    {previewImage ? (
                                        <img 
                                            src={previewImage} 
                                            alt="Preview" 
                                            className="foto-perfil-preview"
                                        />
                                    ) : (
                                        <div className="foto-perfil-placeholder">
                                            <span>Clique para adicionar foto</span>
                                        </div>
                                    )}
                                </label>
                                <input
                                    id="foto_perfil"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="foto-perfil-input"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nome">Nome do Restaurante</label>
                            <input
                                id="nome"
                                type="text"
                                placeholder="Nome do Restaurante"
                                value={novoRestaurante.nome}
                                onChange={(e) => setNovoRestaurante({...novoRestaurante, nome: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="taxaFrete">Taxa de Entrega</label>
                            <input
                                id="taxaFrete"
                                type="number"
                                step="0.01"
                                placeholder="Taxa de Entrega"
                                value={novoRestaurante.taxaFrete}
                                onChange={(e) => setNovoRestaurante({...novoRestaurante, taxaFrete: parseFloat(e.target.value)})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <div className="toggle-container">
                                <label className="toggle-label">Aberto para Pedidos</label>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={novoRestaurante.aberto}
                                        onChange={(e) => setNovoRestaurante({...novoRestaurante, aberto: e.target.checked})}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            {editando ? 'Atualizar' : 'Adicionar'}
                        </button>
                        {editando && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditando(null);
                                    setNovoRestaurante({
                                        nome: '',
                                        taxaFrete: 0,
                                        ativo: true,
                                        aberto: true,
                                        foto_perfil: ''
                                    });
                                    setPreviewImage(null);
                                    setErro('');
                                }}
                                className="btn-secondary"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>

                <div className="restaurants-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Nome</th>
                                <th>Taxa de Entrega</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restaurantes.map((restaurante) => (
                                <tr key={restaurante.id}>
                                    <td>
                                        <div className="restaurant-photo">
                                            {restaurante.foto_perfil ? (
                                                <img 
                                                    src={restaurante.foto_perfil} 
                                                    alt={restaurante.nome}
                                                    className="restaurant-photo-img"
                                                />
                                            ) : (
                                                <div className="restaurant-photo-placeholder">
                                                    <span>Sem foto</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>{restaurante.nome}</td>
                                    <td>R$ {restaurante.taxaFrete.toFixed(2)}</td>
                                    <td>
                                        <span className={`status-badge ${restaurante.aberto ? 'status-open' : 'status-closed'}`}>
                                            {restaurante.aberto ? 'Aberto' : 'Fechado'}
                                        </span>
                                    </td>
                                    <td className="actions">
                                        <button
                                            onClick={() => handleView(restaurante.id)}
                                            className="btn-view"
                                        >
                                            Visualizar
                                        </button>
                                        <button
                                            onClick={() => handleEdit(restaurante)}
                                            className="btn-edit"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(restaurante.id)}
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

export default Restaurantes; 