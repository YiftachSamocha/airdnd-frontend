import { addDays, addMonths, isBefore, isAfter, format } from 'date-fns';


export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function calculateAverageRating(reviews) {
    if (!Array.isArray(reviews) || reviews.length === 0) {
        return 0
    }

    const totalRating = reviews.reduce((accumulator, review) => {
        return accumulator + (review.rate || 0)
    }, 0)

    return totalRating / reviews.length
}

export function formatRating(rating) {
    // if (rating <= 3) {        
    //     return null
    // }
    const roundedRating = rating.toFixed(2)
    // return parseFloat(roundedRating) % 1 === 0 ? roundedRating.slice(0, -1) : roundedRating;
    return rating > 0 ? (rating % 1 === 0 ? rating.toFixed(1) : rating.toFixed(2)) : ''
}



export function formatNumberWithCommas(number) {
    return number.toLocaleString()
}


export function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371
    const toRad = angle => angle * (Math.PI / 180)

    const lat1Rad = toRad(lat1)
    const lng1Rad = toRad(lng1)
    const lat2Rad = toRad(lat2)
    const lng2Rad = toRad(lng2)

    const dLat = lat2Rad - lat1Rad
    const dLng = lng2Rad - lng1Rad

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLng / 2) ** 2
    const c = 2 * Math.asin(Math.sqrt(a))

    return R * c
}



export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}


export function getDateRange(datesBooked) {

    const bookedPeriods = datesBooked.map(period => ({
        start: new Date(period.start),
        end: new Date(period.end)
    }))

    bookedPeriods.sort((a, b) => a.start - b.start)

    bookedPeriods.unshift({ start: new Date(-8640000000000000), end: new Date(-8640000000000000) })
    bookedPeriods.push({ start: new Date(8640000000000000), end: new Date(8640000000000000) })

    for (let i = 0; i < bookedPeriods.length - 1; i++) {
        const endCurrent = bookedPeriods[i].end
        const startNext = bookedPeriods[i + 1].start

        const gapDays = (startNext - endCurrent) / (1000 * 60 * 60 * 24);

        if (gapDays >= 5) {
            const startAvailable = endCurrent.getTime() + 24 * 60 * 60 * 1000;
            const endAvailable = startNext.getTime();

            const middlePoint = startAvailable + (endAvailable - startAvailable) / 2;
            const availableDate = new Date(middlePoint);

            // console.log(availableDate.toISOString().split('T')[0]);
            return availableDate.toISOString().split('T')[0];
        }
    }    
}

export function findFirstAvailableNights(reservedRanges, nightsNeeded) {
    const today = new Date()
    let currentDate = addDays(today, 1)
    let foundNights = []

    while (foundNights.length < nightsNeeded) {
        const isReserved = reservedRanges.some(range =>
            isBefore(currentDate, new Date(range.end)) && isAfter(currentDate, new Date(range.start))
        )

        if (!isReserved) {
            foundNights.push(currentDate)
        } else {
            foundNights = [] // Reset if a reserved date is found within the needed range
        }

        currentDate = addDays(currentDate, 1)

        if (foundNights.length === nightsNeeded) {
            return {
                startDate: foundNights[0],
                endDate: foundNights[nightsNeeded - 1],
            }
        }
    }
    return null // Return null if no suitable range is found
}


export function formatDateRange(dateRange) {
   
    function formatDate(date) {        
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    
    const startMonthDay = formatDate(startDate);
    const endMonthDay = formatDate(endDate);

    if (startDate.getMonth() === endDate.getMonth()) {
        const startDay = startDate.toLocaleDateString('en-US', { day: 'numeric' });
        const endDay = endDate.toLocaleDateString('en-US', { day: 'numeric' });
        return `${startMonthDay.split(' ')[0]} ${startDay} – ${endDay}`;
    } else {
        return `${startMonthDay} – ${endMonthDay}`;
    }
}


export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}