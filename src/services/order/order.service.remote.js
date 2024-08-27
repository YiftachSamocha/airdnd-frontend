import { httpService } from '../http.service'

export const orderService = {
    query,
    getById,
    save,
    remove,
    addOrderMsg
}

async function query(filterBy = {}) {
    return httpService.get(`book/stay`, filterBy)
}

function getById(orderId) {
    return httpService.get(`book/stay/${orderId}`)
}

async function remove(orderId) {
    return httpService.delete(`book/stay/${orderId}`)
}
async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await httpService.put(`book/stay/${order._id}`, order)
    } else {
        savedOrder = await httpService.post('book/stay/', order)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    const savedMsg = await httpService.post(`book/stay/${orderId}/msg`, {txt})
    return savedMsg
}