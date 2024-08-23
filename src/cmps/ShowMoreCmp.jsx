import { useState } from 'react';
import { ModalCmp } from './ModalCmp.jsx'; // Import the Modal component
import arrowIcon from '../assets/imgs/icons/arrow-right.svg'

export function ShowMoreCmp({ content, limit, type }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const buttonClass = type === 'amenities' ? 'white' : 'btn-link';

    // Toggle function to open/close modal
    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    }

    // General method to handle different content types
    const renderContent = (items, limit) => {
        if (Array.isArray(items)) {
            return items.slice(0, limit).map((item, index) => {
                if (typeof item === 'object') {
                    return (
                        <div key={index} className="item">
                            {item.imgUrl && <img src={item.imgUrl} alt={item.name || 'Image'} className="details-icon" />}
                            <span>{item.name || item.text || item.toString()}</span>
                        </div>
                    );
                }
                return <span key={index}>{item}</span>;
            });
        }
        return items.slice(0, limit);
    };

    // Modal content rendering based on type
    const renderModalContent = (items) => {
        if (Array.isArray(items)) {
            return items.map((item, index) => (
                <div key={index} className="item">
                    {item.imgUrl && <img src={item.imgUrl} alt={item.name || 'Image'} className="details-icon" />}
                    <span>{item.name || item.text || item.toString()}</span>
                </div>
            ));
        }
        return <p>{items}</p>;
    };

    // Button label determination
    const buttonLabel =
        type === 'amenities'
            ? `Show all ${content.length} amenities`
            : type === 'description'
                ? (
                 <>
                    Show more <img src={arrowIcon} alt="Arrow Right" className="arrow-icon" />
                </>   
                )
                
                : 'Show More';

    return (
        <div className="show-more">
            <div>{renderContent(content, limit)}</div>

            {content.length > limit && (
                <button onClick={toggleModal} className={buttonClass}>
                    {buttonLabel}
                </button>
            )}

            {isModalOpen && (
                <ModalCmp onClose={toggleModal} className={`modal-${type}`}>
                    {renderModalContent(content)}
                </ModalCmp>
            )}
        </div>
    );
}