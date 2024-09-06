import { useState, useCallback } from 'react'
import { debounce } from '../../services/util.service' // Assuming this is where your debounce is located

export function ListingTitle({ name, onNameChange }) {
    const [localName, setLocalName] = useState(name)
    const [nameCount, setNameCount] = useState(name.length)

    // Memoize the debounced function with useCallback to ensure it doesn't get recreated
    const debouncedChange = useCallback(
        debounce((newName) => {
            onNameChange(newName)
        }, 500), [onNameChange]
    )

    function handleNameChange (ev) {
        const newName = ev.target.value
        setLocalName(newName) // Update the local name instantly for real-time feedback
        setNameCount(newName.length) // Update the character count
        debouncedChange(newName) // Use debounced function to notify parent
    }

    return (
        <div className="txt-area info">
            <h2>Now, let's give your castle a name</h2>
            <p>Short names work best. Have fun with it—you can always change it later.</p>
            <textarea
                value={localName} // Use local state for immediate updates
                onChange={handleNameChange}
                maxLength="32"
                placeholder="Add a title..."
            />
            <p className="char-limit">{nameCount}/32</p>
        </div>
    )
}