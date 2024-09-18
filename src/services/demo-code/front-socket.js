//Function from Host Reservations cmp- Changing order status
async function changeStatus(order, newStatus) {
    const updatedOrder = { ...order, status: newStatus }
    await updateOrder(updatedOrder)
    socketService.emit(SOCKET_EVENT_CHANGE_STATUS, updatedOrder)
}

//Use Effect from Trips page, setting new status for order
useEffect(() => {
    socketService.on(SOCKET_EVENT_TAKE_STATUS, updatedOrder => {
        setOrders(prevOrders => {
            return prevOrders.map(order => {
                if (order._id === updatedOrder._id) return updatedOrder
                return order
            })
        })
    })
    return () => {
        socketService.off(SOCKET_EVENT_TAKE_STATUS)
    }
}, [])