import { useEffect, useRef, useState } from "react"
import { stayService } from "../../services/stay"
import plusIcon from '../..//assets/imgs/icons/plus.svg'
import minusIcon from '../../assets/imgs/icons/minus.svg'


export function Who({ filterCapacity, setFilterCapacity, onClose }) {
    const [capacity, setCapacity] = useState(filterCapacity)
    const whoRef = useRef(null)
    const [disabledClasses, setDisabledClasses] = useState({}) // Track disabled classes for buttons

    const totalCount = Object.values(capacity).reduce((a, b) => a + b, 0);

    const capacityInfo = [
        { name: 'adults', info: 'Ages 13 or above' },
        { name: 'children', info: 'Ages 2 - 12' },
        { name: 'infants', info: 'Under 2' },
        { name: 'pets', info: 'Bringing a service animal?' }
    ]

    useEffect(() => {
        const { adults, children, infants, pets } = filterCapacity
        if (adults + children + infants + pets === 0) {
            setCapacity(stayService.getDefaultFilter().who)
        }

    }, [filterCapacity])

    useEffect(() => {
        checkDisabledClasses()
    }, [capacity])


    function checkDisabledClasses() {
        const newDisabledClasses = { ...disabledClasses };
    
        // Apply specific conditions for each type
        capacityInfo.forEach((type) => {
            const typeName = type.name;
    
            // Initialize the disabled state for plus and minus buttons
            newDisabledClasses[typeName] = { plus: '', minus: '' };
    
            // Disable the + button if the total count is >= 16
            if (totalCount >= 16) {
                newDisabledClasses[typeName].plus = 'disabled'
            }
    
            // Disable the - button if count is <= minimum limit (1 for adults, 0 for others)
            if (typeName === 'adults') {
                if (capacity.adults <= 1) {
                    newDisabledClasses['adults'].minus = 'disabled'
                }
            } else if (capacity[typeName] <= 0) {
                newDisabledClasses[typeName].minus = 'disabled'
            }
        })
    
        // Update state only if the disabledClasses have changed to avoid unnecessary re-renders
        if (JSON.stringify(newDisabledClasses) !== JSON.stringify(disabledClasses)) {
            setDisabledClasses(newDisabledClasses)
        }
    }
    
    function changeCapacity(type, amount) {
        const newValue = capacity[type] + amount
        if ((type === 'adults' && newValue < 1) || 
        (type !== 'adults' && newValue < 0)) return

        if (totalCount >= 16 && amount > 0) return

        const newCapacity = { ...capacity, [type]: newValue }
        setCapacity(newCapacity)
        setFilterCapacity(newCapacity)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (whoRef.current && !whoRef.current.contains(event.target)) {
                console.log("Click outside detected. Closing Who component.")
                onClose(); // Close the Who component if clicked outside
            }
        }

        console.log("Adding event listener for outside clicks.")
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            console.log("Removing event listener for outside clicks.")
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])



    return <div className="who">
        {capacityInfo.map(type => {
            return <div key={type.name}>
                <div>
                    <h5>{type.name}:</h5>
                    <p>{type.info}</p>
                </div>
                <div>
                    <button
                        onClick={() => changeCapacity(type.name, -1)}
                        className={`change-count ${disabledClasses[type.name]?.minus || ''}`}
                        >
                        <div className="icon-container">
                            <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                                <path d="m.75 6.75h10.5v-1.5h-10.5z" />
                            </svg>
                        </div>
                    </button>
                    <span>{capacity[type.name]}</span>

                    <button
                        onClick={() => changeCapacity(type.name, +1)}
                        className={`change-count ${disabledClasses[type.name]?.plus || ''}`}>
                        <div className="icon-container">
                            <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" >
                                <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        })}
        {onClose && (
            <button className="btn-link" onClick={onClose}>Close</button>
        )}
    </div>
}