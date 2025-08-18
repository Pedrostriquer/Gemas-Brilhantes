// Dentro de src/Components/Admin/AdminBody/ManageProducts/MediaUploader.js

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { 
    DndContext, 
    closestCenter,
    PointerSensor, // Sensor que usa eventos de ponteiro (mouse, toque)
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { 
    arrayMove, 
    SortableContext, 
    horizontalListSortingStrategy, // Estratégia para listas horizontais
    useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './MediaUploader.css';

// Componente filho para renderizar cada item arrastável
const SortableMediaItem = ({ item, onRemove, index }) => {
    // Hooks do dnd-kit que fornecem as props para tornar o item arrastável
    const { 
        attributes, 
        listeners, 
        setNodeRef, 
        transform, 
        transition 
    } = useSortable({ id: item.id });
    
    // Estilos dinâmicos para a animação de arrastar
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div 
            className="media-preview-item" 
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners}
        >
            {item.type === 'video' ? (
                <video src={item.url} muted playsInline title={item.file?.name || 'video'} />
            ) : (
                <img src={item.url} alt={item.file?.name || 'preview'} />
            )}
            {/* Botão para remover a mídia individualmente */}
            <button 
                type="button" 
                className="remove-media-btn" 
                // Usamos onMouseDown para evitar que o evento de arrastar seja acionado
                onMouseDown={(e) => e.stopPropagation()} 
                onClick={() => onRemove(item.id)}
            >
                &times;
            </button>
            {/* Indicador visual da ordem */}
            <div className="order-indicator">{index + 1}</div>
        </div>
    );
};

// Componente principal do uploader
const MediaUploader = ({ media, setMedia }) => {

    // Lógica para adicionar novos arquivos
    const onDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => ({
            id: `temp-${Date.now()}-${file.name}-${Math.random()}`,
            file,
            url: URL.createObjectURL(file), // Cria uma URL temporária para preview
            type: file.type.startsWith('video') ? 'video' : 'image',
        }));
        setMedia(prev => [...prev, ...newFiles]);
    };

    // Configuração do react-dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop, 
        accept: { 'image/*': [], 'video/*': [] } 
    });

    // Lógica para remover um arquivo da lista
    const handleRemove = (idToRemove) => {
        setMedia(prev => prev.filter(item => item.id !== idToRemove));
    };

    // Configuração dos sensores do dnd-kit para melhor controle
    const sensors = useSensors(useSensor(PointerSensor, {
        // Exige que o mouse se mova 10px antes de iniciar o arrastar
        activationConstraint: {
            distance: 10,
        },
    }));

    // Lógica que é disparada ao soltar um item após arrastar
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setMedia((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex); // Função auxiliar que reordena o array
            });
        }
    };

    return (
        <div className="media-uploader">
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                <input {...getInputProps()} />
                <i className="fas fa-cloud-upload-alt"></i>
                <p>Arraste e solte mídias aqui, ou clique para selecionar</p>
                <span>Imagens e Vídeos são permitidos</span>
            </div>

            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter} 
                onDragEnd={handleDragEnd}
            >
                <SortableContext 
                    items={media} 
                    strategy={horizontalListSortingStrategy} // Define que a lista é horizontal
                >
                    <div className="media-preview-list">
                        {media.map((item, index) => (
                           <SortableMediaItem 
                                key={item.id} 
                                id={item.id} 
                                item={item} 
                                onRemove={handleRemove} 
                                index={index} 
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default MediaUploader;