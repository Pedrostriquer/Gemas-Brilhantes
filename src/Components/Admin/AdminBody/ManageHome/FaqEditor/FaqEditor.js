// Dentro de src/Components/Admin/AdminBody/ManageHome/FaqEditor/FaqEditor.js

import React, { useState, useEffect } from 'react'; // 1. Adicione useEffect
import { v4 as uuidv4 } from 'uuid';
import './FaqEditor.css';

const FaqEditor = ({ initialData, onSave }) => {
    const [faqItems, setFaqItems] = useState(initialData || []);

    // --- A CORREÇÃO ESTÁ AQUI ---
    // 2. Adicione este useEffect para sincronizar o estado com as props
    useEffect(() => {
        // Se a prop initialData mudar (por exemplo, quando os dados do Firestore chegarem),
        // atualiza o estado interno do componente.
        setFaqItems(initialData || []);
    }, [initialData]); // Este efeito roda sempre que 'initialData' muda

    const handleAddItem = () => {
        const newItem = { id: uuidv4(), question: '', answer: '' };
        setFaqItems([...faqItems, newItem]);
    };

    const handleRemoveItem = (id) => {
        setFaqItems(faqItems.filter(item => item.id !== id));
    };

    const handleChange = (id, field, value) => {
        const updatedItems = faqItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setFaqItems(updatedItems);
    };

    return (
        <div className="faq-editor-wrapper">
            <h3 className="editor-title">Gerenciamento do FAQ (Perguntas Frequentes)</h3>
            <div className="faq-items-list">
                {faqItems.map((item) => (
                    <div className="faq-editor-item" key={item.id}>
                        <input
                            type="text"
                            value={item.question}
                            onChange={(e) => handleChange(item.id, 'question', e.target.value)}
                            placeholder="Pergunta"
                            className="faq-input question"
                        />
                        <textarea
                            value={item.answer}
                            onChange={(e) => handleChange(item.id, 'answer', e.target.value)}
                            placeholder="Resposta"
                            rows="3"
                            className="faq-input answer"
                        />
                        <button onClick={() => handleRemoveItem(item.id)} className="remove-faq-btn">
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <div className="editor-actions">
                <button onClick={handleAddItem} className="add-faq-btn">Adicionar Pergunta</button>
                <button onClick={() => onSave(faqItems)} className="save-btn">
                    Salvar FAQ
                </button>
            </div>
        </div>
    );
};

export default FaqEditor;