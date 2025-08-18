import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebase/config';
import { collection, query, where, onSnapshot, addDoc, doc, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';
import './ManageAttributes.css';

const ManageAttributes = () => {
    const [productType, setProductType] = useState('gema');
    const [groups, setGroups] = useState([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [values, setValues] = useState([]);
    const [newValueName, setNewValueName] = useState('');
    const [loadingGroups, setLoadingGroups] = useState(true);
    const [loadingValues, setLoadingValues] = useState(false);

    useEffect(() => {
        setLoadingGroups(true);
        const q = query(collection(db, 'attributes'), where('appliesTo', '==', productType));
        const unsub = onSnapshot(q, (snapshot) => {
            const groupsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGroups(groupsData);
            setSelectedGroup(null);
            setLoadingGroups(false);
        });
        return () => unsub();
    }, [productType]);

    useEffect(() => {
        if (selectedGroup) {
            setLoadingValues(true);
            const valuesRef = collection(db, 'attributes', selectedGroup.id, 'values');
            const unsub = onSnapshot(valuesRef, (snapshot) => {
                setValues(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setLoadingValues(false);
            });
            return () => unsub();
        } else {
            setValues([]);
        }
    }, [selectedGroup]);

    const handleAddGroup = async () => {
        if (newGroupName.trim()) {
            await addDoc(collection(db, 'attributes'), { name: newGroupName, appliesTo: productType });
            setNewGroupName('');
        }
    };

    const handleDeleteGroup = async (groupId) => {
        if (window.confirm("Atenção! Excluir um grupo também excluirá todos os seus valores. Deseja continuar?")) {
            const groupDocRef = doc(db, 'attributes', groupId);
            const valuesSnapshot = await getDocs(collection(groupDocRef, 'values'));
            
            const batch = writeBatch(db);
            valuesSnapshot.forEach(doc => batch.delete(doc.ref));
            batch.delete(groupDocRef);
            
            await batch.commit();
            setSelectedGroup(null);
        }
    };

    const handleAddValue = async () => {
        if (newValueName.trim() && selectedGroup) {
            await addDoc(collection(db, 'attributes', selectedGroup.id, 'values'), { name: newValueName });
            setNewValueName('');
        }
    };

    const handleDeleteValue = async (valueId) => {
        if (selectedGroup) {
            await deleteDoc(doc(db, 'attributes', selectedGroup.id, 'values', valueId));
        }
    };

    return (
        <div className="attributes-container">
            <h1>Gerenciar Atributos de Produto</h1>
            <div className="product-type-tabs">
                <button onClick={() => setProductType('gema')} className={productType === 'gema' ? 'active' : ''}>Atributos de Gemas</button>
                <button onClick={() => setProductType('joia')} className={productType === 'joia' ? 'active' : ''}>Atributos de Joias</button>
            </div>
            <div className="attributes-layout">
                <div className="attribute-column">
                    <h3>Grupos de Atributos</h3>
                    {loadingGroups ? <p>Carregando...</p> : (
                        <div className="attribute-list">
                            {groups.map(group => (
                                <div key={group.id} className={`attribute-item ${selectedGroup?.id === group.id ? 'active' : ''}`} onClick={() => setSelectedGroup(group)}>
                                    <span>{group.name}</span>
                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteGroup(group.id); }} className="delete-btn">&times;</button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="add-form">
                        <input type="text" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="Novo Grupo" />
                        <button onClick={handleAddGroup}>Adicionar</button>
                    </div>
                </div>
                <div className="attribute-column">
                    <h3>Valores para "{selectedGroup ? selectedGroup.name : 'Nenhum'}"</h3>
                    {selectedGroup && (
                        <>
                            {loadingValues ? <p>Carregando...</p> : (
                                <div className="attribute-list">
                                    {values.map(val => (
                                        <div key={val.id} className="attribute-item value-item">
                                            <span>{val.name}</span>
                                            <button onClick={() => handleDeleteValue(val.id)} className="delete-btn">&times;</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="add-form">
                                <input type="text" value={newValueName} onChange={e => setNewValueName(e.target.value)} placeholder="Novo Valor" />
                                <button onClick={handleAddValue}>Adicionar</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ManageAttributes;