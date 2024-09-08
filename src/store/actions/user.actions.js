import { userService } from '../../services/user/user.service.remote'
//import { socketService } from '../../services/socket.service'
import { store } from '../store'
import { showErrorMsg } from '../../services/event-bus.service'
import { REMOVE_USER, SET_CURR_USER, SET_USERS, SET_WATCHED_USER, ADD_HOST_INFO_TO_USER, ADD_STAY_TO_HOST } from '../reducers/user.reducer'
import { makeId } from '../../services/util.service'

export async function loadUsers() {
    try {
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_CURR_USER,
            user
        })
        //socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_CURR_USER,
            user
        })
        //socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_CURR_USER,
            user: null
        })
        // socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export function addHostInfoToUser(user) {
    const hostDetails = {
        reviews: [],
        rating: 0,
        yearsHosting: [],
        responseRate: 100,
        listings: [],
        createdAt: new Date(),  
    }
    const updatedUser = { ...user, host: hostDetails };


    try {
        userService.update({ userToUpdate: updatedUser });
        store.dispatch({type: ADD_HOST_INFO_TO_USER, hostDetails})
    } 
    catch (err) {
        showErrorMsg('Cannot turn user to host')
        console.log('Cannot turn user to host', err)
    }
}

export function addStayToHost(stayId) {
    // Get the current logged-in user
    const loggedinUser = userService.getLoggedinUser();

    // Add the stay to the user's listings
    const updatedUser = {
        ...loggedinUser,
        host: {
            ...loggedinUser.host,
            listings: [...loggedinUser.host.listings, stayId]  // Add new stay to listings
        }
    };

    try {
        // Dispatch the action to update the Redux store
        store.dispatch({
            type: 'ADD_STAY_TO_HOST',
            stayId
        });

        // Update the user in the storage to persist the change
        userService.update({ userToUpdate: updatedUser });

        // No need to manually save to session storage as update handles it
    } catch (err) {
        showErrorMsg('Cannot add stay to host listings');
        console.log('Cannot add stay to host listings', err);
    }
}