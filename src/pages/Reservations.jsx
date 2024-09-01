import { useParams } from "react-router";
import { loadOrders } from "../store/actions/order.action";
import { format } from "date-fns";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function Reservations() {
    const { hostId } = useParams()
    const reservations = useSelector(state=> state.orderModule.orders)

    useEffect(()=>{
        loadOrders({ host: hostId })
    },[])

    function formatDate(date) {
        return format(date, 'yyyy-MM-dd')
    }

    return <section className="reservations">
        <h2>Reservations</h2>
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
                        <th>{reservation.stay.name}</th>
                        <th>{reservation.totalPrice}</th>
                        <th></th>
                    </tr>
                })}
            </tbody>
        </table>
    </section>

}