import { getRandomIntInclusive, makeId } from "./util.service.js";
import italyImg from '../assets/imgs/countries/italy.jpeg';
import spainImg from '../assets/imgs/countries/spain.jpg';
import portugalImg from '../assets/imgs/countries/portugal.jpg';
import usaImg from '../assets/imgs/countries/united-states.jpg';
import greeceImg from '../assets/imgs/countries/greece.jpg';

import iconsImg from '../assets/imgs/labels/icons.webp'
import barnsImg from '../assets/imgs/labels/barns.jpeg';
import beachImg from '../assets/imgs/labels/beach.jpeg';
import beachfrontImg from '../assets/imgs/labels/beachfront.jpeg';
import bedAndBreakfastImg from '../assets/imgs/labels/bed&breakfast.jpeg';
import boatsImg from '../assets/imgs/labels/boats.jpeg';
import cabinsImg from '../assets/imgs/labels/cabins.jpeg';
import campersImg from '../assets/imgs/labels/campers.jpeg';
import campingImg from '../assets/imgs/labels/camping.jpeg';
import casasParticularesImg from '../assets/imgs/labels/casas-particulares.jpeg';
import castelsImg from '../assets/imgs/labels/castels.jpeg';
import cavesImg from '../assets/imgs/labels/caves.jpeg';
import chefsKitchensImg from '../assets/imgs/labels/chefs-kitchens.jpeg';
import containersImg from '../assets/imgs/labels/containers.jpeg';
import countrysideImg from '../assets/imgs/labels/countryside.jpeg';
import creativeSpacesImg from '../assets/imgs/labels/creative-spaces.jpeg';
import cycladicHomesImg from '../assets/imgs/labels/cycladic-homes.jpeg';
import dammusiImg from '../assets/imgs/labels/dammusi.jpeg';
import desertImg from '../assets/imgs/labels/desert.jpeg';
import designImg from '../assets/imgs/labels/design.jpeg';
import domesImg from '../assets/imgs/labels/domes.jpeg';
import earthHomesImg from '../assets/imgs/labels/earth-homes.jpeg';
import farmsImg from '../assets/imgs/labels/farms.jpeg';
import golfingImg from '../assets/imgs/labels/golfing.jpeg';
import grandPianosImg from '../assets/imgs/labels/grand-pianos.jpeg';
import hanoksImg from '../assets/imgs/labels/hanoks.jpeg';
import historicalHomesImg from '../assets/imgs/labels/historical-homes.jpeg';
import houseboatsImg from '../assets/imgs/labels/houseboats.jpeg';
import islandsImg from '../assets/imgs/labels/islands.jpeg';
import lakefrontImg from '../assets/imgs/labels/lakefront.jpeg';
import luxeImg from '../assets/imgs/labels/luxe.jpeg';
import mansionsImg from '../assets/imgs/labels/mansions.jpeg';
import minsusImg from '../assets/imgs/labels/minsus.jpeg';
import nationalParksImg from '../assets/imgs/labels/national-parks.jpeg';
import newImg from '../assets/imgs/labels/new.jpeg';
import offTheGridImg from '../assets/imgs/labels/off-the-grid.jpeg';
import omgImg from '../assets/imgs/labels/omg.jpeg';
import playImg from '../assets/imgs/labels/play.jpeg';
import riadsImg from '../assets/imgs/labels/riads.jpeg';
import roomsImg from '../assets/imgs/labels/rooms.jpeg';
import ryokansImg from '../assets/imgs/labels/ryokans.jpeg';
import shepardsHutsImg from '../assets/imgs/labels/shepards-huts.jpeg';
import skiInOutImg from '../assets/imgs/labels/ski-in-out.jpeg';
import skiingImg from '../assets/imgs/labels/skiing.jpeg';
import surfingImg from '../assets/imgs/labels/surfing.jpeg';
import tinyHomesImg from '../assets/imgs/labels/tinyhomes.jpeg';
import topCitiesImg from '../assets/imgs/labels/top-cities.jpeg';
import topOfTheWorldImg from '../assets/imgs/labels/top-of-the-world.jpeg';
import towersImg from '../assets/imgs/labels/towers.jpeg';
import treehousesImg from '../assets/imgs/labels/treehouses.jpeg';
import trendingImg from '../assets/imgs/labels/trending.jpeg';
import tropicalImg from '../assets/imgs/labels/tropical.jpeg';
import trulliImg from '../assets/imgs/labels/trulli.jpeg';
import vineyardsImg from '../assets/imgs/labels/vineyards.jpeg';
import windmillsImg from '../assets/imgs/labels/windmills.jpeg';
import yurtsImg from '../assets/imgs/labels/yurts.jpeg';

import parkingImg from '../assets/imgs/Extra/parking.png'
import tvImg from '../assets/imgs/Extra/tv.png'
import acImg from '../assets/imgs/Extra/ac.png'
import kitchenImg from '../assets/imgs/Extra/kitchen.png'
import washingMashineImg from '../assets/imgs/Extra/washing-mashine.png'
import wifiImg from '../assets/imgs/Extra/wifi.png'

export async function createStay(host, location) {
    const sleep = await createSleep()

    return {
        _id: makeId(),
        name: getRandomItems(names, 1),
        imgs: generateImgUrls(imgs),
        sleep,
        description: getRandomItems(descriptions, 1),
        highlights: getRandomItems(highlights, 3),
        price: {
            night: getRandomIntInclusive(200, 2000),
            cleaning: getRandomIntInclusive(200, 1000)
        },
        type: getRandomItems(types, 1),
        amenities: getRandomItems(amenities, getRandomIntInclusive(10, 35)),
        labels: getRandomItems(labels, 3),
        reservedDates: generateAvailabilityRanges(),
        host: {
            _id: host._id,
            fullname: host.fullname,
            imgUrl: host.imgUrl,
            reviews: host.reviews,
            rating: host.rating,
            yearsHosting: host.yearsHosting,
            responceRate: host.responseRate
        },
        location,
        reviews: getRandomItems(reviews, getRandomIntInclusive(1, 15)),
        thingsToKnow: {
            houseRules: getRandomItems(houseRules, getRandomIntInclusive(6 - 12)),
            safetyProperty: getRandomItems(safetyProperty, 4 - 10),
            cancellationPolicy: getRandomItems(cancellationPolicy, 1)
        }
    }
}

