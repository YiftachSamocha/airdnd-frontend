
import { storageService } from "../async-storage.service.js"
// import { utilService } from '../util.service.js'

const STORAGE_KEY = 'orderDB'
// let orders = _createOrders()

export const orderService = {
    query,
    getById,
    save,
    remove,
}


function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
}

function getById(OrderId) {
    return storageService.get(STORAGE_KEY, OrderId)
}

function remove(OrderId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, OrderId)
}

async function save(order, stay) {
    var savedOrder
    if (order._id) {
        const orderToSave = {
            _id: order._id,
            startDate: order.startDate,
            endDate: order.endDate,
            guests: order.guests,
        }
        savedOrder = await storageService.put(STORAGE_KEY, orderToSave)
    } else {
        const orderToSave = {
            host: order.host,
            guest: order.guest,
            totalPrice: order.totalPrice,
            startDate: order.startDate,
            endDate: order.endDate,
            guests: order.guests,
            stay: {
                // mini-stay
                _id: stay._id,
                name: stay.name,
                price: stay.price,
            },
            msgs: order.msgs, // host - guest chat
            status: order.status,
        }
        savedOrder = await storageService.post(STORAGE_KEY, orderToSave)
    }
    return savedOrder
}




// function _saveOrders(prop) {
//     utilService.saveToStorage(STORAGE_KEY, prop)
// }
