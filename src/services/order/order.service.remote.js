import { httpService } from '../http.service'

export const orderService = {
    query,
    getById,
    save,
    remove,
    addOrderMsg
}

async function query(filterBy = {}) {
    let queryStr = 'order?'
    if (filterBy.host) {
        queryStr += `host=${filterBy.host}&`
    }
    if (filterBy.guest) {
        queryStr += `guest=${filterBy.guest}&`
    }
    if (filterBy.stay) {
        queryStr += `stay=${filterBy.stay}&`
    }

    return httpService.get(queryStr)
}

function getById(orderId) {
    return httpService.get(`order/${orderId}`)
}

async function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}
async function save(order) {
    let savedOrder
    if (order._id) {
        savedOrder = await httpService.put(`order`, order)
    } else {
        savedOrder = await httpService.post('order', order)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    const savedMsg = await httpService.post(`order/${orderId}/msg`, { txt })
    return savedMsg
}