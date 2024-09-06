import { useState, useCallback } from 'react'
import { debounce } from '../../services/util.service' // Assuming this is where your debounce is located

export function ListingTitle({ title, onTitleChange }) {
    const [localTitle, setLocalTitle] = useState(title)
    const [titleCount, setTitleCount] = useState(title.length)

    // Memoize the debounced function with useCallback to ensure it doesn't get recreated
    const debouncedChange = useCallback(
        debounce((newTitle) => {
            onTitleChange(newTitle)
        }, 500), [onTitleChange]
    )

    function handleTitleChange (ev) {
        const newTitle = ev.target.value
        setLocalTitle(newTitle) // Update the local title instantly for real-time feedback
        setTitleCount(newTitle.length) // Update the character count
        debouncedChange(newTitle) // Use debounced function to notify parent
    }

    return (
        <div className="txt-area info">
            <h2>Now, let's give your castle a title</h2>
            <p>Short titles work best. Have fun with it—you can always change it later.</p>
            <textarea
                value={localTitle} // Use local state for immediate updates
                onChange={handleTitleChange}
                maxLength="32"
                placeholder="Add a title..."
            />
            <p className="char-limit">{titleCount}/32</p>
        </div>
    )
}