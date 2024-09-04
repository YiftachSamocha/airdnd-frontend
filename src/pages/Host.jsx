import { useSelector } from "react-redux";
import { AppHeader } from "../cmps/AppHeader";
import { Listings } from "../cmps/HostCmps/Listings";
import { Reservations } from "../cmps/HostCmps/Reservations";
import { useEffect, useState } from "react";
import { loadOrders } from "../store/actions/order.action";
import { Dashboard } from "../cmps/HostCmps/Dashboard";
import { loadStays } from "../store/actions/stay.actions";

export function Host() {
    const orders = useSelector(state => state.orderModule.orders)
    const [stays, setStays]= useState([])
    const currUser = useSelector(state => state.userModule.currUser)
    let hostId = currUser ? currUser._id : ''

    useEffect(() => {
        loadOrders({ host: hostId });
    }, [currUser])

    useEffect(() => {
        if (orders && orders.length > 0) {
            loadStays({})
                .then(stays => {
                    const newStays = stays.filter(stay => stay.host._id === currUser._id)
                    setStays(newStays)
                })
        }
    }, [orders])

    return <section>
        <AppHeader />
        <Dashboard orders={orders} stays={stays} />
        <Reservations orders={orders} />
        <Listings listings={stays} />


    </section>
}