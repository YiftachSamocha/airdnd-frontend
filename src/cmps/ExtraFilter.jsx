import { useEffect, useState } from "react"
import instantImg from '../assets/imgs/Extra/instant.png'
import petsImg from '../assets/imgs/Extra/pets.png'
import selfImg from '../assets/imgs/Extra/self.png'
import favoriteImg from '../assets/imgs/Extra/favorite.png'
import luxeImg from '../assets/imgs/Extra/luxe.png'
import { getData } from "../services/stay.data"
import { Range, getTrackBackground } from 'react-range';
import { BarChart } from "./LibariesCmps/BarChart"
import { SET_FILTER_BY } from "../store/reducers/stay.reducer"
import { useSelector } from "react-redux"
import { stayService } from "../services/stay"
import { store } from "../store/store"

export function ExtraFilter({ closeExtra }) {
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const MAX_PRICE_TO_PERSON = 500
    const [type, setType] = useState('any')
    const [rooms, setRooms] = useState({ rooms: 0, bedrooms: 0, bathrooms: 0 })
    const [price, setPrice] = useState([40, 3000])
    const [maxPrice, setMaxPrice] = useState(3000)
    const [booking, setBooking] = useState({ instant: false, self: false, pets: false })
    const [standout, setStandout] = useState({ favorite: false, luxe: false })
    const [amenities, setAmenities] = useState(getData('mainAmenities'))
    const [priceInput, setPriceInput] = useState(price);

    useEffect(() => {
        if (filterBy.extra.type) setType(filterBy.extra.type)
        if (filterBy.extra.rooms) setRooms(filterBy.extra.rooms)
        if (filterBy.extra.price) setPrice(filterBy.extra.price)
        if (filterBy.extra.maxPrice) setMaxPrice(filterBy.extra.maxPrice)
        if (filterBy.extra.amenities) setAmenities(filterBy.extra.amenities)
        if (filterBy.extra.booking) setBooking(filterBy.extra.booking)
        if (filterBy.extra.standout) setStandout(filterBy.extra.standout)
    }, [filterBy.extra])

    useEffect(() => {
        setPrice(prevPrice => [
            Math.max(40, Math.min(prevPrice[0], maxPrice)),
            Math.min(prevPrice[1], maxPrice)
        ]);
    }, [maxPrice])

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
        const defaultFilter = stayService.getDefaultFilter()
        setType(defaultFilter.extra.type)
        setRooms(defaultFilter.extra.rooms)
        setPrice(defaultFilter.extra.price)
        setBooking(defaultFilter.extra.booking)
        setStandout(defaultFilter.extra.standout)
        setAmenities(defaultFilter.extra.amenities)
        setMaxPrice(defaultFilter.extra.maxPrice)
        setPriceInput([40, MAX_PRICE_TO_PERSON])
    }

    function onSubmit() {
        const extra = {
            type,
            price,
            rooms,
            amenities,
            booking,
            standout,
        }
        store.dispatch({ type: SET_FILTER_BY, filterBy: ({ ...filterBy, extra }) })
        closeExtra()
    }


    return <div className="extra-filter">
        <div className="extra-header">
            <button onClick={() => closeExtra()}>X</button>
            <h4>Filters</h4>
        </div>
        <div className="extra-main">
            <div className="type">
                <h5>Type of place</h5>
                <div>
                    <button onClick={() => setType('any')} className={type === 'any' ? 'selected' : ''}>
                        Any type
                    </button>
                    <button onClick={() => setType('room')} className={type === 'room' ? 'selected' : ''}>
                        Room
                    </button>
                    <button onClick={() => setType('home')} className={type === 'home' ? 'selected' : ''}>
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
                <h5>Amenities</h5>
                <div>
                    {amenities.map(amenity => {
                        return <button className={amenity.isSelected ? 'selected' : ''} key={amenity.label}
                            onClick={() =>
                                setAmenities(prev =>
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
            <button onClick={onSubmit}>Show 1000+ places</button>
        </div>
    </div>
}