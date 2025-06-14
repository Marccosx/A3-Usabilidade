import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Restaurantes.css';

const Restaurantes = () => {
    const navigate = useNavigate();
    const [estados, setEstados] = useState([]); // array de estados
    const [estadoSelecionado, setEstadoSelecionado] = useState(''); // id do estado selecionado
    const [idEndereco, setIdEndereco] = useState(null);
    const [idCidade, setIdCidade] = useState(null);
    const [restaurantes, setRestaurantes] = useState([]);
    const [novoRestaurante, setNovoRestaurante] = useState({
        nome: '',
        taxaFrete: 0,
        ativo: true,
        aberto: true,
        foto: ''
    });
    const [editando, setEditando] = useState(null);
    const [erro, setErro] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [endereco, setEndereco] = useState({
        rua: '',
        numero: '',
        bairro: '',
        cep: '',
        complemento: ''
    });
    const [cidades, setCidades] = useState([]);
    const [cidadeSelecionada, setCidadeSelecionada] = useState('');
    const [mensagem, setMensagem] = useState('');

    
    useEffect(() => {
        carregarRestaurantes();
    }, []);
    
    useEffect(() => {
        axios.get('http://localhost:3000/estados')
            .then(res => setEstados(res.data))
            .catch(() => setEstados([]));
    }, []);

    useEffect(() => {
        if (estadoSelecionado) {
            axios.get(`http://localhost:3000/cidades/estado/${estadoSelecionado}`)
                .then(res => setCidades(res.data))
                .catch(() => setCidades([]));
        } else {
            setCidades([]);
            
        }
    }, [estadoSelecionado]);

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
            // Log dos dados do endereço
            console.log('Enviando para /enderecos/create:', {
                ...endereco,
                id_cidade: cidadeSelecionada
            });

            // 1. Cria endereço
            const enderecoRes = await axios.post('http://localhost:3000/enderecos/create', {
                ...endereco,
                id_cidade: cidadeSelecionada
            });
            const idEndereco = enderecoRes.data.id;

            // Log do id do endereço criado
            console.log('ID do endereço criado:', idEndereco);

            // Log dos dados do restaurante
            const restauranteData = {
                ...novoRestaurante,
                id_endereco: idEndereco
            };
            console.log('Enviando para /restaurantes/create:', restauranteData);

            // 2. Cria restaurante
            let response;
            if (editando) {
                response = await axios.put(`http://localhost:3000/restaurantes/edit/${editando}`, restauranteData);
                setMensagem('Restaurante atualizado com sucesso!');
            } else {
                response = await axios.post('http://localhost:3000/restaurantes/create/', restauranteData);
                setMensagem('Restaurante cadastrado com sucesso!');
            }

            carregarRestaurantes();
            setNovoRestaurante({
                nome: '',
                taxaFrete: 0,
                ativo: true,
                aberto: true,
                foto: ''
            });
            setEndereco({
                rua: '',
                numero: '',
                bairro: '',
                cep: '',
                complemento: ''
            });
            setIdEndereco(null);
            setIdCidade(null);
            setCidadeSelecionada('');
            setPreviewImage(null);
            setEditando(null);
            setErro('');
        } catch (error) {
            setErro('Erro ao salvar restaurante: ' + (error.response?.data?.message || error.message));
            // Log do erro detalhado
            console.error('Erro detalhado:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este restaurante?')) {
            try {
                const response = await axios.delete(`http://localhost:3000/restaurantes/delete/${id}`);
                if (response.status === 200) {
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

    const handleEdit = async (restaurante) => {
        setNovoRestaurante({
            nome: restaurante.nome,
            taxaFrete: restaurante.taxaFrete,
            ativo: restaurante.ativo,
            aberto: restaurante.aberto,
            foto: restaurante.foto,
            id_endereco: restaurante.id_endereco,
        });
        setPreviewImage(restaurante.foto);
        setEditando(restaurante.id);
        setErro('');

        // Buscar endereço pelo id_endereco
        try {
            const enderecoRes = await axios.get(`http://localhost:3000/enderecos/search/${restaurante.id_endereco}`);
            const enderecoData = enderecoRes.data;
            setEndereco({
                rua: enderecoData.rua,
                numero: enderecoData.numero,
                bairro: enderecoData.bairro,
                cep: enderecoData.cep,
                complemento: enderecoData.complemento || ''
            });
            setCidadeSelecionada(enderecoData.id_cidade);

            // Buscar cidade para saber o estado e selecionar o estado correto
            const cidadeRes = await axios.get(`http://localhost:3000/cidades/search/${enderecoData.id_cidade}`);
            const cidadeData = cidadeRes.data;
            setEstadoSelecionado(cidadeData.id_estado);
        } catch (error) {
            setErro('Erro ao carregar endereço do restaurante.');
            console.error(error);
        }
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
                setNovoRestaurante({ ...novoRestaurante, foto: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (mensagem) {
            const timer = setTimeout(() => setMensagem(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [mensagem]);

    return (
        <div className="restaurantes-container">
            <div className="content-wrapper">
                <h1 className="page-title">Gerenciar Restaurantes</h1>

                {erro && (
                    <div className="error-message" role="alert">
                        <span>{erro}</span>
                    </div>
                )}
                {mensagem && (
                    <div className="success-message" role="alert">
                        <span>{mensagem}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="restaurant-form">

                    {/* Bloco Restaurante */}
                    <div className="form-section">
                        <div className="form-section-title">Dados do Restaurante</div>
                        <div className="form-group">
                            <div className="foto-perfil-container">
                                <label htmlFor="foto" className="foto-perfil-label">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" className="foto-perfil-preview" />
                                    ) : (
                                        <div className="foto-perfil-placeholder">
                                            <span>Clique para adicionar foto</span>
                                        </div>
                                    )}
                                </label>
                                <input
                                    id="foto"
                                    name="foto"
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
                                onChange={(e) => setNovoRestaurante({ ...novoRestaurante, nome: e.target.value })}
                                required={!editando}
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
                                onChange={(e) => setNovoRestaurante({ ...novoRestaurante, taxaFrete: parseFloat(e.target.value) })}
                                required={!editando}
                            />
                        </div>
                        <div className="form-group">
                            <div className="toggle-container">
                                <label className="toggle-label">Aberto para Pedidos</label>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={novoRestaurante.aberto}
                                        onChange={(e) => setNovoRestaurante({ ...novoRestaurante, aberto: e.target.checked })}
                                       
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="toggle-container">
                                <label className="toggle-label">Restaurante Ativo</label>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={novoRestaurante.ativo}
                                        onChange={(e) => setNovoRestaurante({ ...novoRestaurante, ativo: e.target.checked })}
                                       
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Bloco Endereço */}
                    <div className="form-section endereco-grid">
                        <div className="form-section-title" style={{gridColumn: '1 / -1'}}>Endereço</div>
                        <div className="form-group">
                            <label htmlFor="estado">Estado</label>
                            <select
                                id="estado"
                                value={estadoSelecionado}
                                onChange={e => setEstadoSelecionado(e.target.value)}
                                required={!editando}
                                className="form-control"
                                
                            >
                                <option value="">Selecione o Estado</option>
                                {estados.map(estado => (
                                    <option key={estado.id} value={estado.id}>
                                        {estado.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cidade">Cidade</label>
                            <select
                                id="cidade"
                                value={cidadeSelecionada}
                                onChange={e => setCidadeSelecionada(e.target.value)}
                                required={!editando}
                                className="form-control"
                                disabled={!estadoSelecionado}
                            >
                                <option value="">Selecione a Cidade</option>
                                {cidades.map(cidade => (
                                    <option key={cidade.id} value={cidade.id}>
                                        {cidade.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rua">Logradouro</label>
                            <input
                                type="text"
                                id="rua"
                                value={endereco.rua}
                                onChange={e => setEndereco({ ...endereco, rua: e.target.value })}
                                required={!editando}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numero">Número</label>
                            <input
                                type="number"
                                id="numero"
                                value={endereco.numero}
                                onChange={e => setEndereco({ ...endereco, numero: e.target.value })}
                                required={!editando}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bairro">Bairro</label>
                            <input
                                type="text"
                                id="bairro"
                                value={endereco.bairro}
                                onChange={e => setEndereco({ ...endereco, bairro: e.target.value })}
                                required={!editando}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cep">CEP</label>
                            <input
                                type="text"
                                id="cep"
                                value={endereco.cep}
                                onChange={e => setEndereco({ ...endereco, cep: e.target.value })}
                                required={!editando}
                            />
                        </div>
                        <div className="form-group" style={{gridColumn: '1 / -1'}}>
                            <label htmlFor="complemento">Complemento</label>
                            <input
                                type="text"
                                id="complemento"
                                value={endereco.complemento}
                                onChange={e => setEndereco({ ...endereco, complemento: e.target.value })}
                                placeholder="Apto, Bloco, etc."
                                required={!editando}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
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
                                        foto: ''
                                    });
                                    setPreviewImage(null);
                                    setErro('');
                                    setEndereco({
                                        rua: '',
                                        numero: '',
                                        bairro: '',
                                        cep: '',
                                        complemento: ''
                                    });
                                    setCidadeSelecionada('');
                                    setEstadoSelecionado('');
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
                                <th>Ativo</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restaurantes.map((restaurante) => (
                                <tr key={restaurante.id}>
                                    <td>
                                        <div className="restaurant-photo">
                                            {restaurante.foto ? (
                                                <img
                                                    src={restaurante.foto}
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
                                    <td>
                                        <span className={`status-badge ${restaurante.ativo ? 'status-open' : 'status-closed'}`}>
                                            {restaurante.ativo ? 'Ativo' : 'Desativado'}
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