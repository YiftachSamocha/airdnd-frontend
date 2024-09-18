import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import arrowLeft from "../assets/imgs/icons/arrowLeft.svg"
import diamond from "../assets/imgs/icons/diamond.svg"
import superhost from "../assets/imgs/icons/superhost.svg"
import starIcon from "../assets/imgs/icons/star.svg"
import logoImg from "../assets/imgs/logo.svg"
import amex from "../assets/imgs/pay/amex.svg"
import visa from "../assets/imgs/pay/visa.svg"
import masterCard from "../assets/imgs/pay/masterCard.svg"
import Gpay from "../assets/imgs/pay/Gpay.svg"

import { Who } from "../cmps/MainFilterCmps/Who";
import { When } from "../cmps/MainFilterCmps/When";
import { loadStay } from '../store/actions/stay.actions';
import { calculateDaysBetween, findFirstAvailableNights, formatDateRange, formatNumberWithCommas, getDateRange } from '../services/util.service';
import { addOrder } from '../store/actions/order.action';
import { parse } from 'date-fns';
import { ModalBooking } from '../cmps/ModalBooking';
import { OutsideClick } from '../cmps/OutsideClick';
import logo from '../assets/imgs/small-icon.png';
import { SOCKET_EVENT_ADD_ORDER, socketService } from '../services/socket.service';


