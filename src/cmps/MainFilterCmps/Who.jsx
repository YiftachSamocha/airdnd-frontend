import { useEffect, useState } from "react"
import { stayService } from "../../services/stay"

export function Who({ filterCapacity, setFilterCapacity }) {
    const [capacity, setCapacity] = useState(filterCapacity)
    const capacityInfo = [{ name: 'adults', info: 'Ages 13 or above' }, { name: 'children', info: 'Ages 2 - 12' }, { name: 'infants', info: 'Under 2' }, { name: 'pets', info: 'Bringing a service animal?' }]
    useEffect(() => {
        const { adults, children, infants, pets } = filterCapacity
        if (adults + children + infants + pets === 0) {
            setCapacity(stayService.getDefaultFilter().who)
        }

    }, [filterCapacity])
    function changeCapacity(type, amount) {
        const newValue = capacity[type] + amount
        const newCapacity = newValue >= 0 ? { ...capacity, [type]: newValue } : capacity
        setCapacity(newCapacity)
        setFilterCapacity(newCapacity)
    }
    return <div className="who">
        {capacityInfo.map(type => {
            return <div>
                <div>
                    <h5>{type.name}:</h5>
                    <p>{type.info}</p>
                </div>
                <div>
                    <button onClick={() => changeCapacity(type.name, -1)}>-</button>
                    <span>{capacity[type.name]}</span>
                    <button onClick={() => changeCapacity(type.name, +1)}>+</button>
                </div>
            </div>
        })}
    </div>
}