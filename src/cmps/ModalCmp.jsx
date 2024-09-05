import xBtn from '../assets/imgs/icons/x.svg'

export function ModalCmp({ children, onClose, modalType, stay }) {
    let headlineContent
    let guestAccess

    stay && stay.type === 'room'
        ? guestAccess = `An amazing room in the ${stay.type} is now available.`
        : guestAccess = `Entire ${stay.type} is now available.`

    switch (modalType) {
        case 'description':
            headlineContent = 'About this place'
            break;
        case 'amenities':
            headlineContent = 'What this place offers'
            break;
        default:
            headlineContent = ''
    }

    // Logic to group items by type
    function groupItemsByType(items) {
        return items.reduce((acc, item) => {
            acc[item.type] = acc[item.type] || []
            acc[item.type].push(item)
            return acc
        }, {})
    }

    // Logic to render individual items
    function renderItem(item, index) {
        return (
            <div key={index} className={`item ${index}`}>
                <div>
                    {item.imgUrl && (
                        <img src={item.imgUrl} alt={item.name || 'Image'} className="details-icon" />
                    )}
                    <span>{item.name || item.text || item.toString()}</span>
                </div>
                <hr />
            </div>
        )
    }

    // Logic to render content based on modal type
    function renderContent(items) {
        if (modalType === 'amenities') {
            const groupedItems = groupItemsByType(items)
            return Object.keys(groupedItems).map((type, index) => (
                <div key={index} className="group">
                    <h3>{type}</h3>
                    {groupedItems[type].map(renderItem)}
                </div>
            ))
        } else {
            return items.map(renderItem)
        }
    }

    return (
        <div className={`modal-overlay ${modalType || ''}`}>
            <div className="modal-content">
                {headlineContent && <h2>{headlineContent}</h2>}
                <button className="close-button" onClick={onClose}>
                    <img src={xBtn} alt="Close" />
                </button>
                {renderContent(modalType === 'description' ? [stay.description] : stay.amenities)}
                {modalType === 'description' && (
                    <div className="guest-access">
                        <h3>Guest access</h3>
                        <p>{guestAccess}</p>
                    </div>
                )}
            </div>
        </div>
    )
}