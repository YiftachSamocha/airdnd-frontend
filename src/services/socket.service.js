import io from 'socket.io-client'
import { userService } from './user'

export const SOCKET_EMIT_LOGIN = 'set-user-socket'
export const SOCKET_EMIT_LOGOUT = 'unset-user-socket'
export const SOCKET_EVENT_CHANGE_STATUS = 'change-order-status'
export const SOCKET_EVENT_TAKE_STATUS = 'take-order-status'
export const SOCKET_EVENT_ADD_ORDER = 'add-order'
export const SOCKET_EVENT_TAKE_ORDER = 'take-order'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// for debugging from console
window.socketService = socketService
function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}

socketService.setup()

function createSocketService() {
    var socket = null
    const socketService = {
        setup() {
            socket = io(baseUrl)
            const user = getLoggedinUser()
            if (user) this.login(user._id)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        login(userId) {
            socket.emit(SOCKET_EMIT_LOGIN, userId)
        },
        logout() {
            socket.emit(SOCKET_EMIT_LOGOUT)
        },
        terminate() {
            socket = null
        },

    }
    return socketService
}

function createDummySocketService() {
    var listenersMap = {}
    const socketService = {
        listenersMap,
        setup() {
            listenersMap = {}
        },
        terminate() {
            this.setup()
        },
        login() {
            console.log('Dummy socket service here, login - got it')
        },
        logout() {
            console.log('Dummy socket service here, logout - got it')
        },
        on(eventName, cb) {
            listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
        },
        off(eventName, cb) {
            if (!listenersMap[eventName]) return
            if (!cb) delete listenersMap[eventName]
            else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
        },
        emit(eventName, data) {
            var listeners = listenersMap[eventName]
            if (eventName === SOCKET_EMIT_SEND_MSG) {
                listeners = listenersMap[SOCKET_EVENT_ADD_MSG]
            }

            if (!listeners) return

            listeners.forEach(listener => {
                listener(data)
            })
        },
        // Functions for easy testing of pushed data
        testChatMsg() {
            this.emit(SOCKET_EVENT_ADD_MSG, { from: 'Someone', txt: 'Aha it worked!' })
        },
        testUserUpdate() {
            this.emit(SOCKET_EVENT_USER_UPDATED, { ...userService.getLoggedinUser(), score: 555 })
        }
    }
    window.listenersMap = listenersMap
    return socketService
}
