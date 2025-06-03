import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Pedidos.css';

const Pedidos = () => {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [erro, setErro] = useState('');
    const [editando, setEditando] = useState(null);
    const [novoPedido, setNovoPedido] = useState({
        clienteNome: '',
        endereco: '',
        itens: [],
        status: 'PENDENTE',
        valorTotal: 0
    });

    useEffect(() => {
        carregarPedidos();
    }, []);

    const carregarPedidos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/pedidos');
            if (response.data.success) {
                setPedidos(response.data.data);
                setErro('');
            } else {
                setErro('Erro ao carregar pedidos: ' + response.data.message);
            }
        } catch (error) {
            console.error('Erro ao carregar pedidos:', error);
            setErro('Erro ao carregar pedidos: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editando) {
                response = await axios.put(`http://localhost:3000/pedidos/${editando}`, novoPedido);
            } else {
                response = await axios.post('http://localhost:3000/pedidos', novoPedido);
            }

            if (response.data.success) {
                setNovoPedido({
                    clienteNome: '',
                    endereco: '',
                    itens: [],
                    status: 'PENDENTE',
                    valorTotal: 0
                });
                setEditando(null);
                setErro('');
                carregarPedidos();
            } else {
                setErro('Erro ao salvar pedido: ' + response.data.message);
            }
        } catch (error) {
            console.error('Erro ao salvar pedido:', error);
            setErro('Erro ao salvar pedido: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
            try {
                const response = await axios.delete(`http://localhost:3000/pedidos/${id}`);
                if (response.data.success) {
                    carregarPedidos();
                    setErro('');
                } else {
                    setErro('Erro ao deletar pedido: ' + response.data.message);
                }
            } catch (error) {
                console.error('Erro ao deletar pedido:', error);
                setErro('Erro ao deletar pedido: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const handleEdit = (pedido) => {
        setNovoPedido({
            clienteNome: pedido.clienteNome,
            endereco: pedido.endereco,
            itens: pedido.itens,
            status: pedido.status,
            valorTotal: pedido.valorTotal
        });
        setEditando(pedido.id);
        setErro('');
    };

    const handleView = (id) => {
        navigate(`/pedido/${id}`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDENTE':
                return 'status-pending';
            case 'EM_PREPARO':
                return 'status-preparing';
            case 'SAIU_PARA_ENTREGA':
                return 'status-delivering';
            case 'ENTREGUE':
                return 'status-delivered';
            case 'CANCELADO':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    const formatStatus = (status) => {
        switch (status) {
            case 'PENDENTE':
                return 'Pendente';
            case 'EM_PREPARO':
                return 'Em Preparo';
            case 'SAIU_PARA_ENTREGA':
                return 'Saiu para Entrega';
            case 'ENTREGUE':
                return 'Entregue';
            case 'CANCELADO':
                return 'Cancelado';
            default:
                return status;
        }
    };

    return (
        <div className="pedidos-container">
            <div className="content-wrapper">
                <h1 className="page-title">Gerenciar Pedidos</h1>
                
                {erro && (
                    <div className="error-message" role="alert">
                        <span>{erro}</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="pedido-form">
                    <h2 className="form-title">
                        {editando ? 'Editar Pedido' : 'Adicionar Novo Pedido'}
                    </h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="clienteNome">Nome do Cliente</label>
                            <input
                                id="clienteNome"
                                type="text"
                                placeholder="Nome do Cliente"
                                value={novoPedido.clienteNome}
                                onChange={(e) => setNovoPedido({...novoPedido, clienteNome: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endereco">Endereço</label>
                            <input
                                id="endereco"
                                type="text"
                                placeholder="Endereço de Entrega"
                                value={novoPedido.endereco}
                                onChange={(e) => setNovoPedido({...novoPedido, endereco: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                value={novoPedido.status}
                                onChange={(e) => setNovoPedido({...novoPedido, status: e.target.value})}
                                required
                            >
                                <option value="PENDENTE">Pendente</option>
                                <option value="EM_PREPARO">Em Preparo</option>
                                <option value="SAIU_PARA_ENTREGA">Saiu para Entrega</option>
                                <option value="ENTREGUE">Entregue</option>
                                <option value="CANCELADO">Cancelado</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="valorTotal">Valor Total</label>
                            <input
                                id="valorTotal"
                                type="number"
                                step="0.01"
                                placeholder="Valor Total"
                                value={novoPedido.valorTotal}
                                onChange={(e) => setNovoPedido({...novoPedido, valorTotal: parseFloat(e.target.value)})}
                                required
                            />
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
                                    setNovoPedido({
                                        clienteNome: '',
                                        endereco: '',
                                        itens: [],
                                        status: 'PENDENTE',
                                        valorTotal: 0
                                    });
                                    setErro('');
                                }}
                                className="btn-secondary"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>

                <div className="pedidos-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Endereço</th>
                                <th>Status</th>
                                <th>Valor Total</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map((pedido) => (
                                <tr key={pedido.id}>
                                    <td>{pedido.clienteNome}</td>
                                    <td>{pedido.endereco}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusColor(pedido.status)}`}>
                                            {formatStatus(pedido.status)}
                                        </span>
                                    </td>
                                    <td>R$ {pedido.valorTotal.toFixed(2)}</td>
                                    <td className="actions">
                                        <button
                                            onClick={() => handleView(pedido.id)}
                                            className="btn-view"
                                        >
                                            Visualizar
                                        </button>
                                        <button
                                            onClick={() => handleEdit(pedido)}
                                            className="btn-edit"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pedido.id)}
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

export default Pedidos; 