export function StayOrder() {
    const navigate = useNavigate()
    const { stayId } = useParams()
    const stay = useSelector(storeState => storeState.stayModule.stay)
    const currUser = useSelector(state => state.userModule.currUser)
    const [searchParams, setSearchParams] = useSearchParams();

    const [isWhoOpen, setWhoOpen] = useState(false)
    const [isWhenOpen, setWhenOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filterCapacity, setFilterCapacity] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
    const [dates, setDates] = useState({ startDate: null, endDate: null })
    const [newOrder, setNewOrder] = useState({
        price: 0,
        total: 0,
        finalPrice: 0,
        cleaningFee: 0,
        totalNights: 0,
        freeDate: '',
        filterCapacity: ''
    })
    const toggleWho = () => setWhoOpen(!isWhoOpen)
    const toggleWhen = () => setWhenOpen(!isWhenOpen)

    useEffect(() => {
        loadStay(stayId)
    }, [stayId])


    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        const startDateParam = params.get('start_date');
        const endDateParam = params.get('end_date');
        const adults = Number(params.get('adults')) || 0;
        const children = Number(params.get('children')) || 0;
        const infants = Number(params.get('infants')) || 0;
        const pets = Number(params.get('pets')) || 0;
        console.log('Parsed Params:', { startDateParam, endDateParam, adults, children, infants, pets });

        let startDate = null;
        let endDate = null;

        if (startDateParam && endDateParam) {
            try {
                startDate = parse(startDateParam, 'yyyy-MM-dd', new Date());
                endDate = parse(endDateParam, 'yyyy-MM-dd', new Date());
            } catch (error) {
                console.error('Date parsing error:', error);
            }
        }
        setDates({ startDate, endDate })
        setFilterCapacity({ adults, children, infants, pets });
    }, [searchParams])

    useEffect(() => {
        if (!stay || !dates.startDate || !dates.endDate) return;

        const dateRange = {
            startDate: new Date(dates.startDate),
            endDate: new Date(dates.endDate)
        }
        const totalNights = calculateDaysBetween(dateRange)

        const price = stay.price.night
        const finalPrice = price * totalNights
        const cleaningFee = stay.price.cleaning
        const total = finalPrice + cleaningFee
        const freeDate = formatDateRange(dates)

        setNewOrder({
            price: formatNumberWithCommas(price),
            total: formatNumberWithCommas(total),
            finalPrice: formatNumberWithCommas(finalPrice),
            cleaningFee: formatNumberWithCommas(cleaningFee),
            totalNights,
            freeDate,
            filterCapacity
        });
    }, [stay, dates, filterCapacity]);

    if (!stay) {
        return (
            <div className="spinner-container">
                <img className="spinner" src={logo} alt="logo" />
            </div>
        )
    }

    const totalReviews = stay.reviews ? stay.reviews.length : 0
    const avgRating = totalReviews > 0
        ? stay.reviews.reduce((sum, review) => sum + review.rate, 0) / totalReviews
        : 0

    function handleClick() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    function onBack() {
        navigate(`/stay/${stay._id}`)
    }

    function onAddOrder() {
        const params = new URLSearchParams(searchParams)
        if (!params.get('start_date') || !params.get('end_date')) return
        if (!currUser) return
        const startDate = parse(params.get('start_date'), 'yyyy-MM-dd', new Date())
        const endDate = parse(params.get('end_date'), 'yyyy-MM-dd', new Date())
        let capacity = {
            adults: Number(params.get('adults')) || 0,
            children: Number(params.get('children')) || 0,
            infants: Number(params.get('infants')) || 0,
            pets: Number(params.get('pets')) || 0,
        }
        const total = capacity.adults + capacity.children + capacity.infants
        capacity = { ...capacity, total }
        const stayToOrder = {
            _id: stay._id,
            name: stay.name,
            price: stay.price,
            img: stay.imgs[0],
            location: stay.location.city,
        }
        const status = 'pending'
        const totalPrice = parseInt(newOrder.total.replace(/,/g, ''), 10)
        const host = {
            _id: stay.host._id,
            fullname: stay.host.fullname
        }
        const guest = { _id: currUser._id, fullname: currUser.fullname }
        const createdAt = new Date()
        const order = {
            startDate,
            endDate,
            capacity,
            stay: stayToOrder,
            totalPrice,
            status,
            host,
            guest,
            createdAt
        }
        addOrder(order)
        socketService.emit(SOCKET_EVENT_ADD_ORDER, order)
    }

    function formatGuests(capacity) {
        const { adults, children, infants, pets } = capacity
        const parts = []

        if (adults > 0) {
            parts.push(`${adults} adult${adults > 1 ? 's' : ''}`)
        }
        if (children > 0) {
            parts.push(`${children} child${children > 1 ? 'ren' : ''}`)
        }
        if (infants > 0) {
            parts.push(`${infants} infant${infants > 1 ? 's' : ''}`)
        }
        if (pets > 0) {
            parts.push(`${pets} pet${pets > 1 ? 's' : ''}`)
        }

        return parts.join(', ')
    }
    //     // When
    // function handleDateChange(newDates) {
    //     setDates(newDates);
    //     setSearchParams({ ...searchParams, start_date: format(newDates.startDate, 'yyyy-MM-dd'), end_date: format(newDates.endDate, 'yyyy-MM-dd') });
    // }

    // // Who
    // function handleCapacityChange(newCapacity) {
    //     setFilterCapacity(newCapacity);
    //     setSearchParams({ ...searchParams, adults: newCapacity.adults, children: newCapacity.children, infants: newCapacity.infants, pets: newCapacity.pets });
    // }

    const { freeDate, total, totalNights, totalPrice, finalPrice, cleaningFee, price } = newOrder

    return (
        <><div className="order">
            <Link to={'/stay'} onClick={() => store.dispatch({ type: SET_FILTER_BY, filterBy: stayService.getDefaultFilter() })}
            ><img src={logoImg} className="logo" /></Link>
            <hr className='main-hr' /> </div>
            <section className='stay-main-order'>
                <section className='stay-order'>
                    <div className="header">
                        <button onClick={onBack}> <img src={arrowLeft} alt="ArrowLeft Icon" className="arrow-left icon" /></button>
                        <h2>Request to book</h2>
                    </div>

                    <div className='rare-find grid'>
                        <div>  <h5>This is a rare find.</h5>
                            <h5> Karen & Tal's place is usually booked.</h5></div>
                        <img src={diamond} alt="Diamond Icon" className="diamond icon" />
                    </div>
                    <div className='order-edit grid'>
                        <div> <h3>Your trip</h3></div>
                        <div className='flex'>
                            <div>
                                <h4 >Dates </h4>
                                <span>{freeDate}</span></div>
                            <button onClick={toggleWhen}>Edit</button>
                        </div>
                        <div className='flex'>
                            <div>
                                <h4 >Guests </h4> <span>{formatGuests(filterCapacity)}</span></div>
                            <button onClick={toggleWho}>Edit</button>
                        </div>
                    </div>
                    <div className='order-pay grid'>
                        <div className='pay-img'>
                            <h3>Pay with</h3>
                            <div className='imgs-pay'>
                                <img src={visa} alt="visa" className="visa icon" />
                                <img src={masterCard} alt="masterCard" className="masterCard icon" />
                                <img src={amex} alt="amex" className="amex icon" />
                                <img src={Gpay} alt="Gpay" className="Gpay icon" /></div>
                        </div> <div className="card-details">
                            <div className="input-group">
                                <div className="floating-label">
                                    <input type="text" id="card-number" name="card-number" placeholder=" " required />
                                    <label htmlFor="card-number">Card number</label>
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="floating-label">
                                    <input type="text" id="expiration" name="expiration" placeholder=" " required />
                                    <label htmlFor="expiration">Expiration</label>
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="floating-label">
                                    <input type="text" id="cvv" name="cvv" placeholder=" " required />
                                    <label htmlFor="cvv">CVV</label>
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="floating-label">
                                    <input type="text" id="zip-code" name="zip-code" placeholder=" " required />
                                    <label htmlFor="zip-code">ZIP code</label>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='payment grid'>
                        <button className='btn-pay' onClick={handleClick}>Request to book</button>
                        {isModalOpen &&
                            //  <OutsideClick onOutsideClick={() => setIsWhoOpen(false)}></OutsideClick>
                            <OutsideClick onOutsideClick={() => setIsModalOpen(false)}>
                                <ModalBooking isOpen={isModalOpen} onClose={closeModal} stay={stay}
                                    onAddOrder={onAddOrder} newOrder={newOrder} />
                            </OutsideClick>
                        }
                        {/* <ModalBooking isOpen={isModalOpen} onClose={closeModal} stay={stay} onAddOrder={onAddOrder} /> */}
                    </div>
                    {/* </section> */}
                    <section className="price-details">
                        <div className='part1 flex'>
                            <img src={stay.imgs[0]} alt={`stay-img`} className="stay-img" />
                            {/* </div> */}
                            <div className="main-name">
                                <h4>{stay.name}</h4>
                                <h4>{stay.highlights[0].main}</h4>

                                <div className="rating flex">
                                    <img src={starIcon} alt="Star Icon" className="star icon" />
                                    <span>{avgRating.toFixed(1)}</span>
                                    <span className="reviews-number">({totalReviews} reviews)</span>
                                    <img src={superhost} alt="Superhost Icon" className="superhost icon" />
                                    <span>Superhost</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='part2'>
                            <h2>Price details</h2>
                            <div className="price-calc">

                                <h3 className="light">${price} <span><span>X</span> {totalNights} {totalNights > 1 ? 'nights' : 'night'}</span></h3>
                                <h3>${finalPrice}</h3>
                            </div>
                            {cleaningFee > 0 && (
                                <div className="price-calc">
                                    <h3 className="light">Cleaning fee</h3>
                                    <h3>${cleaningFee}</h3>
                                </div>
                            )}
                            <div className="total">
                                <h3>Total</h3>
                                <h3>${total}</h3>
                            </div>
                        </div>
                    </section>
                </section>
                <section className='modal-who-when'>
                    {isWhenOpen && <When dates={dates} setDates={setDates} />}
                    {isWhoOpen && <Who filterCapacity={filterCapacity} setFilterCapacity={setFilterCapacity} />}
                </section>
            </section></>)
}