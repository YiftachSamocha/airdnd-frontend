import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { formatNumberWithCommas } from "../../services/util.service"
import arrowDown from "../../assets/imgs/icons/arrowDown.svg"
import { Who } from "../MainFilterCmps/Who.jsx"
import { When } from "../MainFilterCmps/When.jsx"
import { orderService } from "../../services/order/index.js"
import { addOrder } from "../../store/actions/order.action.js"
import { format, isValid } from "date-fns"
import { OutsideClick } from "../OutsideClick.jsx"
import { useSelector } from "react-redux"
import { WhenDetails } from "../MainFilterCmps/WhenDetails.jsx"



export function StayPayment({ stay, onSetDates, dates, monthsAmount }) {
    const [isWhoOpen, setIsWhoOpen] = useState(false)
    const [isWhenOpen, setIsWhenOpen] = useState(false)

    const [filterCapacity, setFilterCapacity] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
    // const [dates, setDates] = useState({ startDate: null, endDate: null })
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false) // Track whether the user is selecting the end date

    const [isFormReady, setIsFormReady] = useState()
    const [orderURL, setOrderUrl] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()

    const price = formatNumberWithCommas(stay.price.night)
    const total = formatNumberWithCommas(stay.price.night * 5)
    const cleaningFee = formatNumberWithCommas(stay.price.cleaning)

    const toggleWho = () => setIsWhoOpen(!isWhoOpen)
    const toggleWhen = () => setIsWhenOpen(!isWhenOpen)

    function toggleWhenEnd() {
        setIsWhenOpen(!isWhenOpen)
        setIsSelectingEndDate(true)
    }

    useEffect(() => {
        // Initialize dates and guests from search params
        const checkin = searchParams.get('start_date') ? new Date(searchParams.get('start_date')) : null
        const checkout = searchParams.get('end_date') ? new Date(searchParams.get('end_date')) : null
        const adults = Number(searchParams.get('adults')) || 1
        const children = Number(searchParams.get('children')) || 0
        const infants = Number(searchParams.get('infants')) || 0
        const pets = Number(searchParams.get('pets')) || 0

        // setDates({ startDate: checkin, endDate: checkout })
        setFilterCapacity({ adults, children, infants, pets })
    }, [])

    useEffect(() => {
        createOrderURLstr()
        updateSearchParams()
        // debugger
        setIsFormReady(dates.startDate && dates.endDate && filterCapacity.adults > 0)
        // console.log('curr user', currUser)

    }, [dates, filterCapacity])


    function updateSearchParams() {
        const params = new URLSearchParams(searchParams)

        if (filterCapacity.adults) params.set('adults', filterCapacity.adults)
        else params.delete('adults')

        if (filterCapacity.children) params.set('children', filterCapacity.children)
        else params.delete('children')

        if (filterCapacity.infants) params.set('infants', filterCapacity.infants)
        else params.delete('infants')

        if (filterCapacity.pets) params.set('pets', filterCapacity.pets)
        else params.delete('pets')

        setSearchParams(params)
    }

    function createOrderURLstr() {
        let urlStr = '?'
        urlStr += `stay_id=${stay._id}&`
        if (filterCapacity.adults) {
            urlStr += `adults=${filterCapacity.adults}&`
        }
        if (filterCapacity.children) urlStr += `children=${filterCapacity.children}&`
        if (filterCapacity.infants) urlStr += `infants=${filterCapacity.infants}&`
        if (filterCapacity.pets) urlStr += `pets=${filterCapacity.pets}&`

        if (dates.startDate) urlStr += `start_date=${format(dates.startDate, 'yyyy-MM-dd')}&`
        if (dates.endDate) urlStr += `end_date=${format(dates.endDate, 'yyyy-MM-dd')}&`

        // Remove trailing '&' if present
        urlStr = urlStr.endsWith('&') ? urlStr.slice(0, -1) : urlStr
        setOrderUrl(urlStr)
    }

    async function handleReserve(stay) {
        try {
            updateSearchParams('adults', filterCapacity.adults || 1)
            updateSearchParams('children', filterCapacity.children || 0)
            updateSearchParams('infants', filterCapacity.infants || 0)
            updateSearchParams('pets', filterCapacity.pets || 0)
            if (!dates.startDate || !dates.endDate) return 

            else navigate(`/book/stay/${stay._id + orderURL}`)
        } catch (error) {
            console.error("Error creating order:", error)
        }
    }

    function displayDateInLocal(date) {
        return date ? format(date, 'MMM dd') : 'Add date'
    }

    function closeWho() {
        setIsWhoOpen(false) // Only closes the dropdown
    }

    function closeWhen() {
        setIsWhenOpen(false) // Only closes the dropdown
    }

    function handleButtonClick() {
        console.log("Opening calendar modal"); // Debugging log

        if (!dates.startDate || !dates.endDate) {
            setIsWhenOpen(true)
        } else {
            handleReserve(stay)
        }
    }

    return (
        <div className="payment-cmp">
            <section className="stay-payment sticky">
                <div className="header" >
                    <h3>${price}<span>night</span></h3>
                    {dates.startDate && dates.endDate ? (
                        <button className="dates btn-link" onClick={() => setIsWhenOpen(true)}>
                            {format(dates.startDate, 'MMM d')} - {format(dates.endDate, 'MMM d')}

                        </button>
                    ) : ''}

                </div>

                <div className="btn-container">
                    <button className="btn-team" onClick={toggleWhen}>
                        <div className="btn-side">
                            <h4>CHECK-IN</h4>
                            <p>{displayDateInLocal(dates.startDate)}</p>
                        </div>
                    </button>
                    <button className="btn-team" onClick={toggleWhenEnd}>
                        <div className="btn-side">
                            <h4>CHECKOUT</h4>
                            <p>{displayDateInLocal(dates.endDate)}</p>
                        </div>
                    </button>

                    {isWhenOpen && (
                        <div className="when-modal">
                            <OutsideClick onOutsideClick={() => setIsWhenOpen(false)}>

                                <WhenDetails
                                    dates={dates}
                                    onSetDates={onSetDates}
                                    stay={stay}
                                    breakpoint={743}
                                    closeWhen={closeWhen}
                                    type="payment"
                                    monthsAmount={monthsAmount}
                                />
                            </OutsideClick>
                        </div>

                    )}

                    <button className="btn-team full" onClick={toggleWho}>
                        <div className="btn-side">
                            <h4>GUESTS</h4>
                            <p>{`${filterCapacity.adults + filterCapacity.children + filterCapacity.infants} guests`}</p>

                        </div>
                        <div className="btn-side">
                            <img src={arrowDown} alt="ArrowDown Icon" className="arrow-down-icon" />
                        </div>
                    </button>
                </div>

                <div className="reserve grid-item button-container">

                    <button className="color-change" onClick={handleButtonClick}>
                        {isFormReady ? 'Reserve' : 'Check availability'}
                    </button>
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
                {isWhoOpen &&
                    <OutsideClick onOutsideClick={() => setIsWhoOpen(false)}>
                        <Who filterCapacity={filterCapacity} setFilterCapacity={setFilterCapacity} onClose={closeWho} />
                    </OutsideClick>
                }


            </section></div>
    )
}

