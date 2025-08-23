// Dentro de src/Components/Admin/AdminBody/ManageHome/ReviewsEditor/ReviewsEditor.js

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ReviewsEditor.css';

const ReviewsEditor = ({ initialData, onSave }) => {
    const [reviews, setReviews] = useState(initialData || []);

    const handleAddItem = () => {
        const newItem = { id: uuidv4(), name: '', comment: '' };
        setReviews([...reviews, newItem]);
    };

    const handleRemoveItem = (id) => {
        setReviews(reviews.filter(item => item.id !== id));
    };

    const handleChange = (id, field, value) => {
        const updatedItems = reviews.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setReviews(updatedItems);
    };

    return (
        <div className="reviews-editor-wrapper">
            <h3 className="editor-title">Gerenciamento de Avaliações</h3>
            <div className="reviews-items-list">
                {reviews.map((item) => (
                    <div className="review-editor-item" key={item.id}>
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                            placeholder="Nome do Cliente"
                            className="review-input name"
                        />
                        <textarea
                            value={item.comment}
                            onChange={(e) => handleChange(item.id, 'comment', e.target.value)}
                            placeholder="Comentário / Depoimento"
                            rows="3"
                            className="review-input comment"
                        />
                        <button onClick={() => handleRemoveItem(item.id)} className="remove-review-btn">
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <div className="editor-actions">
                <button onClick={handleAddItem} className="add-review-btn">Adicionar Avaliação</button>
                <button onClick={() => onSave(reviews)} className="save-btn">
                    Salvar Avaliações
                </button>
            </div>
        </div>
    );
};

export default ReviewsEditor;