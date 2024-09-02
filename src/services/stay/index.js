const { DEV, VITE_LOCAL } = import.meta.env

import { getData } from '../stay.data'
import { getRandomIntInclusive, makeId } from '../util.service'
import iconsImg from '../../assets/imgs/labels/icons.webp'
import { stayService as local } from './stay.service.local'
import { stayService as remote } from './stay.service.remote'

function getEmptyStay() {
    return {
        vendor: makeId(),
        speed: getRandomIntInclusive(80, 240),
        msgs: [],
    }
}

function getDefaultFilter() {
    return {
        where: { country: '', city: '' },
        when: { startDate: null, endDate: null, },
        who: { adults: 0, children: 0, infants: 0, pets: 0 },
        label: { label: 'icons', img: iconsImg },
        extra: {
            type: 'any',
            rooms: { rooms: 0, bedrooms: 0, bathrooms: 0 },
            price: [0, 3000],
            maxPrice: 3000,
            amenities: getData('mainAmenities'),
            booking: { instant: false, self: false, pets: false },
            standout: { favorite: false, luxe: false },
        }
    }
}


const service = VITE_LOCAL === 'true' ? local : remote
console.log('VITE_LOCAL_STAY:' + VITE_LOCAL)
export const stayService = { getEmptyStay, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stayService = stayService