export async function createStayData(listingsPerHost = 2) {
    const hosts = []
    const stays = []

    for (let i = 1; i < locations.length; i++) {
        const location = getRandomItems(locations, 1)
        const host = {
            _id: makeId(),
            fullname: getRandomItems(fullnames, 1),
            imgUrl: getRandomItems(hostImages, 1),
            reviews: getRandomIntInclusive(3, 100),
            rating: Math.round((Math.random() * 4 + 1) * 100) / 100,
            yearsHosting: getRandomIntInclusive(1, 15),
            responseRate: getRandomIntInclusive(80, 100),
            personalDetails: createPersonalDetails(location),
            listings: []
        }

        for (let j = 0; j < listingsPerHost; j++) {
            const stay = await createStay(host, location)
            host.listings.push(stay)
            stays.push(stay)
        }
        hosts.push(host)
    }
    return stays
}

const workOptions = ["Software Engineer", "Artist", "Teacher", "Entrepreneur"]
const favoriteSongs = ["Bohemian Rhapsody", "Stairway to Heaven", "Imagine", "Hotel California"]
const forGuestsOptions = ["Always available to help", "Loves to share local tips", "Enjoys meeting new people"]
const petOptions = ["Dog", "Cat", "None"]
const spendTimeOptions = ["Hiking", "Reading", "Cooking", "Traveling"]
const homeUniqueOptions = ["Beautiful garden", "Cozy fireplace", "Stunning views"]
const breakfastOptions = ["Continental", "Local delicacies", "Vegan options"]
const languages = ["English", "French", "German", "Japanese"]

function createPersonalDetails(location) {
    return {
        work: {
            name: getRandomItems(workOptions, 1),
            imgUrl: '../assets/imgs/icons/work.svg' // Replace with actual icon path
        },
        favoriteSong: {
            name: getRandomItems(favoriteSongs, 1),
            imgUrl: '../assets/imgs/icons/song.svg' // Replace with actual icon path
        },
        forGuests: {
            name: getRandomItems(forGuestsOptions, 1),
            imgUrl: '../assets/imgs/amenities/host-greets-you.svg' // Replace with actual icon path
        },
        pets: {
            name: getRandomItems(petOptions, 1),
            imgUrl: '../assets/imgs/icons/pets.svg' // Replace with actual icon path
        },
        bornIn: {
            name: getRandomItems(["80s", "90s", "2000s"], 1),
            imgUrl: '../assets/imgs/icons/birth-decade.svg' // Replace with actual icon path
        },
        spendsMuchTime: {
            name: getRandomItems(spendTimeOptions, 1),
            imgUrl: '../assets/imgs/icons/hoby.svg' // Replace with actual icon path
        },
        speaks: {
            name: location.language,
            imgUrl: '../assets/imgs/icons/language.svg' // Replace with actual icon path
        },
        whatMakesHomeUnique: {
            name: getRandomItems(homeUniqueOptions, 1),
            imgUrl: '../assets/imgs/icons/uniqueness.svg' // Replace with actual icon path
        },
        whatsForBreakfast: {
            name: getRandomItems(breakfastOptions, 1),
            imgUrl: '../assets/imgs/amenities/breakfast.svg' // Replace with actual icon path
        },
        livesIn: {
            name: `${location.city}, ${location.country}`,
            imgUrl: '../assets/imgs/icons/location.svg' // Replace with actual icon path

        }
    }
}


export function getData(type) {
    switch (type) {
        case 'names': return names;
        case 'imgs': return imgs;
        case 'amenities': return amenities;
        case 'descriptions': return descriptions;
        case 'labels': return labels;
        case 'highlights': return highlights;
        case 'locations': return locations;
        case 'hostImages': return hostImages;
        case 'fullnames': return fullnames;
        case 'reviewTxts': return reviewsTxts;
        case 'mainAmenities': return mainAmenities
        default: return null;
    }
}


function getRandomItems(arr, numItems) {
    if (arr.length === 0 || numItems <= 0) return numItems === 1 ? null : []

    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    const result = shuffled.slice(0, Math.min(numItems, arr.length))

    return numItems === 1 ? result[0] : result
}


const names = [
    "A Beautiful Apartment in the Center of the City!",
    "Charming Studio with a Scenic View!",
    "Luxurious Condo with Modern Amenities!",
    "Spacious Loft with Artistic Vibes!",
    "Cozy Home with a Private Garden!",
    "Elegant Townhouse with Classic Decor!",
    "Contemporary Flat with Open-Plan Living!",
    "Stylish Penthouse with Cityscape Views!",
    "Quaint Cottage with Rustic Charm!",
    "Sleek Apartment with High-End Finishes!",
    "Sunny Suite with Floor-to-Ceiling Windows!",
    "Art Deco Residence with Unique Flair!",
    "Minimalist Space with a Chic Ambiance!",
    "Sprawling Villa with a Pool and Lounge Area!",
    "Designer Loft with a Creative Touch!",
    "Eclectic Studio with Vintage Furniture!",
    "Modern Duplex with Smart Home Features!",
    "Boutique Apartment with Luxurious Touches!",
    "Sophisticated Suite with a Cozy Atmosphere!",
    "Upscale Condo with Stunning Interiors!",
    "Trendy Loft with an Urban Edge!",
    "Coastal Retreat with a Relaxing Vibe!",
    "Inviting Flat with a Warm Atmosphere!",
    "Lavish Penthouse with Skyline Views!",
    "Charming Bungalow with a Serene Garden!",
    "Contemporary Suite with a Sleek Design!",
    "Bright Apartment with Stylish Decor!",
    "Elegant Loft with an Open-Concept Layout!",
    "Luxury Residence with Top-of-the-Line Finishes!",
    "Chic Studio with Modern Conveniences!"
]

const imgs = ['271624', '1918291', '6315808', '7045712', '6283965', '7214173', '279614', '5998117', '6283961', '5997959', '1457841', '6908367', '6758788', '6908368', '6492398', '6782567', '5997967', '4450337', '6775268', '6527069', '3315291', '2079249', '7018391', '7018824', '6903160', '5998120', '4099357', '3190541']
const singleBedroomImgs = [
    '4115551', '7587810', '19836795',
    '26859033', '271618', '271695'
]

const doubleBedroomImgs = [
    '1454806', '90317', '262048', '1329711', '279746',
    '271743', '1743229', '775219', '1457845', '3773575',
    '5178070', '9130978', '9582420'
]

const livingRoomImgs = [
    '2747901', '1428348', '26859039', '6782353', '6908363',
    '7534294', '6782346'
]

