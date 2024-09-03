import { loadOrders, updateOrder } from "../store/actions/order.action";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppHeader } from "../cmps/AppHeader";
import { Link } from "react-router-dom";

export function Reservations() {
    const reservations = useSelector(state => state.orderModule.orders)
    const currUser = useSelector(state => state.userModule.currUser)
    const [filterBy, setFilterBy] = useState({ type: 'all' })
    let hostId = currUser ? currUser._id : ''


    useEffect(() => {
        loadOrders({ host: hostId })
    }, [currUser, reservations])

    function formatDate(date) {
        return format(date, 'yyyy-MM-dd')
    }

    function changeStatus(stay, newStatus) {
        updateOrder({ ...stay, status: newStatus })
    }

    return <section className="reservations">
        <AppHeader />
        {!currUser ? <div>Log in to watch your reservations</div> : <div>
            <h2>Reservations</h2>
            <div>
                <button>Aprroved</button>
                <button>Declined</button>
                <button>Pending</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Guests</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Booked</th>
                        <th>Listing</th>
                        <th>Total payout</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => {
                        return <tr key={reservation._id}>
                            <td className={`status ${reservation.status.toLowerCase()}`}>{reservation.status}</td>
                            <th>{reservation.capacity.total}</th>
                            <th>{formatDate(reservation.startDate)}</th>
                            <th>{formatDate(reservation.endDate)}</th>
                            <th>{formatDate(reservation.createdAt)}</th>
                            <th><Link to={'/stay/' + reservation.stay._id} >{reservation.stay.name}</Link></th>
                            <th>{reservation.totalPrice}</th>
                            <th>
                                {reservation.status === 'pending' && <><button onClick={() => changeStatus(reservation, 'approved')} >Approve</button>
                                    <button onClick={() => changeStatus(reservation, 'declined')} >Decline</button></>}
                            </th>
                        </tr>
                    })}
                </tbody>
            </table>
            {reservations.length === 0 && <div>No reservations yet</div>}
        </div>}
    </section>

}