import rightArrow from '../../assets/imgs/icons/arrow-right.svg' // Adjust the path based on your project structure
import leftArrow from '../../assets/imgs/icons/arrow-left.svg' // Adjust the path based on your project structure
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable';

export function StayRooms({ stay }) {
    const [currPicIndex, setCurrPicIndex] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 743);

    const roomsPerPage = 2
    const totalRooms = stay.sleep.rooms.length
    const totalPages = Math.ceil(totalRooms / roomsPerPage); // Calculate total pages

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 743)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    function onRightClick() {
        if (currPage >= totalPages) return
        const newPage = currPage + 1
        setCurrPage(newPage)

        const isLastTwo = currPicIndex + roomsPerPage >= totalRooms - 1
        if (isLastTwo) {
            setCurrPicIndex(totalRooms - roomsPerPage)
        } else {
            setCurrPicIndex(currPicIndex + roomsPerPage)
        }
    }
    function onLeftClick() {
        if (currPage <= 1) return // Stop if already on the first page
        const newPage = currPage - 1
        setCurrPage(newPage)

        const isFirstTwo = currPicIndex - roomsPerPage < 0
        if (isFirstTwo) {
            setCurrPicIndex(0)
        } else {
            setCurrPicIndex(currPicIndex - roomsPerPage)
        }
    }

    function generateBedSummary(room) {
        return `${room.bedType}`
    }

    const visibleRooms = stay.sleep.rooms.slice(currPicIndex, currPicIndex + roomsPerPage)

    return (
        <section className="bedrooms">
            <div className="rooms-header">
                <h3>Where you'll sleep</h3>
                {totalRooms > roomsPerPage && (
                    <div className="btn-container">
                        <span>{currPage} / {totalPages}</span>
                        <div className="back">
                            <button onClick={onLeftClick} disabled={currPicIndex === 0}>
                                <img src={leftArrow} alt="back" />
                            </button>
                        </div>
                        <div className="forward">
                            <button onClick={onRightClick} disabled={currPicIndex >= totalRooms - roomsPerPage}>
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
                        transform: isSmallScreen
                        ? `translateX(-${currPicIndex * 10}%)`
                        : `translateX(-${currPicIndex * (103 / roomsPerPage)}%)`,
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
        </section >
    )
}