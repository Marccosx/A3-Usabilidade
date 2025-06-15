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
    const [idGrupo, setIdGrupo] = useState(localStorage.getItem('idGrupo'));
    const [editando, setEditando] = useState(false);
    const [novoStatus, setNovoStatus] = useState('');

    useEffect(() => {
        carregarPedido();
    }, [id]);

    const carregarPedido = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pedidos/${id}`);
            if (response.status === 200 && response.data.length > 0) {
                // Converter valores numéricos
                const pedidoData = response.data[0];
                pedidoData.subtotal = parseFloat(pedidoData.subtotal) || 0;
                pedidoData.taxaFrete = parseFloat(pedidoData.taxaFrete) || 0;
                pedidoData.valorTotal = parseFloat(pedidoData.valorTotal) || 0;
                
                // Converter valores numéricos dos itens
                if (pedidoData.itens) {
                    pedidoData.itens = pedidoData.itens.map(item => ({
                        ...item,
                        precoUnitario: parseFloat(item.precoUnitario) || 0,
                        precoTotal: parseFloat(item.precoTotal) || 0,
                        quantidade: parseInt(item.quantidade) || 0
                    }));
                }
                
                setPedido(pedidoData);
                setNovoStatus(pedidoData.status_pedido_nome);
                setErro('');
            } else {
                setErro('Pedido não encontrado');
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
            const response = await axios.put(`http://localhost:3000/pedidos/edit/${id}`, {
                ...pedido,
                itens: novosItens,
                valorTotal: novoValorTotal
            });

            if (response.status === 200) {
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
            const response = await axios.put(`http://localhost:3000/pedidos/edit/${id}`, {
                ...pedido,
                itens: novosItens,
                valorTotal: novoValorTotal
            });

            if (response.status === 200) {
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

    const handleCancelarPedido = async () => {
        if (window.confirm('Tem certeza que deseja cancelar este pedido?')) {
            try {
                const pedidoAtualizado = {
                    codigo: pedido.codigo,
                    subtotal: pedido.subtotal,
                    taxaFrete: pedido.taxaFrete,
                    valorTotal: pedido.valorTotal,
                    dataEntrega: pedido.dataEntrega,
                    dataCancelamento: new Date().toISOString(),
                    id_usuario: pedido.id_usuario,
                    id_restaurante: pedido.id_restaurante,
                    id_forma_pagamento: pedido.id_forma_pagamento,
                    id_status: 3 // 3: CANCELADO (conforme definido no seeds.js)
                };

                const response = await axios.put(`http://localhost:3000/pedidos/edit/${id}`, pedidoAtualizado);

                if (response.status === 200) {
                    alert('Pedido cancelado com sucesso!');
                    carregarPedido();
                } else {
                    setErro('Erro ao cancelar pedido: ' + response.data.message);
                }
            } catch (error) {
                console.error('Erro ao cancelar pedido:', error);
                setErro('Erro ao cancelar pedido: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const handleExcluirPedido = async () => {
        if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
            try {
                const response = await axios.delete(`http://localhost:3000/pedidos/delete/${id}`);
                if (response.status === 204) {
                    alert('Pedido excluído com sucesso!');
                    navigate('/pedidos');
                } else {
                    setErro('Erro ao excluir pedido: ' + response.data.message);
                }
            } catch (error) {
                console.error('Erro ao excluir pedido:', error);
                setErro('Erro ao excluir pedido: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const handleEditarStatus = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/pedidos/edit/${id}`, {
                ...pedido,
                id_status: novoStatus === 'PENDENTE' ? 1 : 
                          novoStatus === 'EM_PREPARO' ? 2 :
                          novoStatus === 'CANCELADO' ? 3 :
                          novoStatus === 'SAIU_PARA_ENTREGA' ? 4 :
                          novoStatus === 'ENTREGUE' ?  5 : 0
            });

            if (response.status === 200) {
                alert('Status do pedido atualizado com sucesso!');
                setEditando(false);
                carregarPedido();
            } else {
                setErro('Erro ao atualizar status: ' + response.data.message);
            }
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            setErro('Erro ao atualizar status: ' + (error.response?.data?.message || error.message));
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

    const formatCurrency = (value) => {
        return typeof value === 'number' ? value.toFixed(2) : '0.00';
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
                    {editando ? (
                        <div className="status-edit">
                            <select 
                                value={novoStatus} 
                                onChange={(e) => setNovoStatus(e.target.value)}
                                className="status-select"
                            >
                                <option value="PENDENTE">Pendente</option>
                                <option value="EM_PREPARO">Em Preparo</option>
                                <option value="SAIU_PARA_ENTREGA">Saiu para Entrega</option>
                                <option value="ENTREGUE">Entregue</option>
                                <option value="CANCELADO">Cancelado</option>
                            </select>
                            <button onClick={handleEditarStatus} className="btn-save">Salvar</button>
                            <button onClick={() => setEditando(false)} className="btn-cancel">Cancelar</button>
                        </div>
                    ) : (
                        <span className={`status-badge ${getStatusColor(pedido.status_pedido_nome)}`}>
                            {formatStatus(pedido.status_pedido_nome)}
                        </span>
                    )}
                </div>

                <div className="pedido-info">
                    <div className="info-group">
                        <label>Cliente:</label>
                        <span>{pedido.usuario_nome}</span>
                    </div>
                    <div className="info-group">
                        <label>Restaurante:</label>
                        <span>{pedido.restaurante_nome}</span>
                    </div>
                    <div className="info-group">
                        <label>Forma de Pagamento:</label>
                        <span>{pedido.forma_pagamento_nome}</span>
                    </div>
                    <div className="info-group">
                        <label>Subtotal:</label>
                        <span>R$ {formatCurrency(pedido.subtotal)}</span>
                    </div>
                    <div className="info-group">
                        <label>Taxa de Entrega:</label>
                        <span>R$ {formatCurrency(pedido.taxaFrete)}</span>
                    </div>
                    <div className="info-group">
                        <label>Valor Total:</label>
                        <span className="valor-total">R$ {formatCurrency(pedido.valorTotal)}</span>
                    </div>
                </div>

                <div className="pedido-actions">
                    {idGrupo === '3' && 
                     pedido.status_pedido_nome !== 'CANCELADO' && 
                     pedido.status_pedido_nome !== 'ENTREGUE' && (
                        <button onClick={handleCancelarPedido} className="btn-cancel-order">
                            Cancelar Pedido
                        </button>
                    )}
                    
                    {(idGrupo === '1' || idGrupo === '2') && (
                        <>
                            {pedido.status_pedido_nome !== 'CANCELADO' && 
                             pedido.status_pedido_nome !== 'ENTREGUE' && (
                                <button onClick={handleCancelarPedido} className="btn-cancel-order">
                                    Cancelar Pedido
                                </button>
                            )}
                            <button onClick={() => setEditando(true)} className="btn-edit-status">
                                Editar Status
                            </button>
                            <button onClick={handleExcluirPedido} className="btn-delete">
                                Excluir Pedido
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PedidoDetalhe; 