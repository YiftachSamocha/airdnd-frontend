const { DEV, VITE_LOCAL } = import.meta.env

import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'


    function getEmptyOrder() {
        return {
            host: {
                //  _id, fullname, imgUrl
                 },
            guest: {
                // _id,
                // fullname,
            },
            totalPrice:'',
            startDate:'',
            endDate:'',
            guests: {
                adults:'',
                kids:'',
            },
            stay: {
                // mini-stay
                // stay:stay._id,
                // name: '',
                // price,
            },
            msgs: [], // host - guest chat
            status: '', // approved / rejected /pending
        }
    }



const service = VITE_LOCAL === 'true' ? local : remote
export const orderService = { ...service,  getEmptyOrder }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.orderService = orderService
