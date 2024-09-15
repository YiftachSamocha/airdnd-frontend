import { useEffect, useRef, useState } from "react";
import mapPink from '../../assets/imgs/icons/map-pink.svg';
import mapBlack from '../../assets/imgs/icons/map-black.svg';
import { GoogleMap } from "../GoogleMap";

export function ListingLocation({ location, onLocationChange, onValidate }) {
    const inputRef = useRef(null)

    useEffect(() => {
        const isValid = Boolean(location.country && location.city) // Ensure both country and city are truthy
        onValidate(isValid) // Pass the boolean value (true/false) to the parent
    }, [location.country, location.city])

    useEffect(() => {
        if (!window.google || !window.google.maps || !window.google.maps.places) return;

        const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ['geocode'], // Restrict to geographical locations
        });

        autocompleteInstance.addListener('place_changed', () => {
            const place = autocompleteInstance.getPlace();
            // debugger
            if (place.geometry) {
                const { lat, lng } = place.geometry.location;

                const getAddressComponent = (type) => {
                    return place.address_components.find(component => component.types.includes(type))?.long_name || '';
                };

                const updatedLocation = {
                    address: place.formatted_address,
                    lat: lat(),
                    lng: lng(),
                    city: getAddressComponent('locality') || getAddressComponent('administrative_area_level_1'),
                    country: getAddressComponent('country'),
                };
                // Immediately update the location in the parent component
                onLocationChange(updatedLocation);
            }
        });

        // Handle Enter key to prevent default form submission or other actions
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();
            }
        };

        if (inputRef.current) {
            inputRef.current.addEventListener('keydown', handleKeyDown);
        }

        // Cleanup: Remove event listener
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [location]);

    function handleLocationInput(ev) {
        // Update the address part of the location immediately as the user types
        onLocationChange({ ...location, address: ev.target.value });
    }

    return (
        <div className="location">
            <div className='info'>
                <h2>Where's your place located?</h2>
                <p>Your address is only shared with guests after they’ve made a reservation.</p>
            </div>
            <div className="input-position">
                <div className="container">
                    <img src={mapBlack}/>
                    <input
                    ref={inputRef}
                    type="text"
                    value={location.address || ''}
                    onChange={handleLocationInput}
                    placeholder="Enter your location"
                    className="location-input"
                />
                </div>
               
                <GoogleMap center={{ lat: location.lat, lng: location.lng }} zoom={13}>
                    <div
                        lat={location.lat}
                        lng={location.lng}
                        className="custom-marker">
                        <img src={mapPink} alt="Marker" />
                    </div>
                </GoogleMap>
            </div>

        </div>
    );
}