async function createSleep() {
    const bedTypes = ["king bed", "queen bed", "double bed", "single bed"];
    const roomAmount = getRandomIntInclusive(1, 6);
    let rooms = [];
    let maxCapacity = 0;

    for (let i = 0; i < roomAmount; i++) {
        const bedType = getRandomItems(bedTypes, 1);
        let imgUrl;

        // Generate room images based on bed type
        if (bedType === "single bed") {
            imgUrl = generateImgUrls(singleBedroomImgs)[0];
        } else if (bedType === "double bed" || bedType === "queen bed" || bedType === "king bed") {
            imgUrl = generateImgUrls(doubleBedroomImgs)[0];
        } else {
            imgUrl = generateImgUrls(livingRoomImgs)[0];
        }

        const room = {
            roomType: 'bedroom',
            bedType: bedType,
            imgUrl: imgUrl || (bedType === 'single bed'
                ? '../assets/imgs/beds/single-bed.svg'
                : './assets/imgs/beds/double-bed.svg')
        };

        rooms.push(room);
        maxCapacity += room.bedType === 'single bed' ? 1 : 2;
    }

    // Optionally add a living room
    if (Math.random() > 0.5) { // Randomly decide whether to add a living room
        const livingRoomImgUrl = generateImgUrls(livingRoomImgs)[0];
        rooms.push({
            roomType: 'living room',
            bedType: 'sofa bed',
            imgUrl: livingRoomImgUrl || '../assets/imgs/beds/sofa-bed.svg'
        });
        maxCapacity += 1;
    }

    return {
        rooms,
        maxCapacity,
        bathrooms: getRandomIntInclusive(1, 3),
        beds: rooms.length,
        bedrooms: rooms.filter(room => room.roomType === 'bedroom').length
    };
}

function generateImgUrls(imgs) {
    const imgIds = getRandomItems(imgs, getRandomIntInclusive(4, 10))
    return imgIds.map(imgId => {
        return `https://images.pexels.com/photos/${imgId}/pexels-photo-${imgId}.jpeg?width=400`
    })
}

const descriptions = [
    "This stylish loft offers an open layout with industrial charm, featuring exposed brick walls and high ceilings. Perfectly sized for comfort, it includes modern furnishings and a spacious living area. The location provides easy access to everything you need.",
    "Step into this cozy retreat, where mid-century design meets modern comfort. The space is thoughtfully decorated with minimalist furniture, offering a welcoming atmosphere. The layout is efficient, making it ideal for a short or extended stay in a prime area.",
    "A bright and airy apartment with contemporary furnishings and clean lines. The spacious living room flows into a sleek kitchen with high-end appliances. The well-placed location makes exploring the surroundings a breeze.",
    "This charming home boasts a quaint exterior with a beautifully crafted interior. Featuring hardwood floors and cozy furnishings, the open-plan living area is perfect for relaxing. Its convenient location offers easy access to local attractions.",
    "Enjoy the elegance of this luxurious condo, with its expansive layout and sophisticated decor. The space is adorned with plush furniture, and large windows fill the rooms with natural light. Located in a sought-after area, it’s perfect for a high-end stay.",
    "Experience modern living in this tastefully designed flat. The space offers a blend of comfort and style with sleek furniture and a well-organized layout. The prime location allows you to enjoy nearby amenities effortlessly.",
    "A beautifully designed townhouse with classic charm and contemporary updates. The spacious interiors are filled with light, thanks to large windows and an open-concept design. The home is well-furnished and ideally located for exploring the area.",
    "This spacious apartment combines modern design with cozy touches. Featuring comfortable furniture and thoughtful details, the space is both stylish and functional. Its great location offers easy access to dining and entertainment.",
    "A compact yet charming studio, perfect for a solo traveler or couple. The minimalist decor is complemented by functional furniture, making the most of the space. The central location ensures you’re never far from the action.",
    "This sleek and modern loft features high ceilings and an airy feel. The industrial design is softened with warm accents, creating a welcoming space. Its ideal location puts you close to everything you need.",
    "A cozy bungalow with a rustic vibe, complete with comfortable furniture and a well-equipped kitchen. The open-plan living area is perfect for relaxing, while the location provides convenient access to local hotspots.",
    "This elegant suite offers a refined experience with its tasteful decor and high-end furnishings. The space is designed for comfort and luxury, with a layout that makes it easy to unwind. You’ll love the convenience of the nearby amenities.",
    "A bright and modern apartment, designed with simplicity and elegance. The furniture is carefully selected for both style and comfort. The location is perfect for those looking to explore the surroundings with ease.",
    "Experience the best of contemporary living in this stylish flat. The clean, minimalist design is complemented by comfortable furniture and an efficient layout. Situated in a desirable area, everything you need is within reach.",
    "A charming and cozy home, with a warm and inviting atmosphere. The furniture is a mix of modern and classic, creating a unique style. The home’s excellent location makes it easy to enjoy all the local attractions.",
    "This spacious and modern apartment features an open-concept design with sleek furnishings. The large windows provide plenty of natural light, creating a bright and welcoming space. You’ll appreciate the convenient location for all your needs.",
    "A quaint and cozy cottage, with a beautiful blend of vintage and modern touches. The furniture is comfortable and thoughtfully chosen, making the space feel like home. The location is perfect for those who want a peaceful retreat.",
    "This chic loft combines industrial elements with modern comfort. The space is open and bright, with stylish furniture and a functional layout. Its prime location offers easy access to local attractions and amenities.",
    "A beautifully decorated flat, with an airy and spacious feel. The furniture is modern and comfortable, with a design that maximizes the space. The central location allows you to explore the area with ease.",
    "This luxurious condo offers a sophisticated and elegant stay. The furniture is plush and high-end, with a layout designed for relaxation. The location is ideal for those who want to be close to everything.",
    "A cozy and well-designed apartment, with a focus on comfort and style. The furniture is carefully chosen to create a warm and inviting space. The location is perfect for enjoying everything the area has to offer.",
    "Experience a unique stay in this creatively designed loft. The space is filled with artistic touches, from the furniture to the decor. The location is unbeatable, with easy access to all the local hotspots.",
    "This modern duplex offers a spacious and open layout, with sleek furnishings and a contemporary design. The large windows bring in natural light, making the space feel even more expansive. The location provides easy access to nearby attractions.",
    "A charming and cozy suite, with a warm and inviting atmosphere. The furniture is comfortable and stylish, creating a space where you can relax. The location is ideal for exploring the local area.",
    "This stylish and modern flat is perfect for those who appreciate clean lines and contemporary design. The furniture is sleek and functional, with a layout that maximizes space. The location is central to everything you’ll need.",
    "A beautiful and spacious apartment, with elegant decor and comfortable furnishings. The layout is open and inviting, making it easy to unwind. The location is ideal for those who want to be close to local attractions.",
    "This trendy loft features a unique blend of industrial and modern design. The furniture is a mix of vintage and new, creating a one-of-a-kind space. The location is perfect for those who want to explore the area.",
    "A luxurious and spacious home, with high-end furnishings and elegant decor. The open-plan living area is perfect for entertaining, while the location offers easy access to all the best attractions.",
    "This cozy and stylish flat is perfect for a short or extended stay. The furniture is comfortable and modern, with a layout that makes the most of the space. The location is central, with everything you need nearby.",
    "A charming and elegant apartment, with tasteful decor and comfortable furniture. The layout is spacious and bright, making it a perfect retreat. The location offers convenient access to all the local amenities."
]

