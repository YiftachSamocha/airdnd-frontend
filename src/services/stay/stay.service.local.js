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
    const { where, when, who, label } = filterBy
    if (where && where.country !== 'Im flexible') {
        stays = stays.filter(stay => stay.location.country === where.country && stay.location.city === where.city)
    }
    if (when && when.startDate && when.endDate) {
        stays = stays.filter(stay => _filterWhen(stay.reservedDates, when))
    }
    if (who) {
        stays = stays.filter(stay => _filterWho(stay.sleep, who))
    }
    if (label && label.label !== 'icons') {
        stays = stays.filter(stay =>
            stay.labels.some(lbl => lbl.label === label.label)
        )
    }

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

function _filterWhen(reservedDates, vacationRange) {
    const vacationStart = vacationRange.startDate
    const vacationEnd = vacationRange.endDate


    return !reservedDates.some(({ start, end }) => {
        const reservedStart = new Date(start)
        const reservedEnd = new Date(end)
        console.log(vacationStart, reservedStart, vacationStart <= reservedStart)


        if (vacationStart >= reservedStart && vacationStart <= reservedEnd) return true
        if (vacationEnd >= reservedStart && vacationEnd <= reservedEnd) return true
        if (vacationStart <= reservedStart && vacationEnd >= reservedEnd) return true
        return false

    })
}

function _filterWho(sleep, who) {
    const amount = who.adults + who.children + who.infants
    if (amount === 0) return true
    if (sleep.maxCapacity < amount) return false
    const minimumCapacity = sleep.rooms.length
    if (minimumCapacity > amount) return false
    return true

}