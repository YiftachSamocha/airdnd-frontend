import { useEffect } from "react";


export function ListingType({ type, onPlaceTypeChange, onValidate }) {
    console.log('Current type:', type);  // Add this to check the value of the type prop

    useEffect(() => {
        const isValid = !!type;  // Type is valid if it's not empty or null
        onValidate(isValid);  // Notify the parent component
    }, [type])

    return (
        <div className="selection info listing-type">
            <h2>What type of place will guests have?</h2>
            <div className="selection-grid">
                <label className={`option-item ${type === 'entire-place' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="type"
                        value="entire-place"
                        checked={type === 'entire-place'}
                        onChange={(e) => {
                            onPlaceTypeChange(e.target.value)
                            
                        }}
                    />
                    <div className="option-content">
                        <h3>An entire place</h3>
                        <p>Guests have the whole place to themselves.</p>
                    </div>
                </label>

                <label className={`option-item ${type === 'room' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="type"
                        value="room"
                        checked={type === 'room'}
                        onChange={(e) => onPlaceTypeChange(e.target.value)}
                    />
                    <div className="option-content">
                        <h3>A room</h3>
                        <p>Guests have their own room in a home, plus access to shared spaces.</p>
                    </div>
                </label>

                <label className={`option-item ${type === 'shared-room' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="type"
                        value="shared-room"
                        checked={type === 'shared-room'}
                        onChange={(e) => onPlaceTypeChange(e.target.value)}
                    />
                    <div className="option-content">
                        <h3>A shared room</h3>
                        <p>Guests sleep in a room or common area that may be shared with you or others.</p>
                    </div>
                </label>
            </div>
        </div>
    );
}