const highlights = [
    {
        main: 'Great communication',
        sub: '95% of recent guests gave the host a 5-star rating for communication.',
        imgUrl: '/src/assets/imgs/labels/omg.jpeg'
    },
    {
        main: 'Flexible cancellation policy',
        sub: 'Get a full refund if you cancel within 48 hours of booking.',
        imgUrl: '/src/assets/imgs/labels/island.jpeg'

    },
    {
        main: 'Superhost',
        sub: 'This host is highly rated for their outstanding hospitality.',
        imgUrl: '/src/assets/imgs/labels/luxe.jpeg'
    },
    {
        main: 'Self check-in',
        sub: 'Check yourself in with the smart lock for added convenience.',
        imgUrl: '/src/assets/imgs/labels/new.jpeg'

    },
    {
        main: 'Sparkling clean',
        sub: 'Recent guests said this place was sparkling clean.',
        imgUrl: '/src/assets/imgs/labels/design.jpeg'

    },
    {
        main: 'Fast wifi',
        sub: 'Guests often compliment the fast and reliable wifi.',
        imgUrl: '/src/assets/imgs/labels/golfing.jpeg'

    },
    {
        main: 'Highly rated location',
        sub: '100% of recent guests gave the location a 5-star rating.',
        imgUrl: '/src/assets/imgs/icons/star.svg'

    },
    {
        main: 'Well-equipped for long stays',
        sub: 'Guests who stayed a month or longer rated this place 5 stars.',
        imgUrl: '/src/assets/imgs/labels/skiing.jpeg'

    },
    {
        main: 'Safe and secure',
        sub: 'Guests appreciated the safety features and felt secure.',
        imgUrl: '/src/assets/imgs/labels/new.jpeg'

    },
    {
        main: 'Pet-friendly',
        sub: 'Previous guests loved bringing their pets to this home.',
        imgUrl: '/src/assets/imgs/labels/farms.jpeg'

    },
    {
        main: 'Dedicated workspace',
        sub: 'Perfect for remote work, with a comfortable desk and fast wifi.',
        imgUrl: '/src/assets/imgs/labels/creative-spaces.jpeg'

    },
    {
        main: 'Excellent amenities',
        sub: 'Guests praised the range of amenities offered here.',
        imgUrl: '/src/assets/imgs/labels/campers.jpeg'

    },
    {
        main: 'Great for families',
        sub: 'Families rated this home 5 stars for kid-friendly amenities.',
        imgUrl: '/src/assets/imgs/labels/play.jpeg'

    },
    {
        main: 'Great check-in experience',
        sub: '100% of recent guests gave the check-in process a 5-star rating.',
        imgUrl: '/src/assets/imgs/icons/star.svg'

    },
    {
        main: 'Stylish space',
        sub: 'Guests loved the stylish decor and comfortable layout.',
        imgUrl: '/src/assets/imgs/labels/design.jpeg'


    },
    {
        main: 'Free parking on premises',
        sub: 'This place offers free parking for added convenience.',
        imgUrl: '/src/assets/imgs/labels/lake-front.jpeg'

    },
    {
        main: 'Comfortable beds',
        sub: 'Guests consistently mention the comfortable and cozy beds.',
        imgUrl: '/src/assets/imgs/labels/mansions.jpeg'

    },
    {
        main: 'Highly rated host',
        sub: 'This host has received great reviews for their hospitality.',
        imgUrl: '/src/assets/imgs/labels/omg.jpeg'

    },
    {
        main: 'Quiet neighborhood',
        sub: 'Guests praised the peaceful and quiet surroundings.',
        imgUrl: '/src/assets/imgs/labels/countryside.jpeg'

    },
    {
        main: 'Fully equipped kitchen',
        sub: 'Guests appreciated the well-stocked kitchen for home-cooked meals.',
        imgUrl: '/src/assets/imgs/labels/bed&breakfast.jpeg'

    },
    {
        main: 'Fast response time',
        sub: 'This host is known for responding quickly to guest inquiries.',
        imgUrl: '/src/assets/imgs/labels/omg.jpeg'

    },
    {
        main: 'Great value',
        sub: 'Recent guests rated this place 5 stars for value.',
        imgUrl: '/src/assets/imgs/labels/containers.jpeg'

    },
    {
        main: 'Thoughtful touches',
        sub: 'Guests loved the small details and thoughtful touches.',
        imgUrl: '/src/assets/imgs/labels/historical-homes.jpeg'

    },
    {
        main: 'Private entrance',
        sub: 'Enjoy the privacy of a separate entrance to the property.',
        imgUrl: '/src/assets/imgs/labels/mansons.jpeg'

    },
    {
        main: 'Close to public transport',
        sub: 'Guests found the location convenient for public transportation.',
        imgUrl: '/src/assets/imgs/labels/off-the-grid.jpeg'

    },
    {
        main: 'Walkable area',
        sub: 'Guests loved the walkability of the neighborhood.',
        imgUrl: '/src/assets/imgs/labels/top-cities.jpeg'

    },
    {
        main: 'Effortless check-in',
        sub: 'Check-in is easy with this hosts detailed',
        imgUrl: '/src/assets/imgs/labels/trending.jpeg'

    }
]
const types = ['home', 'room', 'apartment', 'villa',]
const amenities = [
    { type: 'main', name: 'wifi', imgUrl: wifiImg },
    { type: 'main', name: 'Air conditioning', imgUrl: acImg },
    { type: 'main', name: 'kitchen', imgUrl: kitchenImg },
    { type: 'main', name: 'free parking', imgUrl: parkingImg },
    { type: 'main', name: 'Television', imgUrl: tvImg },
    { type: 'main', name: 'washing mashine', imgUrl: washingMashineImg },

    { type: 'bathroom', name: 'Hair dryer', imgUrl: '/src/assets/imgs/amenities/hot-water.svg' },
    { type: 'bathroom', name: 'Shampoo', imgUrl: '/src/assets/imgs/amenities/essentials.svg' },
    { type: 'bathroom', name: 'Conditioner', imgUrl: '/src/assets/imgs/amenities/essentials.svg' },
    { type: 'bathroom', name: 'Body soap', imgUrl: '/src/assets/imgs/amenities/hot-water.svg' },
    { type: 'bathroom', name: 'Hot water', imgUrl: '/src/assets/imgs/amenities/hot-water' },
    { type: 'bathroom', name: 'Towels', imgUrl: '/src/assets/imgs/amenities/hot-water.svg' },
    { type: 'bathroom', name: 'Toilet paper', imgUrl: '/src/assets/imgs/amenities/hot-water.svg' },
    { type: 'bathroom', name: 'Bathrobe', imgUrl: '/src/assets/imgs/amenities/hot-water.svg' },
    { type: 'bathroom', name: 'Slippers', imgUrl: '/src/assets/imgs/amenities/hot-water.svg' },

    { type: 'heatingAndCooling', name: 'Air conditioning', imgUrl: '/src/assets/imgs/amenities/indoor-fireplace.svg' },
    { type: 'heatingAndCooling', name: 'Central heating', imgUrl: '/src/assets/imgs/amenities/indoor-fireplace.svg' },
    { type: 'heatingAndCooling', name: 'Portable fans', imgUrl: '/src/assets/imgs/amenities/indoor-fireplace.svg' },
    { type: 'heatingAndCooling', name: 'Space heater', imgUrl: '/src/assets/imgs/amenities/indoor-fireplace.svg' },
    { type: 'heatingAndCooling', name: 'Dehumidifier', imgUrl: '/src/assets/imgs/amenities/indoor-fireplace.svg' },

    { type: 'kitchen', name: 'Refrigerator', imgUrl: '/src/assets/imgs/amenities/breakfast.svg' },
    { type: 'kitchen', name: 'Microwave', imgUrl: '/src/assets/imgs/amenities/breakfast.svg' },
    { type: 'kitchen', name: 'Oven', imgUrl: '/src/assets/imgs/amenities/breakfast.svg' },
    { type: 'kitchen', name: 'Stove', imgUrl: '/src/assets/imgs/amenities/breakfast.svg' },
    { type: 'kitchen', name: 'Dishwasher', imgUrl: '/src/assets/imgs/amenities/breakfast.svg' },
    { type: 'kitchen', name: 'Coffee maker', imgUrl: '/src/assets/imgs/amenities/breakfast.svg' },
    { type: 'kitchen', name: 'Toaster', imgUrl: '/src/assets/imgs/amenities/breakfast.svg' },
    { type: 'kitchen', name: 'Cooking basics', imgUrl: '/src/assets/imgs/amenities/breakfast.svg' },
    { type: 'kitchen', name: 'Dishes and silverware', imgUrl: '/src/assets/imgs/amenities/breakfast.svg' },
    { type: 'kitchen', name: 'Wine glasses', imgUrl: '/src/assets/imgs/amenities/breakfast.svg' },

    { type: 'livingRoom', name: 'TV', imgUrl: '/src/assets/imgs/amenities/host-greets-you.svg' },
    { type: 'livingRoom', name: 'Cable TV', imgUrl: '/src/assets/imgs/amenities/host-greets-you.svg' },
    { type: 'livingRoom', name: 'Streaming services', imgUrl: '/src/assets/imgs/amenities/host-greets-you.svg' },
    { type: 'livingRoom', name: 'DVD player', imgUrl: '/src/assets/imgs/amenities/host-greets-you.svg' },
    { type: 'livingRoom', name: 'Sofa', imgUrl: '/src/assets/imgs/amenities/host-greets-you.svg' },
    { type: 'livingRoom', name: 'Coffee table', imgUrl: '/src/assets/imgs/amenities/breskfast.svg' },
    { type: 'livingRoom', name: 'Books and reading material', imgUrl: '/src/assets/imgs/amenities/host-greets-you.svg' },

    { type: 'outdoor', name: 'Patio or balcony', imgUrl: '/src/assets/imgs/amenities/backyard.svg' },
    { type: 'outdoor', name: 'Garden', imgUrl: '/src/assets/imgs/amenities/backyard.svg' },
    { type: 'outdoor', name: 'BBQ grill', imgUrl: '/src/assets/imgs/amenities/backyard.svg' },
    { type: 'outdoor', name: 'Outdoor furniture', imgUrl: '/src/assets/imgs/amenities/backyard.svg' },
    { type: 'outdoor', name: 'Fire pit', imgUrl: '/src/assets/imgs/amenities/backyard.svg' },
    { type: 'outdoor', name: 'Pool', imgUrl: '/src/assets/imgs/amenities/backyard.svg' },
    { type: 'outdoor', name: 'Hot tub', imgUrl: '/src/assets/imgs/amenities/backyard.svg' },

    { type: 'safety', name: 'Smoke alarm', imgUrl: '/src/assets/imgs/amenities/smoke-alarm.svg' },
    { type: 'safety', name: 'Carbon monoxide alarm', imgUrl: '/src/assets/imgs/amenities/carbon-monoxide-alarm.svg' },
    { type: 'safety', name: 'First aid kit', imgUrl: '/src/assets/imgs/amenities/first-aid-kit.svg' },
    { type: 'safety', name: 'Fire extinguisher', imgUrl: '/src/assets/imgs/amenities/indoor-fireplace.svg' },
    { type: 'safety', name: 'Lock on bedroom door', imgUrl: '/src/assets/imgs/amenities/queen-bed.svg' },

    { type: 'workspace', name: 'Desk', imgUrl: '/src/assets/imgs/amenities/extra-pillows.svg' },
    { type: 'workspace', name: 'Laptop - friendly workspace', imgUrl: '/src/assets/imgs/amenities/extra-pillows.svg' },
    { type: 'workspace', name: 'Office chair', imgUrl: '/src/assets/imgs/amenities/extra-pillows.svg' },
    { type: 'workspace', name: 'Printer', imgUrl: '/src/assets/imgs/amenities/extra-pillows.svg' },
    { type: 'workspace', name: 'High-speed internet', imgUrl: '/src/assets/imgs/amenities/extra-pillows.svg' },

    { type: 'accessibility', name: 'Wheelchair accessible', imgUrl: '/src/assets/imgs/amenities/free-parking.svg' },
    { type: 'accessibility', name: 'Elevator', imgUrl: '/src/assets/imgs/amenities/free-parking.svg' },
    { type: 'accessibility', name: 'Accessible entrance', imgUrl: '/src/assets/imgs/amenities/free-parking.svg' },
    { type: 'accessibility', name: 'Accessible bathroom', imgUrl: '/src/assets/imgs/amenities/free-parking.svg' },
    { type: 'accessibility', name: 'Grab rails', imgUrl: '/src/assets/imgs/amenities/free-parking.svg' },

    { type: 'laundry', name: 'Washing machine', imgUrl: '/src/assets/imgs/amenities/no-drayer.svg' },
    { type: 'laundry', name: 'Dryer', imgUrl: '/src/assets/imgs/amenities/no-drayer.svg' },
    { type: 'laundry', name: 'Iron', imgUrl: '/src/assets/imgs/amenities/no-drayer.svg' },
    { type: 'laundry', name: 'Ironing board', imgUrl: '/src/assets/imgs/amenities/no-drayer.svg' },
    { type: 'laundry', name: 'Laundry detergent', imgUrl: '/src/assets/imgs/amenities/no-drayer.svg' },

    { type: 'familyFeatures', name: 'Crib', imgUrl: '/src/assets/imgs/amenities/no-wifi.svg' },
    { type: 'familyFeatures', name: 'High chair', imgUrl: '/src/assets/imgs/amenities/no-wifi.svg' },
    { type: 'familyFeatures', name: 'Child safety locks', imgUrl: '/src/assets/imgs/amenities/no-wifi.svg' },
    { type: 'familyFeatures', name: 'Children’s books and toys', imgUrl: '/src/assets/imgs/amenities/no-wifi.svg' },
    { type: 'familyFeatures', name: 'Baby monitor', imgUrl: '/src/assets/imgs/amenities/no-wifi.svg' },

    { type: 'petFriendly', name: 'Pets allowed', imgUrl: '/src/assets/imgs/amenities/no-kitchen.svg' },
    { type: 'petFriendly', name: 'Pet bowls', imgUrl: '/src/assets/imgs/amenities/no-kitchen.svg' },
    { type: 'petFriendly', name: 'Pet bed', imgUrl: '/src/assets/imgs/amenities/no-kitchen.svg' },
    { type: 'petFriendly', name: 'Fenced yard', imgUrl: '/src/assets/imgs/amenities/no-kitchen.svg' },

    // Parking
    { type: 'parking', name: 'Free parking on premises', imgUrl: '/src/imgs/amenities/free-parking.svg' },
    { type: 'parking', name: 'Street parking', imgUrl: '/src/imgs/amenities/free-parking.svg' },
    { type: 'parking', name: 'Garage', imgUrl: '/src/imgs/amenities/free-parking.svg' },
    { type: 'parking', name: 'EV charger', imgUrl: '/src/imgs/amenities/free-parking.svg' },

    // Entertainment
    { type: 'entertainment', name: 'Games', imgUrl: '/src/imgs/amenities/luggage-dropoff-allowed.svg' },
    { type: 'entertainment', name: 'Board games', imgUrl: '/src/imgs/amenities/luggage-dropoff-allowed.svg' },
    { type: 'entertainment', name: 'Outdoor toys', imgUrl: '/src/imgs/amenities/luggage-dropoff-allowed.svg' },
    { type: 'entertainment', name: 'Books', imgUrl: '/src/imgs/amenities/luggage-dropoff-allowed.svg' },
    { type: 'entertainment', name: 'Music player', imgUrl: '/src/imgs/amenities/luggage-dropoff-allowed.svg' }
]

