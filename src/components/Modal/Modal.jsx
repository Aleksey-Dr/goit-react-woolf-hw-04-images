import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, largeImage }) => {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    // ================== LOGIC
    const handleKeyDown = event =>
        event.code === 'Escape' && onClose();

    const handleBackdropClick = event =>
        event.currentTarget === event.target && onClose();
    // ================== /LOGIC

    return createPortal(
        <div onClick={handleBackdropClick} className={css.overlay}>
            <div className={css.modal}>
                <img src={largeImage} alt="Item gallery" />
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
