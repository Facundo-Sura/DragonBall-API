import { useEffect } from 'react';

function ImageModal({ isOpen, onClose, image, title }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal is-active" onClick={onClose}>
      <div className="modal-background" style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}></div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p className="image">
          <img 
            src={image} 
            alt={title} 
            style={{ 
              maxHeight: '80vh',
              maxWidth: '90vw',
              objectFit: 'contain'
            }} 
          />
        </p>
        {title && <p className="has-text-white has-text-centered mt-3 is-size-4">{title}</p>}
      </div>
      <button 
        className="modal-close is-large" 
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default ImageModal;
