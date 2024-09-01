import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppHeader } from "../cmps/AppHeader";
import arrowLeft from "../assets/imgs/icons/arrowLeft.svg"
import diamond from "../assets/imgs/icons/diamond.svg"
import superhost from "../assets/imgs/icons/superhost.svg"
import starIcon from "../assets/imgs/icons/star.svg"
import logoImg from "../assets/imgs/logo.svg"

import { Who } from "../cmps/MainFilterCmps/Who";
import { When } from "../cmps/MainFilterCmps/When";
import { loadStay } from '../store/actions/stay.actions';
import { formatNumberWithCommas, getDateRange } from '../services/util.service';

export function StayOrder() {

    const navigate = useNavigate()
    const { stayId } = useParams()
    const stay = useSelector(storeState => storeState.stayModule.stay)
    const [searchParams, setSearchParams] = useSearchParams();

    const [isWhoOpen, setWhoOpen] = useState(false)
    const [isWhenOpen, setWhenOpen] = useState(false)

    const [filterCapacity, setFilterCapacity] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
    const [dates, setDates] = useState({ startDate: null, endDate: null })

    const toggleWho = () => setWhoOpen(!isWhoOpen)
    const toggleWhen = () => setWhenOpen(!isWhenOpen)

    useEffect(() => {
        loadStay(stayId)
    }, [stayId])

    console.log('stayId', stayId);

    {/* <Link to="/foo" query={{ the: 'query' }}/> */ }
    // navigate('/stay/:id?a=2&b=3')

    const price = formatNumberWithCommas(stay.price.night)
    const total = formatNumberWithCommas(stay.price.night * 5)
    const cleaningFee = formatNumberWithCommas(stay.price.cleaning)
    const freeDate = getDateRange(stay.reservedDates)

    const totalReviews = stay.reviews ? stay.reviews.length : 0
    const avgRating = totalReviews > 0
        ? stay.reviews.reduce((sum, review) => sum + review.rate, 0) / totalReviews
        : 0

    // console.log('stay.price.night', stay.price.night);


    function onBack() {
        navigate(`/stay/${stay._id}`)
    }

    if (!stay) return <div>Loading...</div>

    return (
        <><div className="order">
            <img src={logoImg} className="logo" />
        </div>
            <hr className='main-hr'/>
            <section className='stay-main-order'>
                <section className='stay-order'>
                    <div className="header grid">
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
                                <h4 >Guests </h4><span>{stay.sleep.maxCapacity} guests</span></div>
                            <button onClick={toggleWho}>Edit</button>
                        </div>
                    </div>
                    <div className='order-pay grid'>
                        <h3>Pay with</h3>
                        <h4>Credit or debit card</h4>
                        <div className='card-details'>
                            <h4>Card number</h4>
                            <h4>Expiration</h4>
                            <h4>CVV</h4>
                            <h4>ZIP code</h4>
                        </div>
                        {/* <h4>Pay{stay.sleep.maxCapacity} now</h4> */}
                        {/* <h4>Pay part now, part later</h4>
                        <h5>{' ₪753.18'} due today, {'₪3,012.70'} on {'Sep 20, 2024.'} No extra fees. More info</h5> */}
                    </div>
                    <div className='payment grid'>
                        <button>Request to book</button>
                    </div>
                    {/* </section> */}
                    <section className="price-details">
                        {/* <div className='grid'> */}
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
                            </div>  </div>

                        <div className="price-calc add-grid">
                            <h2>Price details</h2>
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
                    </section>
                   


                </section>

                {isWhenOpen && <When dates={dates} setDates={setDates} />}
                {isWhoOpen && <Who filterCapacity={filterCapacity} setFilterCapacity={setFilterCapacity} />}

            </section></>)
}