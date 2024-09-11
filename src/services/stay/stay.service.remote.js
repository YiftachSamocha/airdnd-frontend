import { format } from 'date-fns'
import { httpService } from '../http.service'

export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg
}

async function query(filterBy = {}) {
    let queryStr = 'stay?'
    const { where, when, who, label, extra } = filterBy
    if (where && where.city && where.country) {
        queryStr += `city=${where.city}&country=${where.country}&`
    }
    if (when && when.startDate && when.endDate) {
        queryStr += `startDate=${format(when.startDate, 'yyyy-MM-dd')}&endDate=${format(when.endDate, 'yyyy-MM-dd')}&`
    }
    if (who) {
        if (who.adults) {
            queryStr += `adults=${who.adults}&`
        }
        if (who.children) {
            queryStr += `children=${who.children}&`
        }
        if (who.infants) {
            queryStr += `infants=${who.infants}&`
        }
    }
    if (label && label.label !== 'icons') {
        queryStr += `label=${label.label}`
    }
    if (extra) {
        if (extra.type && extra.type !== 'any') {
            queryStr += `type=${extra.type}&`
        }

        if (extra.price && !(extra.price[0] === 40 && extra.price[1] === 3000)) {
            const priceStr = `price=${extra.price[0]}&price=${extra.price[1]}`
            queryStr += priceStr + '&'
        }
        if (extra.rooms && (extra.rooms.rooms || extra.rooms.bathrooms || extra.rooms.bedrooms)) {
            const roomsParams = new URLSearchParams();
            if (extra.rooms.rooms) roomsParams.append('rooms[rooms]', extra.rooms.rooms);
            if (extra.rooms.bathrooms) roomsParams.append('rooms[bathrooms]', extra.rooms.bathrooms);
            if (extra.rooms.bedrooms) roomsParams.append('rooms[bedrooms]', extra.rooms.bedrooms);
            queryStr += roomsParams.toString() + '&';
        }
        if (extra.amenities) {
            let amenities = extra.amenities.filter(amenity => amenity.isSelected)
            amenities = amenities.map(amenity => amenity.name)
            if (amenities.length > 0) {
                for (var i = 0; i < amenities.length; i++) {
                    queryStr += `amenities=${amenities[i]}&`
                }
            }
        }

        if (extra.booking && (extra.booking.instant || extra.booking.pets || extra.booking.self)) {
            const bookingParams = new URLSearchParams();
            if (extra.booking.instant) bookingParams.append('booking[instant]', extra.booking.instant);
            if (extra.booking.pets) bookingParams.append('booking[pets]', extra.booking.pets);
            if (extra.booking.self) bookingParams.append('booking[self]', extra.booking.self);
            queryStr += bookingParams.toString() + '&';
        }

        if (extra.standout && (extra.standout.favorite || extra.standout.luxe)) {
            const standoutParams = new URLSearchParams();
            if (extra.standout.favorite) standoutParams.append('standout[favorite]', extra.standout.favorite);
            if (extra.standout.luxe) standoutParams.append('standout[luxe]', extra.standout.luxe);
            queryStr += standoutParams.toString() + '&';
        }
        
    }
    return httpService.get(queryStr)
}

function getById(stayId) {
    return httpService.get(`stay/${stayId} `)
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId} `)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        console.log('saving')
        savedStay = await httpService.put('stay', stay)
    } else {
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay / ${stayId}/msg`, { txt })
    return savedMsg
}