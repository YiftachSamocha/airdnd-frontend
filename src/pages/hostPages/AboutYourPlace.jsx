import logoBlack from '../../assets/imgs/icons/logo-black.svg'

import { useNavigate, useParams } from "react-router";
import { UploadImgs } from '../../cmps/HostCmps/UploadImgs';
import { ListingLocation } from '../../cmps/HostCmps/ListingLocation';
import { useEffect, useState } from 'react';
import { ListingType } from '../../cmps/HostCmps/ListingType';
import { ListingRooms } from '../../cmps/HostCmps/ListingRooms';

import icon from '../../assets/imgs/icons/language.svg'
import { ListingAmenities } from '../../cmps/HostCmps/ListingAmenities';
import { ListingDescription } from '../../cmps/HostCmps/ListingDescription';
import { ListingTitle } from '../../cmps/HostCmps/ListingTitle';
import { ListingPrice } from '../../cmps/HostCmps/ListingPrice';

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
        amenities: [],
        name: '',
        description: '',
        price: {
            night: 128, 
            cleaning: 5, 
        },
    })

    useEffect(() => {
        console.log('changes', formData)
    }, [formData])


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
            setFormData((prevData) => ({
                ...prevData,
                [key]: value,
            }));
        }
    }


    function handleImagesChange(images) {
        setFormData(prevData => ({
            ...prevData,
            images
        }));
    }

    function handleAmenityChange(amenity) {
        setFormData((prevData) => {
            const existingAmenity = prevData.amenities.find(a => a.name === amenity.name);
            let updatedAmenities;

            if (existingAmenity) {
                // If already selected, remove it (toggle behavior)
                updatedAmenities = prevData.amenities.filter(a => a.name !== amenity.name);
            } else {
                // If not selected, add the new amenity
                updatedAmenities = [...prevData.amenities, amenity];
            }

            return { ...prevData, amenities: updatedAmenities };
        })
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
                <ListingAmenities
                    amenities={formData.amenities} // Pass the current amenities object
                    onAmenityChange={handleAmenityChange} // Handle change
                />
                <ListingTitle
                    name={formData.name}
                    onNameChange={(value) => handleInputChange('name', value)}
                />
                <ListingDescription
                    description={formData.description}
                    onDescriptionChange={(value) => handleInputChange('description', value)}
                />
                 <ListingPrice
                        price={formData.price}
                        onPriceChange={(value) => handleInputChange('price', value, key)} // Use handleInputChange for price
                    />
            </div>
        </form>

        <footer>
            <button className='btn-link'>Back</button>
            <button className='black' type='submit'>Next</button>
        </footer>

    </section>
}