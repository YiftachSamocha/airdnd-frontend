
import { storageService } from "../async-storage.service.js"
import { makeId } from "../util.service.js"
// import { utilService } from '../util.service.js'

const STORAGE_KEY = 'order'
// let orders = _createOrders()

export const orderService = {
    query,
    getById,
    save,
    remove,
}


async function query(filterBy = {}) {
    let orders = await storageService.query(STORAGE_KEY)
    if (filterBy.host) {
        orders = orders.filter(order => order.host._id === filterBy.host)
    }
    if (filterBy.guest) {
        orders = orders.filter(order => order.guest._id === filterBy.guest)
    }
    return orders
}

function getById(OrderId) {
    return storageService.get(STORAGE_KEY, OrderId)
}

function remove(OrderId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, OrderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        order._id= makeId()
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}




// function _saveOrders(prop) {
//     utilService.saveToStorage(STORAGE_KEY, prop)
// }
