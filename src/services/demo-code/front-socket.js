//Function from Host Reservations cmp- Changing order status
async function changeStatus(order, newStatus) {
    const updatedOrder = { ...order, status: newStatus }
    await updateOrder(updatedOrder)
    socketService.emit(SOCKET_EVENT_CHANGE_STATUS, updatedOrder)
}

//Use Effect from Trips page, setting new status for order
useEffect(() => {
    socketService.on(SOCKET_EVENT_TAKE_STATUS, newOrder => {
        setTrips(prevTrips => {
            return prevTrips.map(trip => {
                if (trip._id === newOrder._id) return newOrder
                return trip
            })
        })
    })
    return () => {
        socketService.off(SOCKET_EVENT_TAKE_STATUS)
    }
}, [])