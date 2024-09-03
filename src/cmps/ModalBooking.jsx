import { useState } from "react";
import { formatNumberWithCommas, getDateRange } from "../services/util.service";



export function ModalBooking({ isOpen, onClose, showConfirmation, stay }) {

    const [isConfirmation, setIsConfirmation] = useState(false)

    const price = formatNumberWithCommas(stay.price.night)
    const total = formatNumberWithCommas(stay.price.night * 5)
    const cleaningFee = formatNumberWithCommas(stay.price.cleaning)
    // const freeDate = getDateRange(stay.reservedDates)

    function handleBackClick() {
        if (isConfirmation) {
            setIsConfirmation(false);
        } else {
            onClose(); // סוגר את המודל אם לא נמצאים בתצוגת האישור
        }
    };

    function handleConfirmClick() {
        setIsConfirmation(true); // משנה את מצב המודל להודעת אישור
    }

    if (!isOpen) return null

    return (
        <section className="modal-booking">
            <section className="modal-booking section">
                <div className="modal-header"> {isConfirmation ? (
                    <>
                        <h2>Reserved successfully</h2>
                        <p>You can follow the order status in My trip page</p>
                    </>
                ) : (
                    <> <h2>One last step</h2>
                        <p>Dear Guest,</p>
                        <p>  In order to complete your resevation, please confirm your trip details.
                        </p></>)}
                </div>
                <div className="modal-details">
                    <h3>Resevation details</h3>
                    <h4>Trip dates:</h4>
                    {/* <span>{freeDate}</span> */}
                    <h4>Guests:</h4>
                    <span>{stay.sleep.maxCapacity} guests</span>
                    {/* adult */}

                    {/* </div>
                        {cleaningFee > 0 && (
                            <div className="price-calc add-grid">
                                <h3 className="light">Cleaning fee</h3>
                                <h3>${cleaningFee}</h3>
                            </div>
                        )} */}

                    <div className="price-calc add-grid">
                        <h4>Price Details</h4>
                        <h3 className="light">${price} <span><span>X</span> 5 nights</span></h3>
                        <h3>${total}</h3>
                        <div></div>
                        {/* <span>Pay{stay.sleep.maxCapacity} </span> */}
                        <h3>Service fee</h3>
                        <h3>${cleaningFee}</h3>
                        <div className="total">
                            <h3>Total</h3>
                            <h3>${total}</h3>
                        </div>

                    </div>
                </div>
                <div className="modal-img">
                    <img src={stay.imgs[0]} alt={`stay-img`} className="stay-img" />
                    <div className="img-name">
                        <h5>{stay.name}</h5>
                        <h5>{stay.location.city}, {stay.location.country}</h5>
                </div> </div>
                <div className="modal-btn">
                    <button className="back" onClick={handleBackClick}>{isConfirmation ? 'Closed' : 'Back'}</button>
                    <button
                        onClick={handleConfirmClick}
                        className={isConfirmation ? 'hidden' : ''}
                    >
                        Confirm
                    </button></div>
            </section>
        </section>
    )
}