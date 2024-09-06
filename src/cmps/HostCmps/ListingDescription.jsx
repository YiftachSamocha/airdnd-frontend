import { useState, useEffect, useCallback } from 'react'
import { debounce } from '../../services/util.service'

export function ListingDescription({ description, onDescriptionChange }) {
    const [count, setCount] = useState(description.length)
    const [localDesc, setLocalDesc] = useState(description) 
    const [typing, setTyping] = useState(false) 
    const defaultText = "You'll always remember your time at this unique place to stay." 

    const debouncedChange = useCallback(
        debounce((newDesc) => {
            onDescriptionChange(newDesc) 
        }, 500), [onDescriptionChange]
    )

    useEffect(() => {
        setCount(localDesc.length) // Set the initial description count from props
    }, [localDesc])

    useEffect(() => {
        setLocalDesc(description) // Sync with description prop when it changes
    }, [description])

    function handleChange (ev) {
        const newDesc = ev.target.value
        setLocalDesc(newDesc) // Update local description instantly
        setCount(newDesc.length) // Update character count
        debouncedChange(newDesc) // Use debounced version of onDescriptionChange
    }

    function handleFocus ()  {
        if (!typing && !localDesc) {
            setLocalDesc(defaultText) // Set the default description on first focus
            setCount(defaultText.length) // Update count for default description
            setTyping(true) // Ensure this only happens once
        }
    }

    return (
        <div className="txt-area description info">
            <h2>Create your description</h2>
            <p>Share what makes your place special.</p>
            <textarea
                value={localDesc}
                onChange={handleChange}
                onFocus={handleFocus}
                maxLength="500"
                placeholder={defaultText}
            />
            <p className="char-limit">{count}/500</p>
        </div>
    )
}