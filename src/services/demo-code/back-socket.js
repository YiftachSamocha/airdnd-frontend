//Socket service
export function setupSocketAPI(http) {
    gIo = new Server(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        logger.info(`New connected socket [id: ${socket.id}]`)
        socket.on('disconnect', socket => {
            logger.info(`Socket disconnected [id: ${socket.id}]`)
        })

        socket.on('change-order-status', order => {
            logger.info(`user ${order.host.fullname} changed order status`)
            gIo.emit('take-order-status', order)
        })

        socket.on('add-order', order => {
            logger.info(`user ${order.guest.fullname} ordered stay from ${order.host.fullname}`)
            gIo.emit('take-order', order)
        })

    })
}