const mainAmenities = [
    { name: 'wifi', imgUrl: wifiImg, isSelected: false },
    { name: 'Air conditioning', imgUrl: acImg, isSelected: false },
    { name: 'kitchen', imgUrl: kitchenImg, isSelected: false },
    { name: 'free parking', imgUrl: parkingImg, isSelected: false },
    { name: 'Television', imgUrl: tvImg, isSelected: false },
    { name: 'washing mashine', imgUrl: washingMashineImg, isSelected: false },
]

const labels = [
    { label: 'icons', img: iconsImg },
    { label: 'barns', img: barnsImg },
    { label: 'beach', img: beachImg },
    { label: 'beachfront', img: beachfrontImg },
    { label: 'bed&breakfast', img: bedAndBreakfastImg },
    { label: 'boats', img: boatsImg },
    { label: 'cabins', img: cabinsImg },
    { label: 'campers', img: campersImg },
    { label: 'camping', img: campingImg },
    { label: 'casas-particulares', img: casasParticularesImg },
    { label: 'castels', img: castelsImg },
    { label: 'caves', img: cavesImg },
    { label: 'chefs-kitchens', img: chefsKitchensImg },
    { label: 'containers', img: containersImg },
    { label: 'countryside', img: countrysideImg },
    { label: 'creative-spaces', img: creativeSpacesImg },
    { label: 'cycladic-homes', img: cycladicHomesImg },
    { label: 'dammusi', img: dammusiImg },
    { label: 'desert', img: desertImg },
    { label: 'design', img: designImg },
    { label: 'domes', img: domesImg },
    { label: 'earth-homes', img: earthHomesImg },
    { label: 'farms', img: farmsImg },
    { label: 'golfing', img: golfingImg },
    { label: 'grand-pianos', img: grandPianosImg },
    { label: 'hanoks', img: hanoksImg },
    { label: 'historical-homes', img: historicalHomesImg },
    { label: 'houseboats', img: houseboatsImg },
    { label: 'islands', img: islandsImg },
    { label: 'lakefront', img: lakefrontImg },
    { label: 'luxe', img: luxeImg },
    { label: 'mansions', img: mansionsImg },
    { label: 'minsus', img: minsusImg },
    { label: 'national-parks', img: nationalParksImg },
    { label: 'new', img: newImg },
    { label: 'off-the-grid', img: offTheGridImg },
    { label: 'omg', img: omgImg },
    { label: 'play', img: playImg },
    { label: 'riads', img: riadsImg },
    { label: 'rooms', img: roomsImg },
    { label: 'ryokans', img: ryokansImg },
    { label: 'shepards-huts', img: shepardsHutsImg },
    { label: 'ski-in-out', img: skiInOutImg },
    { label: 'skiing', img: skiingImg },
    { label: 'surfing', img: surfingImg },
    { label: 'tinyhomes', img: tinyHomesImg },
    { label: 'top-cities', img: topCitiesImg },
    { label: 'top-of-the-world', img: topOfTheWorldImg },
    { label: 'towers', img: towersImg },
    { label: 'treehouses', img: treehousesImg },
    { label: 'trending', img: trendingImg },
    { label: 'tropical', img: tropicalImg },
    { label: 'trulli', img: trulliImg },
    { label: 'vineyards', img: vineyardsImg },
    { label: 'windmills', img: windmillsImg },
    { label: 'yurts', img: yurtsImg }
]

