import { userService } from "../../services/user"

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_CURR_USER = 'SET_CURR_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const ADD_HOST_INFO_TO_USER = 'ADD_HOST_INFO_TO_USER'
export const ADD_STAY_TO_HOST = 'ADD_STAY_TO_HOST_'

const initialState = {
    currUser: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_CURR_USER:
            newState = { ...state, currUser: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case ADD_HOST_INFO_TO_USER:// Add host property with empty listings if not already present
            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    host: {
                        ...action.hostDetails,
                        listings: []
                    }
                }
            }
            case ADD_STAY_TO_HOST:  // Add the stay to the host's listings
            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    host: {
                        ...state.currUser.host,
                        listings: [...state.currUser.host.listings, action.stayId] // Append new stay to listings
                    }
                }
            };

        default:
    }
            // For debug:
            // window.userState = newState
            // console.log('State:', newState)
            return newState
    }
