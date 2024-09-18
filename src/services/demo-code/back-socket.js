//Socket service
socket.on('change-order-status', updatedOrder => {
    logger.info(`user ${updatedOrder.host.fullname} changed order status`)
    gIo.emit('take-order-status', updatedOrder)
})

