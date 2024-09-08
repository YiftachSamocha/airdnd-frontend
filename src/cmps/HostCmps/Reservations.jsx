import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateOrder } from "../../store/actions/order.action";
import { useSelector } from "react-redux";
import arrowRight from '../../assets/imgs/arrow-right.png'
import arrowLeft from '../../assets/imgs/arrow-left.png'

export function Reservations({ orders, listings }) {
    const [reservations, setReservations] = useState([])
    const [filterBy, setFilterBy] = useState({ type: 'all', listing: 'all', page: 0 })
    const currUser = useSelector(state => state.userModule.currUser)
    const PAGE_SIZE = 5

    useEffect(() => {
        let newRes = [...orders]
        if (filterBy.type !== 'all') {
            newRes = newRes.filter(res => res.status === filterBy.type)
        }
        if (filterBy.listing !== 'all') {
            newRes = newRes.filter(res => res.stay._id === filterBy.listing)
        }
        //const totalFilteredReservations = newRes.length;
        const start = filterBy.page * PAGE_SIZE
        const end = start + PAGE_SIZE
        newRes = newRes.slice(start, end)
        setReservations(newRes)
    }, [filterBy, orders])

    function formatDate(date) {
        return format(date, 'yyyy-MM-dd')
    }

    function changeStatus(order, newStatus) {
        updateOrder({ ...order, status: newStatus })
    }

    function onChangeListing({ target }) {
        const { value } = target
        setFilterBy(prev => ({ ...prev, listing: value, page: 0 }))
    }

    function onChangePage(rightLeft) {
        const totalFilteredReservations = orders
            .filter(res => filterBy.type === 'all' || res.status === filterBy.type)
            .filter(res => filterBy.listing === 'all' || res.stay._id === filterBy.listing)
        const totalPages = Math.ceil(totalFilteredReservations.length / PAGE_SIZE)
        if (rightLeft + filterBy.page < 0) return
        if (rightLeft + filterBy.page >= totalPages) return
        setFilterBy(prev => ({ ...prev, page: prev.page + rightLeft }))
    }

    return <section className="reservations">

        {!currUser ? <div>Log in to watch your reservations</div> : <div>
            <h2>Your Reservations</h2>
            <div className="reservations-filter">
                <div className="filter-type">
                    <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'all', page: 0 }))}
                        className={filterBy.type === 'all' ? 'selected' : ''} >All</button>
                    <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'approved', page: 0 }))}
                        className={filterBy.type === 'approved' ? 'selected' : ''} >Aprroved</button>
                    <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'pending', page: 0 }))}
                        className={filterBy.type === 'pending' ? 'selected' : ''} >Pending</button>
                    <button onClick={() => setFilterBy(prev => ({ ...prev, type: 'declined', page: 0 }))}
                        className={filterBy.type === 'declined' ? 'selected' : ''}>Declined</button>
                </div>
                <div className="filter-listing">
                    <label htmlFor="listing">Listing</label>
                    <select name="" id="listing" onChange={onChangeListing}>
                        <option value="all" >All</option>
                        {listings.map(listing => {
                            return <option value={listing._id}>{listing.name}</option>
                        })}
                    </select>
                </div>
                <div className="filter-page">
                    <button onClick={() => onChangePage(-1)}><img src={arrowLeft} /></button>
                    <span>{filterBy.page + 1}</span>
                    <button onClick={() => onChangePage(1)}><img src={arrowRight} /></button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        {filterBy.type === 'all' && <th>Status</th>}
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
                            {filterBy.type === 'all' && <td className={`status ${reservation.status.toLowerCase()}`}>{reservation.status}</td>}
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
            {orders.length === 0 && <div>No reservations yet</div>}
        </div>}
    </section>

}