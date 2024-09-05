import { useEffect, useRef, useState } from "react";
import { GoogleMap } from "./GoogleMap";
import mapIcon from '../../assets/imgs/icons/map-pink.svg'

export function ListingLocation({ location, onLocationChange }) {
    const inputRef = useRef(null)
    const [autocomplete, setAutocomplete] = useState(null);

    useEffect(() => {
        if (!window.google || !window.google.maps || !window.google.maps.places) return;

        const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ['geocode'], // Restrict to geographical locations
        });

        setAutocomplete(autocompleteInstance);

        autocompleteInstance.addListener('place_changed', () => {
            const place = autocompleteInstance.getPlace();
            if (place.geometry) {
                const { lat, lng } = place.geometry.location;
                onLocationChange({
                    address: place.formatted_address,
                    lat: lat(),
                    lng: lng(),
                });
            }
        });

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the default action
                event.stopPropagation(); // Stop the event from bubbling up

                // If you want the map to update, you may want to trigger any map-related actions here.
            }
        };

        inputRef.current.addEventListener('keydown', handleKeyDown);

        return () => {
            inputRef.current.removeEventListener('keydown', handleKeyDown);
        };
    }, [onLocationChange]);

   
    function handleLocationInput(ev) {
        onLocationChange({ ...location, address: ev.target.value });

        if (ev.key === 'Enter' && autocomplete) {
            // Trigger the place_changed event manually
            ev.preventDefault();  // Prevent the default action (like form submission or opening a dialog)
            ev.stopPropagation(); 
            const place = autocomplete.getPlace();
            if (place && place.geometry) {
                const { lat, lng } = place.geometry.location;
                onLocationChange({
                    address: place.formatted_address,
                    lat: lat(),
                    lng: lng(),
                });
            }
        }
    }

    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault(); // Prevent the default action when Enter is pressed
    //     }
    // };

    // inputRef.current.addEventListener('keydown', handleKeyDown);


    return (
        // Important! Always set the container height explicitly
        <div className="location" >
            <div className='info'>
                <h1>Where's your place located?</h1>
                <p>Your address is only shared with guests after they’ve made a reservation.</p>
            </div>
            <label>Location</label>
            <input
                ref={inputRef}
                type="text"
                value={location.address || ''}
                onChange={handleLocationInput}
                placeholder="Enter your location"
                className="location-input"
            />
            <GoogleMap center={{ lat: location.lat, lng: location.lng }} zoom={13}>
                <div
                    lat={location.lat}
                    lng={location.lng}
                    className="custom-marker"              >
                    <img src={mapIcon} alt="Marker" />
                </div>
            </GoogleMap>
        </div>
    )
}
