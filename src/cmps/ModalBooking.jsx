import { useState } from "react";
import { findFirstAvailableNights, formatDateRange, formatNumberWithCommas, getDateRange } from "../services/util.service";
import { Link, useParams, useNavigate } from "react-router-dom"
import { addOrder } from "../store/actions/order.action";
import success from "../assets/imgs/icons/success.svg"


export function ModalBooking({ isOpen, onClose, showConfirmation, stay }) {

    const [isConfirmation, setIsConfirmation] = useState(false)
    const navigate = useNavigate()

    const price = formatNumberWithCommas(stay.price.night)
    const total = formatNumberWithCommas(stay.price.night * 5)
    const cleaningFee = formatNumberWithCommas(stay.price.cleaning)
    const availableDates = findFirstAvailableNights(stay.reservedDates, 5)
    const freeDate = formatDateRange(availableDates)


    function handleBackClick() {
        if (isConfirmation) {
            setIsConfirmation(false)
            // need addOrder 
            navigate('/stay')     
           } else {
            onClose()
        }
    }

    function handleConfirmClick() {
        setIsConfirmation(true)
    }

    if (!isOpen) return null

    return (
        <section className="modal-booking">
            <section className="modal-booking section">
                <div className="modal-header"> {isConfirmation ? (
                    <><div className="modal-success">
                    <img className="success icon" src={success} alt="success" />
                        <h2>Reserved successfully</h2></div>
                        <p>You can follow the order status in <a href="/trip" class="trip-link">My trip</a> page</p>
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
                    <span>{freeDate}</span>
                    <h4>Guests:</h4>
                    <span>{stay.sleep.maxCapacity} guests</span>
                    {/* adult */}

                    <div className="price-calc add-grid">
                        <h4>Price Details</h4>
                        <h3 className="light">${price} <span><span>X</span> 5 nights</span></h3>
                        <h3>${total}</h3>
                        <div></div>
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
                        className= {isConfirmation ? 'hidden' : 'confirm'}
                    >
                        Confirm
                    </button></div>
            </section>
        </section>
    )
}