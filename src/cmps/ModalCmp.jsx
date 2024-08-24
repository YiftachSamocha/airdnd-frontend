import xBtn from '../assets/imgs/icons/x.svg'

export function ModalCmp({ children, onClose, type, stay }) {
    let headlineContent
    let guestAccess
    

    stay && stay.type === 'room'
        ? guestAccess = `An amazing room in the ${stay.type} is now available.`
        : guestAccess = `Entire ${stay.type} is now available.`
console.log('type', type)
    switch (type) {
        case ('description'):
            headlineContent = 'About this place'

            break;
        case ('amenities'):
            headlineContent = 'What this place offers'
            break;
        default:
            headlineContent = ''
    }


    return (
        <div className={`modal-overlay ${type || ''}`}>
            <div className="modal-content">
                {headlineContent && <h2>{headlineContent}</h2>}
                <button className="close-button" onClick={onClose}>
                    <img src={xBtn} alt="Close" />
                </button>
                {children}
                {type === 'description' && (
                    <div className="guest-access">
                        <h3>Guest access</h3>
                        <p>{guestAccess}</p>
                    </div>
                )}            </div>
        </div>
    )
}