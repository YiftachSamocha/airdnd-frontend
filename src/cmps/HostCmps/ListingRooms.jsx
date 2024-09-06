import { NumberInput } from "../StarterCmps/NumberInput";

export function ListingRooms({ formData, onRoomsChange }) {
    const handleInputChange = (key, value) => {
        onRoomsChange(key, value); // Since formData.sleep is already passed as a prop
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