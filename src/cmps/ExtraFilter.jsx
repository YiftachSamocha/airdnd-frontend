import { useEffect, useState } from "react"
import instantImg from '../assets/imgs/Extra/instant.png'
import petsImg from '../assets/imgs/Extra/pets.png'
import selfImg from '../assets/imgs/Extra/self.png'
import favoriteImg from '../assets/imgs/Extra/favorite.png'
import luxeImg from '../assets/imgs/Extra/luxe.png'
import { getData } from "../services/stay.data"
import { Range, getTrackBackground } from 'react-range';
import { BarChart } from "./LibariesCmps/BarChart"

export function ExtraFilter({ filterBy, setFilterBy }) {
    const MAX_PRICE_TO_PERSON = 500
    const [selectedType, setSelectedType] = useState('any')
    const [rooms, setRooms] = useState({ rooms: 0, bedrooms: 0, bathrooms: 0 })
    const [price, setPrice] = useState([40, MAX_PRICE_TO_PERSON])
    const [booking, setBooking] = useState({ instant: false, self: false, pets: false })
    const [standout, setStandout] = useState({ favorite: false, luxe: false })
    const [amenteies, setAmeneties] = useState(getData('mainAmenities'))
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE_TO_PERSON);
    const [priceInput, setPriceInput] = useState(price)

    useEffect(() => {
        if (filterBy.who) {
            let newMax = MAX_PRICE_TO_PERSON
            const capacity = filterBy.who.adults + filterBy.who.children + filterBy.who.infants
            if (capacity !== 0) {
                newMax = capacity * MAX_PRICE_TO_PERSON
                setMaxPrice(newMax)
            }

            setPrice(prevPrice => [
                Math.max(40, Math.min(prevPrice[0], newMax)),
                Math.min(prevPrice[1], newMax)
            ])
        }
    }, [filterBy])
    useEffect(() => {
        if (price) {
            setPriceInput(price)
        }
    }, [price])

    function changeRooms(type, size) {
        if (rooms[type] + size < 0) return
        setRooms(prev => ({ ...prev, [type]: prev[type] + size }))
    }

    function handleChangePrice({ target }) {
        let { name, value } = target
        value = Number(value.slice(1))
        if (value === NaN) return
        let newPrice
        if (name === 'min') {
            newPrice = [value, price[1]]
        }
        else {
            newPrice = [price[0], value]
        }
        setPriceInput(newPrice)
        if (value < 40 || value > maxPrice) return
        if (name === 'min' && value > price[1]) return
        if (name === 'max' && value < price[0]) return
        setPrice(newPrice)
    }

    function clearAll() {
        setSelectedType('any')
        setRooms({ rooms: 0, bedrooms: 0, bathrooms: 0 })
        setPrice([40, MAX_PRICE_TO_PERSON])
        setBooking({ instant: false, self: false, pets: false })
        setStandout({ favorite: false, luxe: false })
        setAmeneties(getData('mainAmenities'))
        setMaxPrice(MAX_PRICE_TO_PERSON)
        setPriceInput([40, MAX_PRICE_TO_PERSON])
    }


    return <div className="extra-filter">
        <div className="extra-header">
            <button>X</button>
            <h4>Filters</h4>
        </div>
        <div className="extra-main">
            <div className="type">
                <h5>Type of place</h5>
                <div>
                    <button onClick={() => setSelectedType('any')} className={selectedType === 'any' ? 'selected' : ''}>
                        Any type
                    </button>
                    <button onClick={() => setSelectedType('room')} className={selectedType === 'room' ? 'selected' : ''}>
                        Room
                    </button>
                    <button onClick={() => setSelectedType('home')} className={selectedType === 'home' ? 'selected' : ''}>
                        Entire home
                    </button>
                </div>
            </div>
            <hr />
            <div className="price">
                <h5>Price Range</h5>
                <h6>Nightly prices including fees and taxes</h6>
                <div className="chart">
                    <BarChart range={price} maxPrice={maxPrice} />
                </div>
                <div className="range">
                    <Range
                        values={price}
                        step={10}
                        min={40}
                        max={maxPrice}
                        onChange={values => {
                            const clampedValues = [
                                Math.max(40, Math.min(values[0], maxPrice)),
                                Math.min(values[1], maxPrice)
                            ];
                            setPrice(clampedValues);
                        }}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '2px',
                                    width: '100%',
                                    background: getTrackBackground({
                                        values: price,
                                        colors: ['#ccc', '#ff385c', '#ccc'],
                                        min: 40,
                                        max: maxPrice,
                                    }),
                                    borderRadius: '2px',
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '32px',
                                    width: '32px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '50%',
                                    boxShadow: '0px 2px 6px #AAA',
                                }}
                            />
                        )}
                    />
                </div>
                <div className="price-inputs">
                    <div>
                        <label htmlFor="min">Minimum</label>
                        <input type="text" value={'$' + priceInput[0]}
                            id="min" name="min" onChange={handleChangePrice} />
                    </div>
                    <div>
                        <label htmlFor="max">Maximum</label>
                        <input type="text" value={'$' + priceInput[1]}
                            id="max" name="max" onChange={handleChangePrice} />
                    </div>
                </div>
            </div>
            <hr />
            <div className="rooms">
                <h5>Rooms and beds</h5>
                <div className="rooms-container">
                    <div>
                        <p>Rooms</p>
                        <div>
                            <button onClick={() => changeRooms('rooms', -1)}>-</button>
                            <span>{rooms.rooms === 0 ? 'Any' : rooms.rooms + '+'}</span>
                            <button onClick={() => changeRooms('rooms', 1)}>+</button>
                        </div>
                    </div>
                    <div>
                        <p>Bedrooms</p>
                        <div>
                            <button onClick={() => changeRooms('bedrooms', -1)}>-</button>
                            <span>{rooms.bedrooms === 0 ? 'Any' : rooms.bedrooms + '+'}</span>
                            <button onClick={() => changeRooms('bedrooms', 1)}>+</button>
                        </div>
                    </div>
                    <div>
                        <p>Bathrooms</p>
                        <div>
                            <button onClick={() => changeRooms('bathrooms', -1)}>-</button>
                            <span>{rooms.bathrooms === 0 ? 'Any' : rooms.bathrooms + '+'}</span>
                            <button onClick={() => changeRooms('bathrooms', 1)}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="amenities">
                <h5>Amenteies</h5>
                <div>
                    {amenteies.map(amenity => {
                        return <button className={amenity.isSelected ? 'selected' : ''}
                            onClick={() =>
                                setAmeneties(prev =>
                                    prev.map(am => am.name === amenity.name ? { ...am, isSelected: !am.isSelected } : am))}>
                            <img src={amenity.imgUrl} alt="" />
                            {amenity.name}
                        </button>
                    })}
                </div>
            </div>
            <hr />
            <div className="booking">
                <h5>Booking options</h5>
                <div>
                    <button className={booking.instant ? 'selected' : ''}
                        onClick={() => setBooking(prev => ({ ...prev, instant: !prev.instant }))}>
                        <img src={instantImg} />
                        Instant Book
                    </button>
                    <button className={booking.self ? 'selected' : ''}
                        onClick={() => setBooking(prev => ({ ...prev, self: !prev.self }))}>
                        <img src={selfImg} />
                        Self check in</button>
                    <button className={booking.pets ? 'selected' : ''}
                        onClick={() => setBooking(prev => ({ ...prev, pets: !prev.pets }))} >
                        <img src={petsImg} />
                        Allows pets
                    </button>
                </div>
            </div>
            <hr />
            <div className="standout">
                <h5>Standout stays</h5>
                <div>
                    <button className={standout.favorite ? 'selected' : ''}
                        onClick={() => setStandout(prev => ({ ...prev, favorite: !prev.favorite }))} >
                        <img src={favoriteImg} />
                        <div>
                            <h5>Guest favorite</h5>
                            <h6>The most loved homes on Airbnb</h6>
                        </div>
                    </button>
                    <button className={standout.luxe ? 'selected' : ''}
                        onClick={() => setStandout(prev => ({ ...prev, luxe: !prev.luxe }))}>
                        <img src={luxeImg} />
                        <div>
                            <h5>Luxe</h5>
                            <h6>Luxary homes with elevated design</h6>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <div className="extra-footer">
            <button onClick={clearAll}>Clear all</button>
            <button>Show 1000+ places</button>
        </div>


    </div>
}