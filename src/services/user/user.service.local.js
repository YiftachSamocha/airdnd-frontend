import { storageService } from '../async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USER_DB = 'user'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}



async function getUsers() {
    const users = await storageService.query(USER_DB)
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get(USER_DB, userId)
}

function remove(userId) {
    return storageService.remove(USER_DB, userId)
}

async function update({ userToUpdate }) {
    await storageService.put(USER_DB, userToUpdate)

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === userToUpdate._id) saveLoggedinUser(userToUpdate)

    return userToUpdate
}

async function login(userCred) {
    const users = await storageService.query(USER_DB)
    const user = users.find(user => user.username === userCred.username && user.password === userCred.password)
    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post(USER_DB, userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        host: user.host,
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createAdmin() {
    const user = {
        username: 'admin',
        password: 'admin',
        fullname: 'Mustafa Adminsky',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    }

    const newUser = await storageService.post(USER_DB, userCred)
    console.log('newUser: ', newUser)
}