import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import { createStay } from '../stay.data'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg
}
window.cs = stayService

_createData()

async function query(filterBy = {}) {
    var stays = await storageService.query(STORAGE_KEY)
    // console.log('service stays:', stays)
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,
            price: stay.price,
            speed: stay.speed,
        }
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            vendor: stay.vendor,
            price: stay.price,
            speed: stay.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedStay = await storageService.post(STORAGE_KEY, stayToSave)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function _createData(length = 24) {
    const currData = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!currData || currData.length === 0) {
        const stays = []
        for (var i = 0; i < length; i++) {
            const stay = createStay()
            stays.push(stay)
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stays))
    }

}