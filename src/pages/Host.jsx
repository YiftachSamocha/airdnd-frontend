import { useSelector } from "react-redux";
import { AppHeader } from "../cmps/AppHeader";
import { Listings } from "../cmps/HostCmps/Listings";
import { Reservations } from "../cmps/HostCmps/Reservations";
import { useEffect } from "react";
import { loadOrders } from "../store/actions/order.action";

export function Host() {
    const orders = useSelector(state => state.orderModule.orders)
    const currUser = useSelector(state => state.userModule.currUser)
    let hostId = currUser ? currUser._id : ''

    useEffect(() => {
        loadOrders({ host: hostId });
    }, [currUser])

    return <section>
        <AppHeader />
        <Reservations orders={orders} />
        <Listings orders={orders} />

    </section>
}