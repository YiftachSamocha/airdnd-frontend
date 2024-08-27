import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { formatNumberWithCommas } from "../../services/util.service"
import arrowDown from "../../assets/imgs/icons/arrowDown.svg"
import { Who } from "../MainFilterCmps/Who.jsx"
import { When } from "../MainFilterCmps/When.jsx"
import { orderService } from "../../services/order/index.js"
import {addOrder} from "../../store/actions/order.action.js"


export function StayPayment({ stay }) {
    const [isWhoOpen, setWhoOpen] = useState(false)
    const [isWhenOpen, setWhenOpen] = useState(false)
    
    const [orderToAdd, setOrderToAdd] = useState(orderService.getEmptyOrder())

    const [filterCapacity, setFilterCapacity] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
    const [dates, setDates] = useState({ startDate: null, endDate: null })
    const navigate = useNavigate()
    // const formatDate = stay.date ? stay.date : Add date
    const price = formatNumberWithCommas(stay.price.night)
    const total = formatNumberWithCommas(stay.price.night * 5)
    const cleaningFee = formatNumberWithCommas(stay.price.cleaning)

    const toggleWho = () => setWhoOpen(!isWhoOpen)
    const toggleWhen = () => setWhenOpen(!isWhenOpen)

    // function changeFilterWhen(range) {
    //     if (range.startDate !== filterBy.when.startDate) setOpenType('when-end')
    //     setFilterBy(prev => ({ ...prev, when: range }))
    // }

    // function changeFilterWho(capacity) {
    //     setFilterBy(prev => ({ ...prev, who: capacity }))
    //     const guestsString = createGuestsString(capacity)
    //     setWhoInput(guestsString)
    // }

    // function createGuestsString(capacity) {
    //     const sum = capacity.adults + capacity.children + capacity.infants
    //     if (sum < 1) return ''
    //     return sum + ' guests'
    // }

    
    // function submitFilter() {
    //     store.dispatch({ type: SET_FILTER_BY, filterBy })
    //     setOpenType('')
    // }
    // { stay, dates, filterCapacity }


    async function handleReserve(stay){
        try {
            navigate(`/book/stay/${stay._id}`)
        } catch (error) {
            console.error("Error creating order:", error)
        }
    }

    return (
        <div className="main-container">
            <section className="stay-payment sticky">
                <h2>${price} <span>night</span></h2>
                <div className="btn-container">
                    <button className="btn-team" onClick={toggleWhen}>
                        <div className="btn-side">
                            <h4>CHECK-IN</h4>
                            <p>Add date</p>
                            {/* <p>{dates.startDate ? dates.startDate.toDateString() : 'Add date'}</p> */}
                        </div>
                    </button>
                    <button className="btn-team" onClick={toggleWhen}>
                        <div className="btn-side">
                            <h4>CHECKOUT</h4>
                            <p>Add date</p>
                            {/* <p>{dates.endDate ? dates.endDate.toDateString() : 'Add date'}</p> */}
                        </div>
                    </button>
                    <button className="btn-team full" onClick={toggleWho}>
                        <div className="btn-side">
                            <h4>GUESTS</h4>
                            <p>{stay.sleep.maxCapacity} guests</p>
                        </div>
                        <div className="btn-side">
                            <img src={arrowDown} alt="ArrowDown Icon" className="arrow-down-icon" />
                        </div>
                    </button>
                </div>
                <div className="grid-item button-container">
                    <button className="color-change" onClick={() => handleReserve(stay)}>Reserve</button>
                </div>

                <div className="grid-item add-grid">
                    <h5>You won't be charged yet</h5>
                </div>
                <div className="price-calc add-grid">
                    <h3 className="light">${price} <span><span>X</span> 5 nights</span></h3>
                    <h3>${total}</h3>
                </div>
                {cleaningFee > 0 && (
                    <div className="price-calc add-grid">
                        <h3 className="light">Cleaning fee</h3>
                        <h3>${cleaningFee}</h3>
                    </div>
                )}
                <div className="total">
                    <h3>Total</h3>
                    <h3>${total}</h3>
                </div>
                {isWhenOpen && <When dates={dates} setDates={setDates} />}
                {isWhoOpen && <Who filterCapacity={filterCapacity} setFilterCapacity={setFilterCapacity} />}
                {/* {openType === 'who' && <Who filterCapacity={filterBy.who} setFilterCapacity={changeFilterWho} />} */}

            </section></div>
    )
}