function getRandomDateRange(startDate, endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const randomStart = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    const minEnd = new Date(randomStart.getTime())
    minEnd.setDate(randomStart.getDate() + 2)

    const randomEnd = new Date(minEnd.getTime() + Math.random() * (end.getTime() - minEnd.getTime()))

    return {
        start: randomStart.toISOString().split('T')[0],
        end: randomEnd.toISOString().split('T')[0],
    }
}

function generateAvailabilityRanges() {
    const months = [
        { start: 1693526400000, end: 1696032000000 },
        { start: 1696147200000, end: 1698777600000 },
        { start: 1698854400000, end: 1701475200000 },
        { start: 1701561600000, end: 1704182400000 },
        { start: 1704268800000, end: 1706841600000 },
    ]

    const availabilityRanges = []

    months.forEach(month => {
        const numRanges = Math.floor(Math.random() * 2) + 2
        for (let i = 0; i < numRanges; i++) {
            availabilityRanges.push(getRandomDateRange(month.start, month.end))
        }
    })
    return availabilityRanges;
}

const locations = [
    { country: 'Greece', city: 'Athens', lat: 37.98, lng: 23.73, img: greeceImg },
    { country: 'Spain', city: 'Madrid', lat: 40.42, lng: -3.70, img: spainImg },
    { country: 'Portugal', city: 'Lisbon', lat: 38.72, lng: -9.14, img: portugalImg },
    { country: 'Italy', city: 'Rome', lat: 41.90, lng: 12.49, img: italyImg },
    { country: 'USA', city: 'New York', lat: 40.71, lng: -74.01, img: usaImg },

    { country: 'Israel', city: 'Tel-Aviv', lat: 32.07, lng: 34.78 },
    { country: 'USA', city: 'Los Angeles', lat: 34.05, lng: -118.24 },
    { country: 'France', city: 'Paris', lat: 48.85, lng: 2.35 },
    { country: 'Germany', city: 'Berlin', lat: 52.52, lng: 13.40 },
    { country: 'UK', city: 'London', lat: 51.51, lng: -0.13 },
    { country: 'Italy', city: 'Rome', lat: 41.90, lng: 12.49 },
    { country: 'Spain', city: 'Madrid', lat: 40.42, lng: -3.71 },
    { country: 'Brazil', city: 'Rio de Janeiro', lat: -22.91, lng: -43.20 },
    { country: 'Argentina', city: 'Buenos Aires', lat: -34.60, lng: -58.38 },
    { country: 'Japan', city: 'Tokyo', lat: 35.68, lng: 139.76 },
    { country: 'China', city: 'Beijing', lat: 39.90, lng: 116.40 },
    { country: 'Australia', city: 'Sydney', lat: -33.86, lng: 151.21 },
    { country: 'South Africa', city: 'Cape Town', lat: -33.92, lng: 18.42 },
    { country: 'India', city: 'Mumbai', lat: 19.08, lng: 72.88 },
    { country: 'Canada', city: 'Toronto', lat: 43.65, lng: -79.38 },
    { country: 'Mexico', city: 'Mexico City', lat: 19.43, lng: -99.13 },
    { country: 'Russia', city: 'Moscow', lat: 55.76, lng: 37.62 },
    { country: 'Turkey', city: 'Istanbul', lat: 41.01, lng: 28.97 },
    { country: 'Egypt', city: 'Cairo', lat: 30.06, lng: 31.25 },
    { country: 'Saudi Arabia', city: 'Riyadh', lat: 24.71, lng: 46.72 },
    { country: 'United Arab Emirates', city: 'Dubai', lat: 25.20, lng: 55.27 },
    { country: 'Thailand', city: 'Bangkok', lat: 13.76, lng: 100.53 },
    { country: 'South Korea', city: 'Seoul', lat: 37.56, lng: 126.97 },
    { country: 'Singapore', city: 'Singapore', lat: 1.35, lng: 103.82 },
    { country: 'Malaysia', city: 'Kuala Lumpur', lat: 3.14, lng: 101.69 },
    { country: 'Vietnam', city: 'Ho Chi Minh City', lat: 10.76, lng: 106.66 },
    { country: 'Philippines', city: 'Manila', lat: 14.60, lng: 120.99 },
    { country: 'New Zealand', city: 'Auckland', lat: -36.85, lng: 174.76 },
    { country: 'Chile', city: 'Santiago', lat: -33.46, lng: -70.65 },
    { country: 'Colombia', city: 'Bogotá', lat: 4.61, lng: -74.08 },


]

