import { useState } from "react"
import instantImg from '../assets/imgs/Extra/instant.png'
import petsImg from '../assets/imgs/Extra/pets.png'
import selfImg from '../assets/imgs/Extra/self.png'
import favoriteImg from '../assets/imgs/Extra/favorite.png'
import luxeImg from '../assets/imgs/Extra/luxe.png'

export function ExtraFilter() {
    const [selectedType, setSelectedType] = useState('any')
    const [rooms, setRooms] = useState({ rooms: 0, bedrooms: 0, bathrooms: 0 })
    const [booking, setBooking] = useState({ instant: false, self: false, pets: false })
    const [standout, setStandout] = useState({ favorite: false, luxe: false })


    function changeRooms(type, size) {
        if (rooms[type] + size < 0) return
        setRooms(prev => ({ ...prev, [type]: prev[type] + size }))
    }

    return <div className="layout">
        <div className="extra-filter">
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
                <div>
                    <h5>Amenteies</h5>
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
                <hr />
                <div className="extra-footer">
                    <button>Clear all</button>
                    <button>Show 1000+ places</button>
                </div>
            </div>


        </div>
    </div>
}