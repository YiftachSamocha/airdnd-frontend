import { loadOrders, updateOrder } from "../store/actions/order.action";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppHeader } from "../cmps/AppHeader";
import { Link } from "react-router-dom";

export function Reservations() {
    const allOrders = useSelector(state => state.orderModule.orders)
    const currUser = useSelector(state => state.userModule.currUser)
    const [reservations, setReservations] = useState([])
    const [filterBy, setFilterBy] = useState({ type: 'all' })
    let hostId = currUser ? currUser._id : ''


    useEffect(() => {
        loadOrders({ host: hostId });
    }, [currUser])

    useEffect(() => {
        if (filterBy.type !== 'all') {
            const newRes = allOrders.filter(res => res.status === filterBy.type)
            setReservations(newRes)
        } else {
            setReservations(allOrders)
        }
    }, [filterBy, allOrders])

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
            <div className="reservations-filter">
                <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'approved' }))}
                    className={filterBy.type === 'approved' ? 'selected' : ''} >Aprroved</button>
                <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'pending' }))}
                    className={filterBy.type === 'pending' ? 'selected' : ''} >Pending</button>
                <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'declined' }))}
                    className={filterBy.type === 'declined' ? 'selected' : ''}>Declined</button>
                <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'all' }))}
                    className={filterBy.type === 'all' ? 'selected' : ''} >All</button>

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
                        {(filterBy.type === 'all' || filterBy.type === 'pending') && <th>Action</th>}
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
                            {(filterBy.type === 'all' || filterBy.type === 'pending') && <th className="th-actions">
                                {reservation.status === 'pending' && <><button onClick={() => changeStatus(reservation, 'approved')} >Approve</button>
                                    <button onClick={() => changeStatus(reservation, 'declined')} >Decline</button></>}
                            </th>}
                        </tr>
                    })}
                </tbody>
            </table>
            {allOrders.length === 0 && <div>No reservations yet</div>}
        </div>}
    </section>

}