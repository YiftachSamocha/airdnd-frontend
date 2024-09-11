import wifiImg from '../../assets/imgs/Extra/wifi.png';
import tvImg from '../../assets/imgs/Extra/tv.png';
import kitchenImg from '../../assets/imgs/Extra/kitchen.png';
import washerImg from '../../assets/imgs/Extra/parking.png';
import freeParkingImg from '../../assets/imgs/Extra/parking.png';
import acImg from '../../assets/imgs/Extra/ac.png';

// SVG files
import paidParkingImg from '../../assets/imgs/amenities/paid-parking.svg';
import workspaceImg from '../../assets/imgs/amenities/workspace.svg';
import poolImg from '../../assets/imgs/amenities/pool.svg';
import hotTubImg from '../../assets/imgs/amenities/hot-tub.svg';
import patioImg from '../../assets/imgs/amenities/patio.svg';
import bbqGrillImg from '../../assets/imgs/amenities/bbq-gril.svg';
import outdoorDiningImg from '../../assets/imgs/amenities/outdoor-dining.svg';
import firePitImg from '../../assets/imgs/amenities/fire-pit.svg';
import poolTableImg from '../../assets/imgs/amenities/pool-table.svg';
import fireplaceImg from '../../assets/imgs/amenities/fireplace.svg';
import pianoImg from '../../assets/imgs/amenities/piano.svg';
import gymImg from '../../assets/imgs/amenities/gym.svg';
import lakeAccessImg from '../../assets/imgs/amenities/lake-access.svg';
import beachAccessImg from '../../assets/imgs/amenities/beach-access.svg';
import skiInOutImg from '../../assets/imgs/amenities/ski-in-out.svg';
import outdoorShowerImg from '../../assets/imgs/amenities/outdoor-shower.svg';
import smokeAlarmImg from '../../assets/imgs/amenities/smoke-alarm.svg';
import firstAidImg from '../../assets/imgs/amenities/first-aid.svg';
import fireExtinguisherImg from '../../assets/imgs/amenities/fire-extinguisher.svg';
import carbonAlarmImg from '../../assets/imgs/amenities/carbon-alarm.svg';
import { useEffect } from 'react';

export function ListingAmenities({ amenities = [], onAmenityChange, onValidate }) {
    // Define a mapping between amenities and their corresponding imgUrls
    const amenityImages = {
        'Wifi': wifiImg,
        'TV': tvImg,
        'Kitchen': kitchenImg,
        'Washer': washerImg,
        'Free parking on premises': freeParkingImg,
        'Paid parking on premises': paidParkingImg,
        'Air conditioning': acImg,
        'Dedicated workspace': workspaceImg,
        'Pool': poolImg,
        'Hot tub': hotTubImg,
        'Patio': patioImg,
        'BBQ grill': bbqGrillImg,
        'Outdoor dining area': outdoorDiningImg,
        'Fire pit': firePitImg,
        'Pool table': poolTableImg,
        'Indoor fireplace': fireplaceImg,
        'Piano': pianoImg,
        'Exercise equipment': gymImg,
        'Lake access': lakeAccessImg,
        'Beach access': beachAccessImg,
        'Ski-in/Ski-out': skiInOutImg,
        'Outdoor shower': outdoorShowerImg,
        'Smoke alarm': smokeAlarmImg,
        'First aid kit': firstAidImg,
        'Fire extinguisher': fireExtinguisherImg,
        'Carbon monoxide alarm': carbonAlarmImg
    }

    // Helper function to check if an amenity is selected based on its name
    function isAmenitySelected(amenityName) {
        return amenities.some(a => a.name === amenityName)
    }

    useEffect(() => {
        const isValid = amenities.length > 0  // At least one amenity must be selected
        onValidate(isValid)  // Notify parent about validation status
    }, [amenities])

    return (
        <div className="selection info listing-amenities">
            <h2>Tell guests what your place has to offer</h2>
            <p>You can add more amenities after you publish your listing.</p>

            {/* Guest Favorites */}
            <section>
                <h3>What about these guest favorites?</h3>
                <div className="selection-grid">
                    {['Wifi', 'TV', 'Kitchen', 'Washer', 'Free parking on premises', 'Paid parking on premises', 'Air conditioning', 'Dedicated workspace'].map(amenity => (
                        <label key={amenity} className={`option-item ${isAmenitySelected(amenity) ? 'selected' : ''}`}>
                            <input
                                type="checkbox"
                                name="amenities"
                                value={amenity}
                                checked={isAmenitySelected(amenity)}
                                onChange={(e) => onAmenityChange({ name: e.target.value, type: 'main', imgUrl: amenityImages[amenity] })}
                            />
                            <div className="option-content">
                                <img src={amenityImages[amenity]} alt={amenity} />

                                <p>{amenity}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </section>

            {/* Standout Amenities */}
            <section>
                <h3>Do you have any standout amenities?</h3>
                <div className="selection-grid">
                    {['Pool', 'Hot tub', 'Patio', 'BBQ grill', 'Outdoor dining area', 'Fire pit', 'Pool table', 'Indoor fireplace', 'Piano', 'Exercise equipment', 'Lake access', 'Beach access', 'Ski-in/Ski-out', 'Outdoor shower'].map(amenity => (
                        <label key={amenity} className={`option-item ${isAmenitySelected(amenity) ? 'selected' : ''}`}>
                            <input
                                type="checkbox"
                                name="amenities"
                                value={amenity}
                                checked={isAmenitySelected(amenity)}
                                onChange={(e) => onAmenityChange({ name: e.target.value, type: 'outdoor', imgUrl: amenityImages[amenity] })}
                            />
                            <div className="option-content">
                                <img src={amenityImages[amenity]} alt={amenity} />
                                <p>{amenity}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </section>

            {/* Safety Items */}
            <section>
                <h3>Do you have any of these safety items?</h3>
                <div className="selection-grid">
                    {['Smoke alarm', 'First aid kit', 'Fire extinguisher', 'Carbon monoxide alarm'].map(amenity => (
                        <label key={amenity} className={`option-item ${isAmenitySelected(amenity) ? 'selected' : ''}`}>
                            <input
                                type="checkbox"
                                name="amenities"
                                value={amenity}
                                checked={isAmenitySelected(amenity)}
                                onChange={(e) => onAmenityChange({ name: e.target.value, type: 'safety', imgUrl: amenityImages[amenity] })}
                            />
                            <div className="option-content">
                                <img src={amenityImages[amenity]} alt={amenity} />
                                <p>{amenity}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </section>
        </div>
    )
}