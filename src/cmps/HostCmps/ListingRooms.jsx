import { useEffect } from "react";
import { NumberInput } from "../StarterCmps/NumberInput";

export function ListingRooms({ formData, onRoomsChange, onValidate }) {
    const handleInputChange = (key, value) => {
        onRoomsChange(key, value); // Since formData.sleep is already passed as a prop
    }

    useEffect(() => {
        const isValid = validateRooms(formData)
        onValidate(isValid) // Notify parent whether rooms data is valid
    }, [formData])

    function validateRooms(data) {
        return (
            data.maxCapacity >= 1 && 
            data.bedrooms >= 1 && 
            data.beds >= 1 && 
            data.bathrooms >= 1
        )  // Ensure all fields have valid values
    }

    return (
        <div className="listing-rooms info">
            <h2>Share some basics about your place</h2>
            <p>You'll add more details later, like bed types.</p>
            <div className="room-info">
                <NumberInput 
                    label="Guests" 
                    value={formData.maxCapacity} 
                    onChange={(value) => handleInputChange('maxCapacity', value)} 
                />
                <NumberInput 
                    label="Bedrooms" 
                    value={formData.bedrooms} 
                    onChange={(value) => handleInputChange('bedrooms', value)} 
                />
                <NumberInput 
                    label="Beds" 
                    value={formData.beds} 
                    onChange={(value) => handleInputChange('beds', value)} 
                />
                <NumberInput 
                    label="Bathrooms" 
                    value={formData.bathrooms} 
                    onChange={(value) => handleInputChange('bathrooms', value)} 
                />
            </div>
        </div>
    )
}