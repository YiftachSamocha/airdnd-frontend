import logoBlack from '../../assets/imgs/icons/logo-black.svg'

import { useNavigate, useParams } from "react-router";
import { UploadImgs } from '../../cmps/HostCmps/UploadImgs';
import { ListingLocation } from '../../cmps/HostCmps/ListingLocation';
import { useEffect, useState } from 'react';
import { ListingType } from '../../cmps/HostCmps/ListingType';
import { ListingRooms } from '../../cmps/HostCmps/ListingRooms';

export function AboutYourPlace() {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [formData, setFormData] = useState({
        location: { country: '', city: '', lat: '', lng: '' },
        images: [],
        type: '',
        sleep: {
            bedrooms: 1,
            bathrooms: 1,
            beds: 1,
            maxCapacity: 2,
        },
    })


    function handleNext() {
        navigate(`/become-a-host/${userId}/about-your-place`); // Correct navigation
    }

    function handleInputChange(key, value, subKey = null) {
        if (subKey) {
            setFormData({
                ...formData,
                [key]: {
                    ...formData[key],
                    [subKey]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [key]: value,
            });
        }
    }


    function handleImagesChange(images) {
        setFormData(prevData => ({
            ...prevData,
            images
        }));
    }


    return <section className="add-listing about">
        <header>
            <img src={logoBlack}></img>
            <button>Save & Exit</button>
        </header>
        <form onSubmit={handleNext}>
            <div className='main'>
                <span>Step 2</span>
                <ListingType
                    type={formData.type}
                    onPlaceTypeChange={(value) => handleInputChange('type', value)}
                />
                <ListingLocation
                    location={formData.location}
                    onLocationChange={(value) => handleInputChange('location', value)}
                />
                <ListingRooms
                    formData={formData.sleep}
                    onRoomsChange={(key, value) => handleInputChange('sleep', value, key)}
                />
                <UploadImgs
                    images={formData.images}
                    onImagesChange={handleImagesChange}
                />
            </div>
        </form>

        <footer>
            <button className='btn-link'>Back</button>
            <button className='black' type='submit'>Next</button>
        </footer>

    </section>
}