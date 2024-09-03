import { getData } from "./stay.data"
import { makeId } from "./util.service"

export function createUsersData(stays, length = 10) {
    const usersToSave = stays.map(stay => {
        const { host } = stay
        return {
            _id: host._id,
            fullname: host.fullname,
            imgUrl: host.imgUrl,
            username: getRandomItems(usernames, 1),
            password: getRandomItems(passwords, 1),
        }
    })
    for (var i = 0; i < length; i++) {
        const user = {
            _id: makeId(),
            fullname: getRandomItems(fullnames, 1),
            imgUrl: getRandomItems(imgs, 1),
            username: getRandomItems(usernames, 1),
            password: getRandomItems(passwords, 1),
        }
        usersToSave.push(user)
    }
    return usersToSave
}

function getRandomItems(arr, numItems) {
    if (arr.length === 0 || numItems <= 0) return numItems === 1 ? null : []

    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    const result = shuffled.slice(0, Math.min(numItems, arr.length))

    return numItems === 1 ? result[0] : result
}

const fullnames = [
    'James Green', 'Anna Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown',
    'Sarah Wilson', 'David Lee', 'Jessica Harris', 'Daniel Clark', 'Laura Lewis'
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

const imgs = getData('hostImages')