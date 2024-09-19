//Function from Host Reservations cmp- Changing order status
async function changeStatus(order, newStatus) {
    const updatedOrder = { ...order, status: newStatus }
    await updateOrder(updatedOrder)
    socketService.emit('change-order-status', updatedOrder)
}

//Use Effect from Trips page, setting new status for order
useEffect(() => {
    socketService.on('take-order-status', updatedOrder => {
        setOrders(prevOrders => {
            return prevOrders.map(order => {
                if (order._id === updatedOrder._id) return updatedOrder
                return order
            })
        })
    })
    return () => {
        socketService.off('take-order-status')
    }
}, [])