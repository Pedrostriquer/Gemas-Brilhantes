import React, { useState, useEffect } from 'react';
import { db, storage } from '../../../../firebase/config';
import { collection, query, where, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MediaUploader from './MediaUploader';
import './ProductFormModal.css';

const ProductFormModal = ({ isOpen, onClose, productToEdit }) => {
    const [productType, setProductType] = useState('gema');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [attributes, setAttributes] = useState({});
    const [media, setMedia] = useState([]);
    const [attributeGroups, setAttributeGroups] = useState([]);
    const [attributeValues, setAttributeValues] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingAttributes, setIsLoadingAttributes] = useState(true);

    useEffect(() => {
        const fetchAttributes = async () => {
            if (!productType) return;
            setIsLoadingAttributes(true);
            const q = query(collection(db, 'attributes'), where('appliesTo', '==', productType));
            const groupsSnapshot = await getDocs(q);
            const groupsData = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAttributeGroups(groupsData);

            const valuesMap = {};
            for (const group of groupsData) {
                const valuesSnapshot = await getDocs(collection(db, 'attributes', group.id, 'values'));
                valuesMap[group.id] = valuesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
            setAttributeValues(valuesMap);
            setIsLoadingAttributes(false);
        };
        if (isOpen) {
            fetchAttributes();
        }
    }, [productType, isOpen]);
    
    useEffect(() => {
        if (isOpen) {
            if (productToEdit) {
                setName(productToEdit.name || '');
                setPrice(productToEdit.price || '');
                setDescription(productToEdit.description || '');
                setProductType(productToEdit.type || 'gema');
                setAttributes(productToEdit.attributes || {});
                const initialMedia = (productToEdit.media || []).map((item, index) => ({ id: `db-${index}-${item.url}`, url: item.url, type: item.type }));
                setMedia(initialMedia);
            } else {
                setName(''); setPrice(''); setDescription(''); setProductType('gema'); setAttributes({}); setMedia([]);
            }
        }
    }, [productToEdit, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const finalMediaData = await Promise.all(
                media.map(async (item) => {
                    if (item.file) {
                        const fileRef = ref(storage, `products/${Date.now()}_${item.file.name}`);
                        const snapshot = await uploadBytes(fileRef, item.file);
                        const url = await getDownloadURL(snapshot.ref);
                        return { url, type: item.type };
                    }
                    return { url: item.url, type: item.type };
                })
            );
            const productData = { name, price: Number(price), description, type: productType, attributes, media: finalMediaData };
            
            if (productToEdit) {
                await setDoc(doc(db, 'products', productToEdit.id), productData);
            } else {
                await addDoc(collection(db, 'products'), productData);
            }
            onClose();
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            alert("Falha ao salvar o produto.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay blurred">
            <div className="modal-content large">
                <div className="modal-header">
                    <h2 className="modal-title fonte-principal">{productToEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
                    <button onClick={onClose} className="close-modal-btn">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-grid">
                        <div className="form-column">
                            <div className="form-group">
                                <label>Nome do Produto</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Preço (R$)</label>
                                <input type="number" value={price} onChange={e => setPrice(e.target.value)} step="0.01" required />
                            </div>
                            <div className="form-group">
                                <label>Descrição</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} rows="8" required />
                            </div>
                        </div>
                        <div className="form-column">
                            <div className="form-group">
                                <label>Tipo de Produto</label>
                                <select value={productType} onChange={(e) => { setProductType(e.target.value); setAttributes({}); }}>
                                    <option value="gema">Gema</option>
                                    <option value="joia">Joia</option>
                                </select>
                            </div>
                            {isLoadingAttributes ? <p>Carregando...</p> : attributeGroups.map(group => (
                                <div className="form-group" key={group.id}>
                                    <label>{group.name}</label>
                                    <select value={attributes[group.id] || ''} onChange={(e) => setAttributes(prev => ({ ...prev, [group.id]: e.target.value }))}>
                                        <option value="">Selecione...</option>
                                        {attributeValues[group.id]?.map(val => (
                                            <option key={val.id} value={val.id}>{val.name}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Mídias do Produto (a primeira será a imagem principal)</label>
                        <MediaUploader media={media} setMedia={setMedia} />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
                        <button type="submit" className="btn-save" disabled={isSaving}>
                            {isSaving ? 'Salvando...' : 'Salvar Produto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ProductFormModal;