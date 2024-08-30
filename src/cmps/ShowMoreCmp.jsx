import arrowIcon from '../assets/imgs/icons/arrow-right.svg'

export function ShowMoreCmp({ content, limit, modalType, toggleModal }) {
    const buttonClass = modalType === 'amenities' ? 'white' : 'btn-link';
    const buttonLabel = modalType === 'amenities'
        ? `Show all ${content.length} amenities`
        : modalType === 'description'
            ? (
                <>
                    Show more <img src={arrowIcon} alt="Arrow Right" className="arrow-icon" />
                </>
            )
            : 'Show More';

            function renderContent(items, limit) {
                if (!Array.isArray(items) && typeof items !== 'string') {
                    console.error('Content is not an array or string:', items);
                    return null;
                }
            
                if (typeof items === 'string') {
                    return <p>{items.slice(0, limit)}...</p>;
                }
            
                return items.slice(0, limit).map((item, index) => (
                    <div key={index} className={`item ${index}`}>
                        <div>
                            {item.imgUrl && (
                                <img src={item.imgUrl} alt={item.name || 'Image'} className="details-icon" />
                            )}
                            <span>{item.name || item.text || item.toString()}</span>
                        </div>
                    </div>
                ));
            }

    return (
        <div className={`show-more ${modalType}-style`}>
            <div className="items">
                {renderContent(content, limit)}
            </div>
            
            {content.length > limit && (
                <button onClick={() => toggleModal(modalType)} className={buttonClass}>
                    {buttonLabel}
                </button>
            )}
        </div>
    )
}