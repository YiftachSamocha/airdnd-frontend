import { useSelector } from "react-redux";
import { AppHeader } from "../cmps/AppHeader";
import { useEffect, useState } from "react";
import { loadOrders } from "../store/actions/order.action";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import inviteImg from '../assets/imgs/invite.png'
import familyImg from '../assets/imgs/family.webp'
import { SOCKET_EVENT_TAKE_ORDER, SOCKET_EVENT_TAKE_STATUS, socketService } from "../services/socket.service";

export function Trips() {
    const currUser = useSelector(state => state.userModule.currUser)
    const [trips, setTrips] = useState([])
    let guestId = currUser ? currUser._id : ''
    const navigate = useNavigate()

    useEffect(() => {
        onLoadOrders()
    }, [currUser])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_TAKE_STATUS, newOrder => {
            onLoadOrders()
        })
        return () => {
            socketService.off(SOCKET_EVENT_TAKE_STATUS)
        }
    }, [])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_TAKE_ORDER, order => {
            onLoadOrders()
        })

        return () => {
            socketService.off(SOCKET_EVENT_TAKE_ORDER)
        }
    }, [])

    async function onLoadOrders() {
        const newOrders = await loadOrders({ guest: guestId })
        setTrips(newOrders)
    }

    function formatDate(date) {
        return format(date, 'MMM d')
    }

    return <section className="trips">
        <AppHeader />
        {!currUser ? <div className="no-trips">Log in to watch your trips</div> : <div>
            <h2>Trips</h2>
            <div className="invite">
                <div className="invite-info">
                    <img src={inviteImg} alt="" />
                    <h5>{trips.length ? 'Book new trip' : 'No trips booked...yet!'}</h5>
                    <p>Time to dust off your bags and start planning your next adventure.</p>
                    <button onClick={() => navigate('/stay')}>Start Searching</button>
                </div>
                <img src={familyImg} />
            </div>
            <div className="trip-list">
                {trips.map(trip => {
                    return <div key={trip._id} className='trip-item' onClick={() => navigate('/stay/' + trip.stay._id)}>
                        <img src={trip.stay.img} />
                        <div className="item-info">
                            <p>{trip.stay.location}</p>
                            <p>{formatDate(trip.startDate) + ' - ' + formatDate(trip.endDate)}</p>
                            <p>{trip.totalPrice}$</p>
                            <p className={`status ${trip.status.toLowerCase()}`}>{trip.status}</p>
                        </div>
                    </div>
                })}
            </div>

            {trips.length === 0 && <div>No trips yet</div>}
        </div>}
    </section>




}