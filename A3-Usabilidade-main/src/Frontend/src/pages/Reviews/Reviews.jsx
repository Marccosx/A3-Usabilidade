import React from 'react';
import RestaurantReview from '../../components/RestaurantReview/RestaurantReview';
import './Reviews.css';

const Reviews = () => {
    return (
        <div className="reviews-page">
            <div className="reviews-container">
                <RestaurantReview />
            </div>
        </div>
    );
};

export default Reviews; 