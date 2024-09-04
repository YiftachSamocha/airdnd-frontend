import { useSelector } from "react-redux";
import { AppHeader } from "../cmps/AppHeader";
import { useEffect, useState } from "react";
import { loadOrders } from "../store/actions/order.action";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export function Trips() {
    const currUser = useSelector(state => state.userModule.currUser)
    const [trips, setTrips] = useState([])
    let guestId = currUser ? currUser._id : ''


    useEffect(() => {
        loadOrders({ guest: guestId })
            .then(newOrders => {
                setTrips(newOrders)
            })

    }, [currUser])

    function formatDate(date) {
        return format(date, 'yyyy-MM-dd')
    }

    return <section className="trips">
        <AppHeader />
        {!currUser ? <div>Log in to watch your trips</div> : <div>
            <h2>Trips</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Host</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip => {
                        return <tr key={trip._id}>
                            <th><Link to={'/stay/' + trip.stay._id} >{trip.stay.name}</Link></th>
                            <th>{trip.host.fullname}</th>
                            <th>{formatDate(trip.startDate)}</th>
                            <th>{formatDate(trip.endDate)}</th>
                            <th>{trip.totalPrice}</th>
                            <th className={`status ${trip.status.toLowerCase()}`}>{trip.status}</th>
                        </tr>
                    })}
                </tbody>
            </table>
            {trips.length === 0 && <div>No trips yet</div>}
        </div>}
    </section>




}