const hostImages = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/men/81.jpg',
    'https://randomuser.me/api/portraits/women/29.jpg',
    'https://randomuser.me/api/portraits/men/11.jpg',
    'https://randomuser.me/api/portraits/women/82.jpg'
]

function getRandomDate() {
    const year = getRandomIntInclusive(new Date().getFullYear() - 10, new Date().getFullYear());
    const month = getRandomIntInclusive(1, 12);
    return `${year}-${month.toString().padStart(2, '0')}`;
}

const reviewsTxts = [
    'What a lovely apartment!',
    'Had a great stay, highly recommend.',
    'Not bad, but could use some improvements.',
    'The apartment was okay, but not what I expected.',
    'Amazing experience! Will definitely return.',
    'Very disappointed. The place was not as described.',
    'Perfect for a short stay, had everything I needed.',
    'Nice place but a bit noisy at night.',
    'Clean and comfortable. Worth the price.',
    'Great location, but the apartment was a bit small.'
]
const fullnames = [
    'James Green', 'Anna Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown',
    'Sarah Wilson', 'David Lee', 'Jessica Harris', 'Daniel Clark', 'Laura Lewis'
]

const reviews = Array.from({ length: 10 }, () => ({
    _id: makeId(),
    txt: getRandomItems(reviewsTxts, 1),
    rate: getRandomIntInclusive(4, 5),
    date: getRandomDate(),
    by: {
        _id: makeId(),
        fullname: getRandomItems(fullnames, 1),
        imgUrl: ''
    }
}))

