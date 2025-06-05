import React, { useState, useEffect } from 'react';
import './RestaurantReview.css';
import { assets } from '../../assets/assets';
import axios from 'axios';

const RestaurantReview = ({ id_restaurante }) => {
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
    }, [id_restaurante]);

    const carregarAvaliacoes = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/avaliacoes/${id_restaurante}/`);
            if (response.status === 200) {
                setReviews(response.data);
                setErro('');
            } else {
                setErro('Erro ao carregar avaliações: ' + response);
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
                id_restaurante,
                data: new Date().toISOString().split('T')[0]
            };

            const response = await axios.post(`http://localhost:3000/avaliacoes/${id_restaurante}/create`, reviewData);

            if (response.status === 201) {
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
            const response = await axios.delete(`http://localhost:3000/avaliacoes/${id_restaurante}/delete/${id}`);
            if (response.status === 200) {
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     className={index < review.avaliacao ? 'star-filled' : 'star-empty'}>
                                        <path fill="#fbed02" d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z" />
                                    </svg>

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