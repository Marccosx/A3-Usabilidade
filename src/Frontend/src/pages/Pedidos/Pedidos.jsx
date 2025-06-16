import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Pedidos.css';

const Pedidos = () => {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [erro, setErro] = useState('');
    const [editando, setEditando] = useState(null);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [novoPedido, setNovoPedido] = useState({
        clienteNome: '',
        endereco: '',
        itens: [],
        status: 'PENDENTE',
        valorTotal: 0
    });

    // Função para carregar os dados do usuário
    const carregarDadosUsuario = () => {
        const nomeUsuario = localStorage.getItem('userName');
        const idGrupo = localStorage.getItem('idGrupo');
        if (!nomeUsuario) {
            setErro('Você precisa estar logado para ver seus pedidos');
            setUsuarioLogado(null);
            setPedidos([]);
            return;
        }
        setUsuarioLogado(nomeUsuario);
        carregarPedidos(nomeUsuario, idGrupo);
    };

    // Listener para mudanças no localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            carregarDadosUsuario();
        };

        // Adiciona o listener
        window.addEventListener('storage', handleStorageChange);
        
        // Carrega os dados iniciais
        carregarDadosUsuario();

        // Remove o listener quando o componente for desmontado
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const carregarPedidos = async (nomeUsuario, idGrupo) => {
        try {
            const response = await axios.get('http://localhost:3000/pedidos');
            if (response.status === 200) {
                let pedidosFiltrados;
                if (idGrupo === '3') {
                    // Grupo 3 vê apenas seus próprios pedidos
                    pedidosFiltrados = response.data.filter(pedido => pedido.usuario_nome === nomeUsuario);
                } else {
                    // Outros grupos veem todos os pedidos
                    pedidosFiltrados = response.data;
                }
                setPedidos(pedidosFiltrados);
                setErro('');
            } else {
                setErro('Erro ao carregar pedidos: ' + response.data.message);
            }
        } catch (error) {
            setErro('Erro ao carregar pedidos: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editando) {
                response = await axios.put(`http://localhost:3000/pedidos/edit/${editando}`, novoPedido);
            } else {
                response = await axios.post('http://localhost:3000/pedidos/create', novoPedido);
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
            setErro('Erro ao salvar pedido: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
            try {
                const response = await axios.delete(`http://localhost:3000/pedidos/delete/${id}`);
                if (response.status === 204) {
                    carregarPedidos();
                    setErro('');
                } else {
                    setErro('Erro ao deletar pedido: ' + response.data.message);
                }
            } catch (error) {
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
        navigate(`/pedidos/${id}`);
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
                <h1 className="page-title">Meus Pedidos</h1>
                
                {!usuarioLogado ? (
                    <div className="error-message" role="alert">
                        <span>Você precisa estar logado para ver seus pedidos</span>
                    </div>
                ) : erro ? (
                    <div className="error-message" role="alert">
                        <span>{erro}</span>
                    </div>
                ) : pedidos.length === 0 ? (
                    <div className="error-message" role="alert">
                        <span>Você ainda não tem pedidos</span>
                    </div>
                ) : (
                    <div className="pedidos-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Status</th>
                                    <th>Valor Total</th>
                                    <th>Forma de Pagamento</th>
                                    <th>Restaurante</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.map((pedido) => (
                                    <tr key={pedido.id}>
                                        <td>{pedido.usuario_nome}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusColor(pedido.status)}`}>
                                                {formatStatus(pedido.status_pedido_nome)}
                                            </span>
                                        </td>
                                        <td>R$ {pedido.valorTotal.toFixed(2)}</td>
                                        <td>{pedido.forma_pagamento_nome}</td>
                                        <td>{pedido.restaurante_nome}</td>
                                        <td>
                                            <button onClick={() => handleView(pedido.id)} className="btn-view">
                                                Ver Detalhes
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pedidos;