const houseRules = [
    //  Checking In and Checking Out
    { txt: "Check-in time is from 3:00 PM. Please let us know if you need to arrange a different time.", type: "checking in/checking out" },
    { txt: "Check-out time is by 11:00 AM. If you need a later check-out, please ask us in advance.", type: "checking in/checking out" },
    { txt: "You will receive instructions for key pickup or drop-off prior to your arrival.", type: "checking in/checking out" },
    { txt: "Please dispose of trash and recyclables in the appropriate bins before leaving.", type: "checking in/checking out" },
    { txt: "Return all keys to the designated spot before departing.", type: "checking in/checking out" },
    { txt: "Ensure all doors and windows are locked before you leave.", type: "checking in/checking out" },
    { txt: "Leave used towels in the bathroom and ensure the property is left in good condition.", type: "checking in/checking out" },

    // During Your Stay
    { txt: "No smoking inside the property. Please use the designated smoking area outside.", type: "during your stay" },
    { txt: "No pets allowed unless you have received prior approval from us.", type: "during your stay" },
    { txt: "Quiet hours are from 10:00 PM to 8:00 AM. Please be mindful of neighbors and other guests.", type: "during your stay" },
    { txt: "Parties and events are not allowed on the premises.", type: "during your stay" },
    { txt: "Report any damages or issues to us immediately so we can address them promptly.", type: "during your stay" },
    { txt: "Only registered guests are allowed on the property. Unauthorized guests are not permitted.", type: "during your stay" },
    { txt: "Please use coasters and placemats provided to protect furniture.", type: "during your stay" },
    { txt: "Turn off all appliances and lights before leaving the property.", type: "during your stay" }
]

const safetyProperty = [
    // Safety Considerations
    { txt: "In case of emergency, use the nearest exit and follow the evacuation plan located in the guest information booklet.", type: "Safety considerations" },
    { txt: "Do not block or obstruct fire exits and emergency routes at any time.", type: "Safety considerations" },
    { txt: "Ensure that all doors and windows are secured when you leave the property to prevent unauthorized access.", type: "Safety considerations" },
    { txt: "Do not use candles or open flames inside the property. Use battery-operated lights instead.", type: "Safety considerations" },
    { txt: "Avoid overloading electrical outlets and power strips to prevent fire hazards.", type: "Safety considerations" },
    { txt: "Keep all hazardous materials, such as cleaning supplies and chemicals, out of reach of children.", type: "Safety considerations" },
    { txt: "If you notice any electrical or plumbing issues, report them immediately. Do not attempt to fix them yourself.", type: "Safety considerations" },
    { txt: "Ensure that all stairs and walkways are free of obstacles to prevent tripping hazards.", type: "Safety considerations" },

    // Safety Devices
    { txt: "Smoke detectors are installed in all sleeping areas and common spaces. Do not tamper with or disable them.", type: "Safety devices" },
    { txt: "A carbon monoxide detector is located near the sleeping areas. Make sure it is functioning during your stay.", type: "Safety devices" },
    { txt: "Fire extinguishers are provided in the kitchen and near the entrance. Familiarize yourself with their locations and usage.", type: "Safety devices" },
    { txt: "First aid kits are available in the kitchen and bathroom. Use them only for emergencies and check them for completeness upon arrival.", type: "Safety devices" },
    { txt: "A fire blanket is located in the kitchen for use in case of small fires. Ensure you know how to use it.", type: "Safety devices" },
    { txt: "The property is equipped with an alarm system. Instructions for setting and disarming will be provided upon arrival.", type: "Safety devices" },
    { txt: "Security cameras are installed at the exterior of the property for monitoring. There are no cameras inside the property.", type: "Safety devices" },

    // Property Info
    { txt: "The property is equipped with an alarm system. Follow the provided instructions for setting and disarming the system.", type: "Property info" },
    { txt: "The property has a surveillance system at the entrance for security purposes. There are no cameras inside the property.", type: "Property info" },
    { txt: "The water heater is set to a safe temperature to prevent scalding. Adjustments should be made with caution.", type: "Property info" },
    { txt: "The heating and cooling systems are automated. Instructions for manual adjustments are provided in the guest information booklet.", type: "Property info" },
    { txt: "The property includes a safe for storing valuables. Please use it to secure your personal items.", type: "Property info" },
    { txt: "A smoke-free policy is enforced inside the property. Smoking is allowed only in designated outdoor areas.", type: "Property info" },
    { txt: "The property includes a monitored security system. Please ensure all doors and windows are locked when you leave.", type: "Property info" },
    { txt: "Guests are responsible for their own safety while using the pool or hot tub. Please follow all posted safety guidelines.", type: "Property info" },
    { txt: "The property is equipped with a fire sprinkler system in all rooms for added safety.", type: "Property info" }
]
const cancellationPolicy = [
    { txt: "Cancellation made within 48 hours of booking receives a full refund, provided the cancellation is made at least 14 days before check-in." },
    { txt: "If you cancel between 7 and 14 days before check-in, you'll receive a 50% refund of the total booking amount." },
    { txt: "Cancellations made less than 7 days before check-in will not receive a refund." },
    { txt: "If you cancel your booking after check-in, you will be charged for the entire stay." },
    { txt: "Some properties offer more flexible cancellation policies. Check the specific listing details for the most accurate information." },
    { txt: "If a booking is canceled due to a force majeure event, such as a natural disaster, a full refund will be issued regardless of the cancellation window." },
    { txt: "Certain bookings may be non-refundable. Always check the cancellation policy before confirming your reservation." },
    { txt: "For long-term stays (28 nights or more), cancellations must be made at least 30 days before check-in to receive a full refund." },
    { txt: "If you cancel a long-term stay booking between 15 and 30 days before check-in, you'll receive a 50% refund of the total booking amount." },
    { txt: "Cancellations made less than 15 days before check-in for long-term stays will not receive a refund." },
    { txt: "Refunds for cancellations will be processed to the original payment method and may take up to 10 business days to appear." },
    { txt: "In case of a cancellation, the service fees charged by Airbnb are non-refundable." },
    { txt: "If you need to change your booking dates, you can do so within 48 hours of booking for no additional charge, subject to availability." },
    { txt: "Changes made less than 48 hours after booking may incur additional fees, depending on the host’s policies." },
    { txt: "No refund will be issued for cancellations made less than 24 hours before check-in." }
]
