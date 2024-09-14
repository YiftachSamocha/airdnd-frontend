import { useSelector } from "react-redux";
import { AppHeader } from "../cmps/AppHeader";
import { Listings } from "../cmps/HostCmps/Listings";
import { Reservations } from "../cmps/HostCmps/Reservations";
import { useEffect, useState } from "react";
import { loadOrders } from "../store/actions/order.action";
import { Dashboard } from "../cmps/HostCmps/Dashboard";
import { loadStays } from "../store/actions/stay.actions";
import securityIcon from '../assets/imgs/icons/security.svg'
import starIcon from '../assets/imgs/icons/star.svg'
import { SOCKET_EVENT_TAKE_ORDER, socketService } from "../services/socket.service";

export function Host() {
    const allOrders = useSelector(state => state.orderModule.orders)
    const [orders, setOrders] = useState([])
    const [stays, setStays] = useState([])
    const currUser = useSelector(state => state.userModule.currUser)
    let hostId = currUser ? currUser._id : ''

    useEffect(() => {
        if (currUser) {
            loadOrders({ host: hostId })
                .then(res => setOrders(res))
        }
    }, [currUser, allOrders])

    useEffect(() => {
        if (currUser) {
            loadStays({})
                .then(stays => {
                    const newStays = stays.filter(stay => stay.host._id === currUser._id)
                    setStays(newStays)
                })
        }
    }, [currUser])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_TAKE_ORDER, order => {
            setOrders(prev => {
                return [order, ...prev]
            })
        })

        return () => {
            socketService.off(SOCKET_EVENT_TAKE_ORDER)
        }
    }, [])

    if (!currUser) return <div>Log in to watch your host details</div>
    return <section className="host">
        <AppHeader />
        <div className="host-header">
            <div className="host-details">
                <div className="host">
                    <div className="host-stats">
                        <div className="personal">
                            <div className="host-img-container">
                                <img src={currUser.imgUrl} className="host-img" />
                                <div className="icon-container">
                                    <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: "#e00b41", stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: "#c21c54", stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="50" cy="50" r="35" fill="url(#redGradient)" />
                                    </svg>
                                    <img src={securityIcon} className="security-icon" />
                                </div>
                            </div>
                            <div className='host-name'>
                                <h2>{currUser.fullname}</h2>
                                <span>Host</span>
                            </div>

                        </div>
                        <div className="stats">
                            <div className="reviews">
                                <span>{currUser.host.reviews}</span>
                                <span>Reviews</span>
                            </div>
                            <hr className="details-seperation-line"></hr>

                            <div className="rating">
                                <div>
                                    <span>{currUser.host.rating}</span>
                                    <img src={starIcon} />
                                </div>
                                <span>Rating</span>
                            </div>
                            <hr className="details-seperation-line"></hr>

                            <div className="hosting-time">
                                <span>{currUser.host.yearsHosting}</span>
                                <span>Years Hosting</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Dashboard orders={orders} stays={stays} />
        </div>
        <Reservations orders={orders} listings={stays} />
        <Listings listings={stays} />


    </section>
}