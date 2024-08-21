import { useState } from "react"

export function Who() {
    const [capacity, setCapacity] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
    const capacityInfo = [{ name: 'adults', info: 'Ages 13 or above' }, { name: 'children', info: 'Ages 2 - 12' }, { name: 'infants', info: 'Under 2' }, { name: 'pets', info: 'Bringing a service animal?' }]

    function changeCapacity(type, amount) {
        setCapacity(prev => {
            const newValue = prev[type] + amount
            return newValue >= 0 ? { ...prev, [type]: newValue } : prev
        })
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
                    <p>{capacity[type.name]}</p>
                    <button onClick={() => changeCapacity(type.name, +1)}>+</button>
                </div>
            </div>
        })}
    </div>
}