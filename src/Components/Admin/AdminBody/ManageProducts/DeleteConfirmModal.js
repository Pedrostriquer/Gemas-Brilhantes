// Em src/Components/Admin/AdminBody/ManageProducts/DeleteConfirmModal.js
import React from 'react';
import './DeleteConfirmModal.css';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, productName }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="delete-modal-content">
                <h4>Confirmar Exclusão</h4>
                <p>Tem certeza que deseja excluir o produto "<strong>{productName}</strong>"? Esta ação não pode ser desfeita.</p>
                <div className="modal-actions">
                    <button onClick={onClose} className="btn-cancel">Cancelar</button>
                    <button onClick={onConfirm} className="btn-delete">Confirmar Exclusão</button>
                </div>
            </div>
        </div>
    );
};
export default DeleteConfirmModal;