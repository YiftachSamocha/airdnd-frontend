import { formatNumberWithCommas } from "../../services/util.service"
import arrowDown from "../../assets/imgs/icons/arrowDown.svg"
export function StayPayment({ stay }) {

// console.log(stay.dates);

// const formatDate = stay.date ? stay.date : Add date
    const price = formatNumberWithCommas(stay.price.night)
    const total = formatNumberWithCommas(price * 5)
    return (
        <section className="stay-payment">
            <h2>${price} <span>night</span></h2>
            <div className="btn-container">
                <button className="btn-team">
                    <div className="btn-side">
                        <h4>CHECK-IN</h4>
                        <p>Add date</p></div>
                    <div className="btn-side">
                        <h4>CHECKOUT</h4>
                        <p>Add date</p>
                    </div>
                </button>
                <button className="btn-team">
                    <div className="btn-side">
                        <h4>GUESTS</h4>
                        <p>{stay.capacity} guests</p>
                    </div>
                    <div className="btn-side">
                        <img src={arrowDown} alt="ArrowDown Icon" className="arrow-down-icon" />
                    </div>
                </button>
            </div>
            <div className="grid-item button-container">
                <button className="color-change">Reserve</button>
            </div>
            <div className="grid-item">
                <p>You won't be charged yet</p>
            </div>
            <div className="price-calc">
                <h3 className="light">${price} <span><span>X</span> 5 nights</span></h3>
                <h3>${total}</h3>
            </div>
            {/* <hr /> */}
            <div className="total">
                <h3>Total</h3>
                <h3>${total}</h3>
            </div>
        </section >
    )
}