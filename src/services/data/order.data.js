import { getRandomIntInclusive, makeId } from "../util.service";
export function createOrderData(stays, users) {
    const ordersToSave = []
    for (var i = 0; i < stays.length; i++) {
        const stay = stays[i]
        for (var j = 0; j < stay.reservedDates.length; j++) {
            const order = createOrder(stay, j, users)
            ordersToSave.push(order)
        }
    }
    return ordersToSave
}
function createOrder(stay, dateIndex, users) {
    const adults = getRandomIntInclusive(0, 6)
    const children = getRandomIntInclusive(0, 4)
    const infants = getRandomIntInclusive(0, 2)
    const pets = getRandomIntInclusive(0, 2)
    const total = adults + children + infants
    const totalPrice = (total * stay.price.night) + stay.price.cleaning
    const createdAt = new Date(new Date(2024, 7, 1).getTime() + Math.random() * (new Date(2024, 8, 30, 23, 59, 59, 999).getTime() - new Date(2024, 7, 1).getTime()))
    const randomUserIndex = getRandomIntInclusive(0, users.length - 1)
    const guest = users[randomUserIndex]

    return {
        _id: makeId(),
        startDate: new Date(stay.reservedDates[dateIndex].startDate),
        endDate: new Date(stay.reservedDates[dateIndex].endDate),
        capacity: {
            adults, children, infants, pets, total
        },
        stay: {
            _id: stay._id,
            name: stay.name,
            price: stay.price
        },
        totalPrice,
        host: stay.host,
        guest: {
            _id: guest._id,
            fullname: guest.fullname,
            imgUrl: guest.imgUrl,
        },
        createdAt,
        status: getRandomItems(statuses, 1),
    }
}

function getRandomItems(arr, numItems) {
    if (arr.length === 0 || numItems <= 0) return numItems === 1 ? null : []
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    const result = shuffled.slice(0, Math.min(numItems, arr.length))
    return numItems === 1 ? result[0] : result
}

const statuses = ['pending', 'approved', 'declined']