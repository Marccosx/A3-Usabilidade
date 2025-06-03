import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RestaurantReview from '../../components/RestaurantReview/RestaurantReview';
import './RestauranteDetalhe.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const RestauranteDetalhe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
    const [restaurante, setRestaurante] = useState(null);
    const [cardapio, setCardapio] = useState([]);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(true);

    const carregarRestaurante = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/restaurantes/${id}`);
            if (response.data.success) {
                setRestaurante(response.data.data);
                setErro('');
            } else {
                setErro('Restaurante não encontrado');
            }
        } catch (error) {
            console.error('Erro ao carregar restaurante:', error);
            setErro('Erro ao carregar restaurante. Por favor, tente novamente mais tarde.');
        } finally {
            setCarregando(false);
        }
    };

    const carregarProdutos = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/produtos/restaurante/${id}`);
            if (response.data.success) {
                setCardapio(response.data.data || []);
                setErro('');
            } else {
                console.error('Erro ao carregar produtos:', response.data.message);
                setErro('Erro ao carregar produtos. Por favor, tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            setErro('Erro ao carregar produtos. Por favor, tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        const inicializar = async () => {
            setCarregando(true);
            await carregarRestaurante();
            await carregarProdutos();
            setCarregando(false);
        };
        
        inicializar();
    }, [id]);

    if (carregando) {
        return <div className="loading">Carregando...</div>;
    }

    if (erro) {
        return (
            <div className="error-message" role="alert">
                <span>{erro}</span>
                <button onClick={() => window.location.reload()} className="retry-button">
                    Tentar novamente
                </button>
            </div>
        );
    }

    if (!restaurante) {
        return <div className="error-message">Restaurante não encontrado</div>;
    }

    return (
        <div className="restaurante-detalhe">
            <div className="restaurante-header">
                <div className="header-content">
                    <h1>{restaurante.nome}</h1>
                    <div className="restaurante-info">
                        <span className={`status-badge ${restaurante.aberto ? 'status-open' : 'status-closed'}`}>
                            {restaurante.aberto ? 'Aberto' : 'Fechado'}
                        </span>
                        <span className="taxa-entrega">
                            Taxa de Entrega: R$ {restaurante.taxaFrete?.toFixed(2) || '0.00'}
                        </span>
                    </div>
                </div>
                <button 
                    className="btn-gerenciar-produtos"
                    onClick={() => navigate(`/restaurante/${id}/produtos`)}
                >
                    Gerenciar Produtos
                </button>
            </div>

            <div className="restaurante-content">
                <section className="menu-section">
                    <h2>Cardápio</h2>
                    {cardapio.length === 0 ? (
                        <div className="no-products">
                            Nenhum produto cadastrado para este restaurante.
                        </div>
                    ) : (
                        <div className="menu-grid">
                            {cardapio.map(item => (
                                <div key={item.id} className="menu-item">
                                    <div className="menu-item-img-container">
                                        <img 
                                            src={item.imagem || assets.default_food} 
                                            alt={item.nome} 
                                            className="menu-item-img"
                                            onError={(e) => {
                                                e.target.src = assets.default_food;
                                            }}
                                        />
                                        {!cartItems[item.id] ? (
                                            <img
                                                src={assets.add_icon_white}
                                                alt="add_icon_white"
                                                className="add"
                                                onClick={() => addToCart(item.id)}
                                            />
                                        ) : (
                                            <div className="food-item-counter">
                                                <img
                                                    src={assets.remove_icon_red}
                                                    alt="remove_icon_red"
                                                    onClick={() => removeFromCart(item.id)}
                                                />
                                                <p>{cartItems[item.id]}</p>
                                                <img
                                                    src={assets.add_icon_green}
                                                    alt="add_icon_green"
                                                    onClick={() => addToCart(item.id)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="menu-item-info">
                                        <div className="menu-item-name-rating">
                                            <h3>{item.nome}</h3>
                                            <img src={assets.rating_starts} alt="rating_starts" />
                                        </div>
                                        <p className="menu-item-desc">{item.descricao}</p>
                                        <p className="menu-item-price">
                                            R$ {typeof item.preco === 'number' ? item.preco.toFixed(2) : '0.00'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="reviews-section">
                    <RestaurantReview restauranteId={id} />
                </section>
            </div>
        </div>
    );
};

export default RestauranteDetalhe; 