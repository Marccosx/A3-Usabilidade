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
            if (response.status === 200) {
                setRestaurante(response.data);
                setErro('');
            } else {
                setErro('Restaurante não encontrado', response);
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
            if (response.status === 200) {
                setCardapio(response.data || []);
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
                    <a className="btn-voltar" onClick={() => navigate(`/restaurantes`)}> <svg xmlns="http://www.w3.org/2000/svg" 
                    width={24} 
                    height={24} viewBox="0 0 24 24">
                        <path fill="#f30707" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path>
                    </svg>voltar </a>
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
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z" />
                    </svg>
                    Produtos
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
                            {cardapio.map(item => {
                                // Parse da imagem salva como JSON
                                let imagemSrc = assets.default_food;
                                if (item.foto_produto) {
                                    try {
                                        const imgObj = JSON.parse(item.foto_produto);
                                        imagemSrc = imgObj.caminho || assets.default_food;
                                    } catch {
                                        imagemSrc = item.foto_produto || assets.default_food;
                                    }
                                }
                                return (
                                    <div key={item.id} className="menu-item">
                                        <div className="menu-item-img-container">
                                            <img
                                                src={imagemSrc}
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
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24"
                                                    viewBox="0 0 24 24">
                                                    <path fill="#fbed02"
                                                        d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775
                                                     10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 
                                                     4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675
                                                      3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z" />
                                                </svg>
                                            </div>
                                            <p className="menu-item-desc">{item.descricao}</p>
                                            <p className="menu-item-price">
                                                R$ {typeof item.preco === 'number' ? item.preco.toFixed(2) : '0.00'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                <section className="reviews-section">
                    <RestaurantReview id_restaurante={id} />
                </section>
            </div>
        </div>
    );
};

export default RestauranteDetalhe;