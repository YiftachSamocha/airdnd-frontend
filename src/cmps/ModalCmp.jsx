export function ModalCmp({ children, onClose, className }) {
    return (
        <div className={`modal-overlay ${className || ''}`}>
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    )
}