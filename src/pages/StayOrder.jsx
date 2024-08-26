import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppHeader } from "../cmps/AppHeader";
import arrowLeft from "../assets/imgs/icons/arrowLeft.svg"
import diamond from "../assets/imgs/icons/diamond.svg"
import superhost from "../assets/imgs/icons/superhost.svg"
import starIcon from "../assets/imgs/icons/star.svg"

import { Who } from "../cmps/MainFilterCmps/Who";
import { When } from "../cmps/MainFilterCmps/When";
import { loadStay } from '../store/actions/stay.actions';
import { formatNumberWithCommas } from '../services/util.service';


// import order from "../services/order.data.js"

export function StayOrder() {
    // const location = useLocation()
    // const { stay } = location.state || {} 
    const { stayId } = useParams()

    const [isWhoOpen, setWhoOpen] = useState(false)
    const [isWhenOpen, setWhenOpen] = useState(false)

    const [filterCapacity, setFilterCapacity] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
    const [dates, setDates] = useState({ startDate: null, endDate: null })

    const toggleWho = () => setWhoOpen(!isWhoOpen)
    const toggleWhen = () => setWhenOpen(!isWhenOpen)

    useEffect(() => {
        loadStay(stayId)
      }, [stayId])
    
      console.log(stay);


    // const price = formatNumberWithCommas(stay.price.night)
    // const total = formatNumberWithCommas(stay.price.night * 5)
    // const cleaningFee = formatNumberWithCommas(stay.price.cleaning)

    const totalReviews = stay.reviews ? stay.reviews.length : 0
    const avgRating = totalReviews > 0
        ? stay.reviews.reduce((sum, review) => sum + review.rate, 0) / totalReviews
        : 0

      if (!stay) return <div>Loading...</div>

    return (
        <section className='stay-order'>
            <AppHeader />
            <div className="header">
                <h2>Request to book</h2>
                <img src={arrowLeft} alt="ArrowLeft Icon" className="arrow-left icon" />
            </div>
            <div>
                <h5>This is a rare find.</h5>
                <h5> Karen & Tal's place is usually booked.</h5>
                <img src={diamond} alt="Diamond Icon" className="diamond icon" />
            </div>
            <div>
                <h3>Your trip</h3>
                {/* <h4>Dates</h4> <span>{stay.reservedDates}</span> */}
                <button onClick={toggleWhen}>Edit</button>
                {/* <h4 onClick={toggleWho}>Guests</h4> <span>{stay.sleep.maxCapacity} guests</span> */}
                <button>Edit</button>
            </div>
            <div>
                <h3>Choose how to pay</h3>
                {/* <h4>Pay{stay.sleep.maxCapacity} now</h4> */}
                <h4>Pay part now, part later</h4>
                <h5>{' ₪753.18'} due today, {'₪3,012.70'} on {'Sep 20, 2024.'} No extra fees. More info</h5>
            </div>

            <section className="price details stiky">
                <div>
                    <img src={stay.img} alt={`stay-img`} className="stay-img" />
                    <h3>{stay.name}</h3>
                    <h4>{stay.info}</h4>
                </div>
                <div className="rating">
                    <img src={starIcon} alt="Star Icon" className="star icon" />
                    <span>{avgRating.toFixed(1)}</span>•
                    <span className="reviews-number">{totalReviews} reviews</span>
                    <img src={superhost} alt="Superhost Icon" className="superhost-icon" />
                    <h4>Superhost</h4>
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

            </section>

            {isWhenOpen && <When dates={dates} setDates={setDates} />}
            {isWhoOpen && <Who filterCapacity={filterCapacity} setFilterCapacity={setFilterCapacity} />}

        </section>)
}