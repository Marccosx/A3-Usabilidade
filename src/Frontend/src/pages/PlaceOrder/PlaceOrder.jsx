import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list, clearCart } = useContext(StoreContext);
  const [usuario, setUsuario] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [products, setProducts] = useState([]);
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    bairro: '',
    cep: '',
    complemento: ''
  });
  const [cidades, setCidades] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [estados, setEstados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [pagamento, setPagamento] = useState('pix');
  const [orderValues, setOrderValues] = useState({
    subtotal: 0,
    taxaFrete: 0,
    total: 0
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.orderValues) {
      setOrderValues(location.state.orderValues);
    }
  }, [location]);

  useEffect(() => {
    const fetchUsuario = async () => {
      const id = localStorage.getItem("id");
      if (!id) {
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
        setUsuario(response.data);
      } catch (error) {
      }
    };
    fetchUsuario();
  }, []);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const produtoId = Object.keys(cartItems)[0];
        if (produtoId) {
          const response = await axios.get(`http://localhost:3000/produtos/search/${produtoId}`);
          const restauranteResponse = await axios.get(`http://localhost:3000/restaurantes/${response.data.id_restaurante}`);
          setRestaurant(restauranteResponse.data);
        }
      } catch (error) {
      }
    };
    fetchRestaurant();
  }, [cartItems]);

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
      setCidadeSelecionada('');
      setEndereco({
        rua: '',
        numero: '',
        bairro: '',
        cep: '',
        complemento: ''
      });
    }
  }, [estadoSelecionado]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/produtos/");
        setProducts(response.data);
      } catch (error) {
      }
    };
    fetchProducts();
  }, []);

  // Gera código aleatório grande
  const gerarCodigoPedido = () => {
    return Math.floor(100000000 + Math.random() * 900000000);
  };

  // Envio do pedido
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const produtoId = Object.keys(cartItems)[0];
      if (!produtoId) {
        alert('Carrinho vazio!');
        return;
      }

      const produtoResponse = await axios.get(`http://localhost:3000/produtos/search/${produtoId}`);
      const restaurante_id = produtoResponse.data.id_restaurante;

      // Criar o pedido
      const pedido = {
        codigo: gerarCodigoPedido(),
        subtotal: orderValues.subtotal,
        taxaFrete: orderValues.taxaFrete,
        valorTotal: orderValues.total,
        dataEntrega: null,
        dataCancelamento: null,
        id_usuario: usuario?.id,
        id_restaurante: restaurante_id,
        id_forma_pagamento: pagamento === 'pix' ? 4 : pagamento === 'debito' ? 2 : 1, // 4: PIX, 2: Débito, 1: Crédito
        id_status: 1 // 1: PENDENTE
      };

      const response = await axios.post('http://localhost:3000/pedidos/create', pedido);
      
      if (response.data.id) {
        // Criar os itens do pedido
        const itensPromises = Object.entries(cartItems).map(async ([produtoId, quantidade]) => {
          const produto = products.find(p => p.id === parseInt(produtoId));
          if (produto) {
            const itemPedido = {
              id_pedido: response.data.id,
              id_produto: parseInt(produtoId),
              quantidade: quantidade,
              precoUnitario: produto.preco,
              precoTotal: produto.preco * quantidade,
              obeservacao: ''
            };
            return axios.post('http://localhost:3000/carrinho/create', itemPedido);
          }
        });

        await Promise.all(itensPromises);
        clearCart(); // Limpa o carrinho após criar o pedido com sucesso
        alert('Pedido realizado com sucesso!');
        navigate('/pedidos');
      } else {
        alert('Erro ao realizar pedido: ' + response.data.message);
      }
    } catch (error) {
      alert('Erro ao realizar pedido: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <button className="GoBack" onClick={() => navigate("/cart")}>⬅️ Voltar ao Carrinho</button>
      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <h2 className="title">Informações de Entrega</h2>
          <div className="multi-fields">
            <input type="text" placeholder="Nome" value={usuario?.nome || ""} readOnly />
          </div>
          <input type="email" placeholder="E-mail" value={usuario?.email || ""} readOnly />
          <div className="form-section">
            <div className="form-section-title">Forma de Pagamento</div>
            <div className="form-group">
              <select id="pagamentoSelect" value={pagamento} onChange={e => setPagamento(e.target.value)}>
                <option value="pix">Pix</option>
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
              </select>
            </div>
          </div>
          <div className="form-section endereco-grid">
            <div className="form-section-title" style={{ gridColumn: '1 / -1' }}>Endereço</div>
            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                value={estadoSelecionado}
                onChange={e => setEstadoSelecionado(e.target.value)}
                required
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
                required
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="numero">Número</label>
              <input
                type="number"
                id="numero"
                value={endereco.numero}
                onChange={e => setEndereco({ ...endereco, numero: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bairro">Bairro</label>
              <input
                type="text"
                id="bairro"
                value={endereco.bairro}
                onChange={e => setEndereco({ ...endereco, bairro: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                id="cep"
                value={endereco.cep}
                onChange={e => setEndereco({ ...endereco, cep: e.target.value })}
                required
              />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="complemento">Complemento</label>
              <input
                type="text"
                id="complemento"
                value={endereco.complemento}
                onChange={e => setEndereco({ ...endereco, complemento: e.target.value })}
                placeholder="Apto, Bloco, etc."
                required
              />
            </div>
          </div>
        
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2 className="title">Resumo do Pedido</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>R$ {orderValues.subtotal.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Taxa de Entrega</p>
                <p>R$ {orderValues.taxaFrete.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>R$ {orderValues.total.toFixed(2)}</b>
              </div>
            </div>
            <button type="submit" disabled={orderValues.total === 0}>
              FINALIZAR PEDIDO
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
