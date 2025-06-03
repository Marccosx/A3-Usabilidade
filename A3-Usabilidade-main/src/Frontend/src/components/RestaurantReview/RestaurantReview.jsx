import React, { useState, useEffect } from 'react';
import './RestaurantReview.css';
import { assets } from '../../assets/assets';
import axios from 'axios';

const RestaurantReview = ({ restauranteId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        nome: '',
        avaliacao: 5,
        comentario: '',
        data: ''
    });
    const [erro, setErro] = useState('');

    useEffect(() => {
        carregarAvaliacoes();
    }, [restauranteId]);

    const carregarAvaliacoes = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/restaurantes/${restauranteId}/avaliacoes`);
            if (response.data.success) {
                setReviews(response.data.data);
                setErro('');
            } else {
                setErro('Erro ao carregar avaliações: ' + response.data.message);
            }
        } catch (error) {
            console.error('Erro ao carregar avaliações:', error);
            setErro('Erro ao carregar avaliações: ' + (error.response?.data?.message || error.message));
            // Usando dados simulados em caso de erro
            setReviews([
                {
                    id: 1,
                    nome: 'João Silva',
                    avaliacao: 5,
                    comentario: 'Comida excelente! Recomendo muito.',
                    data: '2024-03-01'
                },
                {
                    id: 2,
                    nome: 'Maria Santos',
                    avaliacao: 4,
                    comentario: 'Ótimo atendimento, mas demorou um pouco.',
                    data: '2024-03-02'
                }
            ]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
                ...newReview,
                restauranteId,
                data: new Date().toISOString().split('T')[0]
            };

            const response = await axios.post(`http://localhost:3000/restaurantes/${restauranteId}/avaliacoes`, reviewData);
            
            if (response.data.success) {
                await carregarAvaliacoes();
                setNewReview({
                    nome: '',
                    avaliacao: 5,
                    comentario: '',
                    data: ''
                });
                setErro('');
            } else {
                setErro('Erro ao salvar avaliação: ' + response.data.message);
            }
        } catch (error) {
            console.error('Erro ao salvar avaliação:', error);
            setErro('Erro ao salvar avaliação: ' + (error.response?.data?.message || error.message));
            
            // Simulando adição local em caso de erro
            const review = {
                id: reviews.length + 1,
                ...newReview,
                data: new Date().toISOString().split('T')[0]
            };
            setReviews(prev => [...prev, review]);
            setNewReview({
                nome: '',
                avaliacao: 5,
                comentario: '',
                data: ''
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/restaurantes/${restauranteId}/avaliacoes/${id}`);
            if (response.data.success) {
                await carregarAvaliacoes();
                setErro('');
            } else {
                setErro('Erro ao deletar avaliação: ' + response.data.message);
            }
        } catch (error) {
            console.error('Erro ao deletar avaliação:', error);
            setErro('Erro ao deletar avaliação: ' + (error.response?.data?.message || error.message));
            // Simulando deleção local em caso de erro
            setReviews(prev => prev.filter(review => review.id !== id));
        }
    };

    return (
        <div className="restaurant-review">
            <h2>Avaliações</h2>
            
            {erro && (
                <div className="error-message" role="alert">
                    <span>{erro}</span>
                </div>
            )}
            
            {/* Formulário de Nova Avaliação */}
            <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={newReview.nome}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Avaliação:</label>
                    <select
                        name="avaliacao"
                        value={newReview.avaliacao}
                        onChange={handleInputChange}
                    >
                        <option value="5">5 estrelas</option>
                        <option value="4">4 estrelas</option>
                        <option value="3">3 estrelas</option>
                        <option value="2">2 estrelas</option>
                        <option value="1">1 estrela</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Comentário:</label>
                    <textarea
                        name="comentario"
                        value={newReview.comentario}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit">Enviar Avaliação</button>
            </form>

            {/* Lista de Avaliações */}
            <div className="reviews-list">
                {reviews.map(review => (
                    <div key={review.id} className="review-item">
                        <div className="review-header">
                            <h3>{review.nome}</h3>
                            <div className="review-stars">
                                {[...Array(5)].map((_, index) => (
                                    <img
                                        key={index}
                                        src={assets.rating_starts}
                                        alt="estrela"
                                        className={index < review.avaliacao ? 'star-filled' : 'star-empty'}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="review-comment">{review.comentario}</p>
                        <div className="review-footer">
                            <span className="review-date">{review.data}</span>
                            <button 
                                onClick={() => handleDelete(review.id)}
                                className="delete-button"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantReview; 