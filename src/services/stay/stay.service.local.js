import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import { createStayData } from '../stay.data'
import { createUsersData } from '../user.data'

const STAY_STORAGE_KEY = 'stay'
const USER_STORAGE_KEY = 'user'

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
    var stays = await storageService.query(STAY_STORAGE_KEY)
    const { where, when, who, label, extra } = filterBy
    if (where && where.city && where.country && where.country !== 'Im flexible') {
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
    if (extra) {
        stays = stays.filter(stay => _filterExtra(stay, extra))
    }

    return stays
}

function getById(stayId) {
    return storageService.get(STAY_STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STAY_STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,
            price: stay.price,
            speed: stay.speed,
        }
        savedStay = await storageService.put(STAY_STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            vendor: stay.vendor,
            price: stay.price,
            speed: stay.speed,
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedStay = await storageService.post(STAY_STORAGE_KEY, stayToSave)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const stay = await getById(stayId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STAY_STORAGE_KEY, stay)

    return msg
}

async function _createData(listingsPerHost = 2) {
    const currStayData = JSON.parse(localStorage.getItem(STAY_STORAGE_KEY))
    let newStays = []
    if (!currStayData || currStayData.length === 0) {
        newStays = await createStayData(listingsPerHost)
        localStorage.setItem(STAY_STORAGE_KEY, JSON.stringify(newStays))

        const currUserData = JSON.parse(localStorage.getItem(USER_STORAGE_KEY))
        if (!currUserData || currUserData.length === 0) {
            const users = await createUsersData(newStays)
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users))
        }
    }

}

function _filterWhen(reservedDates, vacationRange) {
    const vacationStart = vacationRange.startDate
    const vacationEnd = vacationRange.endDate


    return !reservedDates.some(({ start, end }) => {
        const reservedStart = new Date(start)
        const reservedEnd = new Date(end)


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

function _filterExtra(stay, extra) {
    const { type, price, rooms, amenities, booking, standout } = extra
    const filterAmenities = amenities.filter(amenity => amenity.isSelected)
    if (!filterAmenities.every(amenity =>
        stay.amenities.some(stayAmenity => stayAmenity.name === amenity.name))) return false
    if (type !== 'any' && type !== stay.type) return false
    if (price[0] + price[1] !== 0) {
        if (stay.price.night < price[0] || stay.price.night > price[1]) return false
    }
    if ((rooms.bedrooms + rooms.rooms + rooms.bathrooms) !== 0) {
        if (stay.sleep.bedrooms < rooms.bedrooms || stay.sleep.bathrooms < rooms.bathrooms || stay.sleep.rooms.length < rooms.rooms) return false
    }
    if (booking.instant && !stay.highlights.some(highlight => highlight.main === 'Great check-in experience')) return false
    if (booking.self && !stay.highlights.some(highlight => highlight.main === 'Self check-in')) return false
    if (booking.pets && !stay.highlights.some(highlight => highlight.main === 'Pet-friendly')) return false
    if (standout.favorite && !stay.highlights.some(highlight => highlight.main === 'Great value')) return false
    if (standout.luxe && !stay.labels.some(label => label.label === 'luxe')) return false
    return true
}
