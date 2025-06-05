import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PedidoDetalhe.css';

const PedidoDetalhe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pedido, setPedido] = useState(null);
    const [novoItem, setNovoItem] = useState({
        nome: '',
        quantidade: 1,
        preco: 0
    });
    const [erro, setErro] = useState('');

    useEffect(() => {
        carregarPedido();
    }, [id]);

    const carregarPedido = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pedidos/${id}`);
            if (response.data.success) {
                setPedido(response.data.data);
                setErro('');
            } else {
                setErro('Erro ao carregar pedido: ' + response.data.message);
            }
        } catch (error) {
            console.error('Erro ao carregar pedido:', error);
            setErro('Erro ao carregar pedido: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!pedido) return;

        const novosItens = [...pedido.itens, novoItem];
        const novoValorTotal = novosItens.reduce((total, item) => total + (item.preco * item.quantidade), 0);

        try {
            const response = await axios.put(`http://localhost:3000/pedidos/${id}`, {
                ...pedido,
                itens: novosItens,
                valorTotal: novoValorTotal
            });

            if (response.data.success) {
                setPedido(response.data.data);
                setNovoItem({
                    nome: '',
                    quantidade: 1,
                    preco: 0
                });
                setErro('');
            } else {
                setErro('Erro ao adicionar item: ' + response.data.message);
            }
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            setErro('Erro ao adicionar item: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleRemoveItem = async (index) => {
        if (!pedido) return;

        const novosItens = pedido.itens.filter((_, i) => i !== index);
        const novoValorTotal = novosItens.reduce((total, item) => total + (item.preco * item.quantidade), 0);

        try {
            const response = await axios.put(`http://localhost:3000/pedidos/${id}`, {
                ...pedido,
                itens: novosItens,
                valorTotal: novoValorTotal
            });

            if (response.data.success) {
                setPedido(response.data.data);
                setErro('');
            } else {
                setErro('Erro ao remover item: ' + response.data.message);
            }
        } catch (error) {
            console.error('Erro ao remover item:', error);
            setErro('Erro ao remover item: ' + (error.response?.data?.message || error.message));
        }
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

    if (erro) {
        return (
            <div className="error-message" role="alert">
                <span>{erro}</span>
            </div>
        );
    }

    if (!pedido) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="pedido-detalhe-container">
            <div className="content-wrapper">
                <div className="header-actions">
                    <button onClick={() => navigate('/pedidos')} className="btn-back">
                        Voltar para Pedidos
                    </button>
                </div>

                <div className="pedido-header">
                    <h1>Detalhes do Pedido #{pedido.id}</h1>
                    <span className={`status-badge ${getStatusColor(pedido.status)}`}>
                        {formatStatus(pedido.status)}
                    </span>
                </div>

                <div className="pedido-info">
                    <div className="info-group">
                        <label>Cliente:</label>
                        <span>{pedido.clienteNome}</span>
                    </div>
                    <div className="info-group">
                        <label>Endereço:</label>
                        <span>{pedido.endereco}</span>
                    </div>
                    <div className="info-group">
                        <label>Valor Total:</label>
                        <span className="valor-total">R$ {pedido.valorTotal.toFixed(2)}</span>
                    </div>
                </div>

                <div className="itens-section">
                    <h2>Itens do Pedido</h2>
                    
                    <form onSubmit={handleAddItem} className="add-item-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="nome">Item</label>
                                <input
                                    id="nome"
                                    type="text"
                                    value={novoItem.nome}
                                    onChange={(e) => setNovoItem({...novoItem, nome: e.target.value})}
                                    placeholder="Nome do item"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantidade">Quantidade</label>
                                <input
                                    id="quantidade"
                                    type="number"
                                    min="1"
                                    value={novoItem.quantidade}
                                    onChange={(e) => setNovoItem({...novoItem, quantidade: parseInt(e.target.value)})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="preco">Preço Unitário</label>
                                <input
                                    id="preco"
                                    type="number"
                                    step="0.01"
                                    value={novoItem.preco}
                                    onChange={(e) => setNovoItem({...novoItem, preco: parseFloat(e.target.value)})}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-add">Adicionar Item</button>
                        </div>
                    </form>

                    <table className="itens-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantidade</th>
                                <th>Preço Unitário</th>
                                <th>Subtotal</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedido.itens.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nome}</td>
                                    <td>{item.quantidade}</td>
                                    <td>R$ {item.preco.toFixed(2)}</td>
                                    <td>R$ {(item.quantidade * item.preco).toFixed(2)}</td>
                                    <td>
                                        <button
                                            onClick={() => handleRemoveItem(index)}
                                            className="btn-remove"
                                        >
                                            Remover
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

export default PedidoDetalhe; 