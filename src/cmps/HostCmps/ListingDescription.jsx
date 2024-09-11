import { useState, useEffect, useCallback } from 'react'
import { debounce } from '../../services/util.service'

export function ListingDescription({ description, onDescriptionChange, onValidate }) {
    const [count, setCount] = useState(description.length)
    const [localDesc, setLocalDesc] = useState(description) 
    const [isFirstFocus, setIsFirstFocus] = useState(true) // Flag to track first focus

    const defaultText = "You'll always remember your time at this unique place to stay." 

    const debouncedChange = useCallback(
        debounce((newDesc) => {
            onDescriptionChange(newDesc) 
        }, 500), [description]
    )

    // const debouncedValidation = useCallback(
    //     debounce((desc) => {
    //         const isValid = validateDescription(desc)
    //         onValidate(isValid)
    //     }, 500),
    //     [onValidate]
    // )

    useEffect(() => {
        setLocalDesc(description) // Sync with description prop when it changes
        setCount(description.length) 
    }, [description])


    useEffect(() => {
        const isValid = validateDescription(localDesc)
        onValidate(isValid) // Notify parent about validation status
    }, [localDesc])

    // Validation logic: ensure description is not empty and greater than 10 characters
    function validateDescription(desc) {
        return desc.trim().length >= 10 // Ensure it's at least 10 characters long
    }

    function handleChange (ev) {
        const newDesc = ev.target.value
        setLocalDesc(newDesc) // Update local description instantly
        setCount(newDesc.length) // Update character count
        debouncedChange(newDesc) // Use debounced version of onDescriptionChange
    }

    function handleFocus() {
        if (isFirstFocus) {
            setIsFirstFocus(false)
            setLocalDesc('')         }
    }

    function handleBlur() {
        if (!localDesc.trim()) {
            setLocalDesc('') // Keep it empty on blur if the user has deleted everything
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
                onBlur={handleBlur}
                placeholder={isFirstFocus ? defaultText : ''}
            />
            <p className="char-limit">{count}/500</p>
        </div>
    )
}