// Dentro de src/Components/Admin/AdminBody/ManageProducts/ProductList.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../../../../firebase/config';
import { ref, deleteObject } from 'firebase/storage';
import ProductFormModal from './ProductFormModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import Pagination from './Pagination';
// O ProductList pode reutilizar o CSS do ManageProducts, então não precisamos de um CSS novo.
import './ManageProducts.css'; 

const ProductList = () => {
    // Estados dos dados
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados de controle da UI e Filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8; // Menos itens por página para uma UI mais limpa

    // Estados para controle dos Modais
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null); // Para editar ou excluir

    // Lógica para determinar o tipo de produto com base na URL
    const location = useLocation();
    const productType = location.pathname.includes('/gemas') ? 'gema' : 'joia';

    // Efeito para buscar TODOS os produtos do Firestore
    useEffect(() => {
        setLoading(true);
        const productsRef = collection(db, 'products');
        const unsubscribe = onSnapshot(productsRef, (snapshot) => {
            const productsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setAllProducts(productsData);
            setLoading(false);
        }, (error) => {
            console.error("Erro ao buscar produtos:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Funções de manipulação dos Modais
    const handleOpenAddModal = () => { setCurrentProduct(null); setIsFormModalOpen(true); };
    const handleOpenEditModal = (product) => { setCurrentProduct(product); setIsFormModalOpen(true); };
    const handleOpenDeleteModal = (product) => { setCurrentProduct(product); setIsDeleteModalOpen(true); };
    const handleCloseModals = () => { setIsFormModalOpen(false); setIsDeleteModalOpen(false); setCurrentProduct(null); };

    // Função para deletar um produto (do Firestore e Storage)
    const handleDeleteProduct = async () => {
        if (currentProduct) {
            try {
                if (currentProduct.media && currentProduct.media.length > 0) {
                    const deletePromises = currentProduct.media.map(item => {
                        const fileRef = ref(storage, item.url);
                        return deleteObject(fileRef).catch(err => console.log("Mídia não encontrada (pode já ter sido deletada):", err.code));
                    });
                    await Promise.all(deletePromises);
                }
                await deleteDoc(doc(db, 'products', currentProduct.id));
            } catch (error) {
                console.error("Erro ao deletar produto:", error);
                alert("Falha ao deletar o produto.");
            } finally {
                handleCloseModals();
            }
        }
    };

    // Lógica de filtragem e busca
    const filteredProducts = allProducts
        .filter(p => p.type === productType)
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Lógica de paginação
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItemsOnPage = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) {
        return <p>Carregando lista de produtos...</p>;
    }

    return (
        // Usamos um React Fragment pois o container principal já está em ManageProducts.js
        <>
            <ProductFormModal 
                isOpen={isFormModalOpen} 
                onClose={handleCloseModals} 
                productToEdit={currentProduct} 
            />
            <DeleteConfirmModal 
                isOpen={isDeleteModalOpen} 
                onClose={handleCloseModals} 
                onConfirm={handleDeleteProduct} 
                productName={currentProduct?.name} 
            />

            <div className="list-controls">
                 <div className="search-bar-wrapper">
                    <i className="fas fa-search"></i>
                    <input 
                        type="text" 
                        placeholder={`Buscar por nome da ${productType === 'gema' ? 'gema' : 'joia'}...`}
                        value={searchTerm}
                        onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <button className="add-product-btn" onClick={handleOpenAddModal}>
                    <i className="fas fa-plus"></i> Adicionar {productType === 'gema' ? 'Gema' : 'Joia'}
                </button>
            </div>
            
            <div className="table-wrapper">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Imagem Principal</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItemsOnPage.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img 
                                        src={product.media?.[0]?.url || 'https://via.placeholder.com/50'} 
                                        alt={product.name} 
                                        className="product-table-img" 
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</td>
                                <td>
                                    <button className="action-btn edit" onClick={() => handleOpenEditModal(product)}>Editar</button>
                                    <button className="action-btn delete" onClick={() => handleOpenDeleteModal(product)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
             {filteredProducts.length > 0 ? (
                <Pagination 
                    itemsPerPage={ITEMS_PER_PAGE}
                    totalItems={filteredProducts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
             ) : (
                <p className="no-products-message">Nenhum produto encontrado.</p>
             )}
        </>
    );
};

export default ProductList;