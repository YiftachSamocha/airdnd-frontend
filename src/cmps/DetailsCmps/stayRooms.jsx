import rightArrow from '../../assets/imgs/icons/arrow-right.svg' // Adjust the path based on your project structure
import leftArrow from '../../assets/imgs/icons/arrow-left.svg' // Adjust the path based on your project structure
import { useState } from 'react'

export function StayRooms({ stay }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const roomsPerPage = 2
    const totalRooms = stay.sleep.rooms.length
    const totalPages = Math.ceil(totalRooms / roomsPerPage); // Calculate total pages

    function onRightClick() {
        const isLastTwo = currentIndex + roomsPerPage >= totalRooms - 1
        if (isLastTwo) {
            setCurrentIndex(totalRooms - roomsPerPage)
        } else {
            setCurrentIndex(currentIndex + roomsPerPage)
        }
    }

    function onLeftClick() {
        const isFirstTwo = currentIndex <= roomsPerPage
        if (isFirstTwo) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex - roomsPerPage)
        }
    }

    function generateBedSummary(room) {
        console.log('room', room)
        return `${room.bedType}`
    }

    function getVisibleRooms() {
        return stay.sleep.rooms.slice(currentIndex, currentIndex + roomsPerPage)
    }

    const visibleRooms = getVisibleRooms()
    const currentPage = Math.floor(currentIndex / roomsPerPage) + 1

    return (
        <section className="bedrooms">
            <div className="rooms-header">
                <h3>Where you'll sleep</h3>
                {totalRooms > roomsPerPage && (
                    <div className="btn-container">
                        <span>{currentPage} / {totalPages}</span>
                        <div className="back">
                            <button onClick={onLeftClick} disabled={currentIndex === 0}>
                                <img src={leftArrow} alt="back" />
                            </button>
                        </div>
                        <div className="forward">
                            <button onClick={onRightClick} disabled={currentIndex >= totalRooms - roomsPerPage}>
                                <img src={rightArrow} alt="forward" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="rooms-list-container">
                <div
                    className="rooms-list"
                    style={{
                        transform: `translateX(-${currentIndex * (105 / roomsPerPage)}%)`,
                        transition: 'transform 0.5s ease-in-out',
                    }}
                >
                    {stay.sleep.rooms.map((room, index) => (
                        <div key={index} className="room">
                            <img src={room.imgUrl} alt={`${room.roomType}`} />
                            <div className="room-info">
                                <h4>{room.roomType}</h4>
                                <p>{generateBedSummary(room)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="details-seperation-line" />
        </section>
    )
}