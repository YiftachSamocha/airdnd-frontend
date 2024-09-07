import { addDays, addMonths, isBefore, isAfter, format } from 'date-fns';
import { uploadService } from './upload.service';


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

export function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

export async function onHandleFile(ev){
    let res = await uploadService.uploadImg(ev)
    return res
}

const highlightOptions = [
    {
        main: 'Great communication',
        sub: '95% of recent guests gave the host a 5-star rating for communication.',
        amenity: 'Communication'
    },
    {
        main: 'Flexible cancellation policy',
        sub: 'Get a full refund if you cancel within 48 hours of booking.',
        amenity: 'Cancellation'
    },
    {
        main: 'Superhost',
        sub: 'This host is highly rated for their outstanding hospitality.',
        amenity: 'Superhost'
    },
    {
        main: 'Self check-in',
        sub: 'Check yourself in with the smart lock for added convenience.',
        amenity: 'Self check-in'
    },
    {
        main: 'Sparkling clean',
        sub: 'Recent guests said this place was sparkling clean.',
        amenity: 'Cleanliness'
    },
    {
        main: 'Fast wifi',
        sub: 'Guests often compliment the fast and reliable wifi.',
        amenity: 'Wifi'
    },
    {
        main: 'Highly rated location',
        sub: '100% of recent guests gave the location a 5-star rating.',
        amenity: 'Location'
    },
    {
        main: 'Well-equipped for long stays',
        sub: 'Guests who stayed a month or longer rated this place 5 stars.',
        amenity: 'Long stay'
    },
    {
        main: 'Safe and secure',
        sub: 'Guests appreciated the safety features and felt secure.',
        amenity: 'Safety'
    },
    {
        main: 'Pet-friendly',
        sub: 'Previous guests loved bringing their pets to this home.',
        amenity: 'Pet-friendly'
    },
    {
        main: 'Dedicated workspace',
        sub: 'Perfect for remote work, with a comfortable desk and fast wifi.',
        amenity: 'Dedicated workspace'
    },
    {
        main: 'Excellent amenities',
        sub: 'Guests praised the range of amenities offered here.',
        amenity: 'Amenities'
    },
    {
        main: 'Great for families',
        sub: 'Families rated this home 5 stars for kid-friendly amenities.',
        amenity: 'Family-friendly'
    },
    {
        main: 'Great check-in experience',
        sub: '100% of recent guests gave the check-in process a 5-star rating.',
        amenity: 'Check-in'
    },
    {
        main: 'Stylish space',
        sub: 'Guests loved the stylish decor and comfortable layout.',
        amenity: 'Style'
    },
    {
        main: 'Free parking on premises',
        sub: 'This place offers free parking for added convenience.',
        amenity: 'Free parking on premises'
    },
    {
        main: 'Comfortable beds',
        sub: 'Guests consistently mention the comfortable and cozy beds.',
        amenity: 'Comfort'
    },
    {
        main: 'Highly rated host',
        sub: 'This host has received great reviews for their hospitality.',
        amenity: 'Hospitality'
    },
    {
        main: 'Quiet neighborhood',
        sub: 'Guests praised the peaceful and quiet surroundings.',
        amenity: 'Quiet'
    },
    {
        main: 'Fully equipped kitchen',
        sub: 'Guests appreciated the well-stocked kitchen for home-cooked meals.',
        amenity: 'Kitchen'
    },
    {
        main: 'Fast response time',
        sub: 'This host is known for responding quickly to guest inquiries.',
        amenity: 'Response time'
    },
    {
        main: 'Great value',
        sub: 'Recent guests rated this place 5 stars for value.',
        amenity: 'Value'
    },
    {
        main: 'Thoughtful touches',
        sub: 'Guests loved the small details and thoughtful touches.',
        amenity: 'Thoughtful touches'
    },
    {
        main: 'Private entrance',
        sub: 'Enjoy the privacy of a separate entrance to the property.',
        amenity: 'Private entrance'
    },
    {
        main: 'Close to public transport',
        sub: 'Guests found the location convenient for public transportation.',
        amenity: 'Public transport'
    },
    {
        main: 'Walkable area',
        sub: 'Guests loved the walkability of the neighborhood.',
        amenity: 'Walkability'
    },
    {
        main: 'Effortless check-in',
        sub: 'Check-in is easy with the host\'s detailed instructions.',
        amenity: 'Check-in'
    }
];

// The function to match 3 highlights to the given amenity and imgUrl
export function getHighlights(amenity, imgUrl) {
    // Find highlights that match the provided amenity
    const matchingHighlights = highlightOptions.filter(
        (highlight) => highlight.amenity === amenity
    );

    // If there are less than 3, add additional random highlights
    while (matchingHighlights.length < 3) {
        const randomHighlight = highlightOptions[Math.floor(Math.random() * highlightOptions.length)];
        if (!matchingHighlights.includes(randomHighlight)) {
            matchingHighlights.push(randomHighlight);
        }
    }

    // Add the provided imgUrl to the first 3 highlights
    return matchingHighlights.slice(0, 3).map((highlight) => ({
        ...highlight,
        imgUrl
    }));
}