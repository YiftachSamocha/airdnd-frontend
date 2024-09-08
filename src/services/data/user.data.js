import { getData } from "./stay.data"
import { getRandomIntInclusive, makeId } from "../util.service"

export function createUserData(hostsPerLoc = 1, additionalUsersAmount = 20) {
    const usersToSave = []
    //CREATE HOSTS
    for (var i = 0; i < locations.length; i++) {
        for (var j = 0; j < hostsPerLoc; j++) {
            const user = createUser()
            user.host = createHost()
            usersToSave.push(user)
        }
    }

    //CREATE NORMAL USERS
    for (var i = 0; i < additionalUsersAmount; i++) {
        const user = createUser()
        usersToSave.push(user)
    }
    return usersToSave
}

function createUser() {
    const isFemale = Math.random() < 0.5
    const fullname = isFemale ? getRandomItems(womenNames, 1) : getRandomItems(menNames, 1)
    const imgUrl = isFemale ? getRandomItems(womanImgs, 1) : getRandomItems(menImgs, 1)
    return {
        _id: makeId(),
        fullname,
        imgUrl,
        username: getRandomItems(usernames, 1),
        password: getRandomItems(passwords, 1),
    }

}

function createHost() {
    const location = getRandomItems(locations, 1)
    return {
        reviews: getRandomIntInclusive(3, 100),
        rating: Math.round((Math.random() * 4 + 1) * 100) / 100,
        yearsHosting: getRandomIntInclusive(1, 15),
        responseRate: getRandomIntInclusive(80, 100),
        personalDetails: createPersonalDetails(location),
        location,
        listings: []
    }
}


function createPersonalDetails(location) {
    return {
        work: {
            name: getRandomItems(workOptions, 1),
            imgUrl: '../assets/imgs/icons/work.svg'
        },
        favoriteSong: {
            name: getRandomItems(favoriteSongs, 1),
            imgUrl: '../assets/imgs/icons/song.svg'
        },
        forGuests: {
            name: getRandomItems(forGuestsOptions, 1),
            imgUrl: '../assets/imgs/amenities/host-greets-you.svg'
        },
        pets: {
            name: getRandomItems(petOptions, 1),
            imgUrl: '../assets/imgs/icons/pets.svg'
        },
        bornIn: {
            name: getRandomItems(["80s", "90s", "2000s"], 1),
            imgUrl: '../assets/imgs/icons/birth-decade.svg'
        },
        spendsMuchTime: {
            name: getRandomItems(spendTimeOptions, 1),
            imgUrl: '../assets/imgs/icons/hoby.svg'
        },
        speaks: {
            name: location.language,
            imgUrl: '../assets/imgs/icons/language.svg'
        },
        whatMakesHomeUnique: {
            name: getRandomItems(homeUniqueOptions, 1),
            imgUrl: '../assets/imgs/icons/uniqueness.svg'
        },
        whatsForBreakfast: {
            name: getRandomItems(breakfastOptions, 1),
            imgUrl: '../assets/imgs/amenities/breakfast.svg'
        },
        livesIn: {
            name: `${location.city}, ${location.country}`,
            imgUrl: '../assets/imgs/icons/location.svg'

        }
    }
}

function getRandomItems(arr, numItems) {
    if (arr.length === 0 || numItems <= 0) return numItems === 1 ? null : []
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    const result = shuffled.slice(0, Math.min(numItems, arr.length))
    return numItems === 1 ? result[0] : result
}

const womenNames = [
    'Anna Smith', 'Emily Davis', 'Sarah Wilson', 'Jessica Harris', 'Laura Lewis',
    'Olivia Martinez', 'Sophia Taylor', 'Isabella White', 'Mia Thompson', 'Charlotte King',
    'Amelia Scott', 'Evelyn Young', 'Abigail Adams', 'Ella Mitchell', 'Ava Perez',
    'Madison Campbell', 'Harper Roberts', 'Grace Lewis', 'Chloe Turner', 'Avery Rodriguez'
]

const menNames = [
    'James Green', 'Robert Johnson', 'Michael Brown', 'David Lee', 'Daniel Clark',
    'William Anderson', 'Liam Walker', 'Benjamin Hall', 'Lucas Allen', 'Henry Baker',
    'Alexander Gonzalez', 'Sebastian Lopez', 'Jackson Hill', 'Mateo Wright', 'Elijah Martin',
    'Owen Evans', 'Gabriel Robinson', 'Carter Torres', 'Jayden Reed', 'Dylan Rivera'
]


const usernames = [
    "AlphaWolf", "BlueSky42", "CyberNinja", "DarkKnight", "EchoStar",
    "FireDragon", "GalacticHero", "HyperNova", "IcePhoenix", "JungleCat",
    "KnightRider", "LunarLion", "MysticWizard", "NightCrawler", "OmegaWave",
    "PhantomThief", "QuantumLeap", "RogueShadow", "SolarFlare", "TitanGuard",
    "UltraMarine", "VortexRider", "WildTiger", "XenonLight", "YellowFalcon",
    "ZenithPeak", "StormRanger", "IronClad", "BlazeStorm", "SilentArrow"
]

const passwords = [
    "B3arCl@w", "St@rl1ght", "T!gerRo@r", "M0onBeam", "P@ssW0rd2024",
    "E@gleEye", "N1ghtF@ll", "F!reFly99", "Dr@g0nBre@th", "Ic3Qu33n",
    "V0lt@geZ", "S0larWind", "Thund3rstruck", "Cr@ck3rJ@ck", "Blu3H@wk",
    "M!ss10nX", "Ph@ntomF0rc3", "ShadowHunt3r", "QuantumF!eld", "IronSh!eld",
    "C0sm!cD@wn", "L!ghtN1ng", "B1ackH0le", "R3dSun", "V!perStrik3",
    "Cyb3rT3mp3st", "FrostB1t3", "SteelW!ng", "BlazeRunner", "SilentN1ght"
]
const womanImgs = [
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/women/29.jpg',
    'https://randomuser.me/api/portraits/women/82.jpg',
    'https://randomuser.me/api/portraits/women/62.jpg',
    'https://randomuser.me/api/portraits/women/42.jpg',
    'https://randomuser.me/api/portraits/women/26.jpg',
    'https://randomuser.me/api/portraits/women/38.jpg',
    'https://randomuser.me/api/portraits/women/47.jpg',
]

const menImgs = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg',
    'https://randomuser.me/api/portraits/men/81.jpg',
    'https://randomuser.me/api/portraits/men/11.jpg',
    'https://randomuser.me/api/portraits/men/27.jpg',
    'https://randomuser.me/api/portraits/men/41.jpg',
    'https://randomuser.me/api/portraits/men/52.jpg',
    'https://randomuser.me/api/portraits/men/63.jpg',
    'https://randomuser.me/api/portraits/men/22.jpg',
]

const workOptions = ["Software Engineer", "Artist", "Teacher", "Entrepreneur"]
const favoriteSongs = ["Bohemian Rhapsody", "Stairway to Heaven", "Imagine", "Hotel California"]
const forGuestsOptions = ["Always available to help", "Loves to share local tips", "Enjoys meeting new people"]
const petOptions = ["Dog", "Cat", "None"]
const spendTimeOptions = ["Hiking", "Reading", "Cooking", "Traveling"]
const homeUniqueOptions = ["Beautiful garden", "Cozy fireplace", "Stunning views"]
const breakfastOptions = ["Continental", "Local delicacies", "Vegan options"]
const languages = ["English", "French", "German", "Japanese"]

const locations = getData('locations')