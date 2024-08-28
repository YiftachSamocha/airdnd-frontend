import { orderService } from '../../services/order/order.service.local'
import { store } from '../store'
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS, SET_ORDER, UPDATE_ORDER } from '../reducers/order.reducer.js'



export async function loadOrders(filterBy={}) {
    try {
        const orders = await orderService.query(filterBy)
        store.dispatch(getCmdSetOrders(orders))
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}

export async function loadOrder(orderId) {
    try {
        const order = await orderService.getById(orderId)
        store.dispatch(getCmdSetOrder(order))
    } catch (err) {
        console.log('Cannot load order', err)
        throw err
    }
}


export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId)
        store.dispatch(getCmdRemoveOrder(orderId))
    } catch (err) {
        console.log('Cannot remove order', err)
        throw err
    }
}

export async function addOrder(order, stay) {
    console.log('order',order);
    
    try {
        const savedOrder = await orderService.save(order, stay)
        store.dispatch(getCmdAddOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}

export async function updateOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch(getCmdUpdateOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot save order', err)
        throw err
    }
}

export async function addOrderMsg(orderId, txt) {
    try {
        const msg = await orderService.addOrderMsg(orderId, txt)
        store.dispatch(getCmdAddOrderMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add order msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetOrders(orders) {
    return {
        type: SET_ORDERS,
        orders
    }
}
function getCmdSetOrder(order) {
    return {
        type: SET_ORDER,
        order
    }
}
function getCmdRemoveOrder(orderId) {
    return {
        type: REMOVE_ORDER,
        orderId
    }
}
function getCmdAddOrder(order) {
    return {
        type: ADD_ORDER,
        order
    }
}
function getCmdUpdateOrder(order) {
    return {
        type: UPDATE_ORDER,
        order
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadOrders()
    await addOrder(OrderService.getEmptyOrder())
    await updateOrder({
        _id: 'm1oC7',
        title: 'order-Good',
    })
    await removeOrder('m1oC7')
    // TODO unit test addorderMsg
}