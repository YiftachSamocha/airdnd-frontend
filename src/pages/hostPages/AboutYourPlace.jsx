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
import { generateHighlights, getRandomItems, getRandomRoomData } from '../../services/util.service';
import { cancellationPolicy, highlights, houseRules, labels, safetyProperty } from '../../services/data/stay.data';
import { loadStay, publishStay, updateStay } from '../../store/actions/stay.actions';

export function AboutYourPlace() {
    const navigate = useNavigate()
    const { userId } = useParams()
    const { stayId } = useParams()
    const [formData, setFormData] = useState({

        location: { country: '', city: '', lat: '', lng: '' },
        imgs: [],
        type: '',
        sleep: {
            bedrooms: 1,
            bathrooms: 1,
            beds: 1,
            maxCapacity: 2,
            rooms: []
        },
        amenities: [],
        name: '',
        description: `You'll always remember your time at this unique place to stay.`,
        price: {
            night: 128,
            cleaning: 5,
        },
    })

    useEffect(() => {
        console.log('changes', formData)
    }, [formData])

    useEffect(() => {
        if (stayId) {
            loadStay(stayId).then(loadedStay => {
                setFormData(loadedStay);  // Populate the form with the loaded stay data
            }).catch(err => {
                console.error('Error loading stay:', err);
            });
        }
    }, [stayId])

    function handleNext(event) {
        event.preventDefault()
        // Generate rooms based on the number of bedrooms
        const rooms = Array.from({ length: formData.sleep.bedrooms }, () => getRandomRoomData());

        // Update formData with the generated highlights and status
        const updatedStay = {
            ...formData,
            sleep: {
                ...formData.sleep,
                rooms  // Add the generated rooms to the sleep data
            },
            status: 'published',
            imgs: formData.secureUrls,
            labels: getRandomItems(labels, 3),
            thingsToKnow: {
                houseRules: getRandomItems(houseRules, 3),
                safetyProperty: getRandomItems(safetyProperty, 3),
                cancellationPolicy: getRandomItems(cancellationPolicy, 1)
            },
            highlights: getRandomItems(highlights, 3)
        }
        debugger

        // Publish the stay by calling publishStay
        updateStay(updatedStay)
            .then(savedStay => {
                console.log('Stay successfully published:', savedStay);
                // Navigate to the next page after publishing
                navigate(`/`);
            })
            .catch(err => {
                console.error('Failed to publish stay:', err);
            });
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


    function handleImgsChange(imgs) {
        // Store the full image objects for rendering and also keep secure_urls separately for submission
        const secureUrls = imgs.map(img => img.secure_url);  // Extract only the secure_url

        // Update formData with both the full image objects for rendering and secure_urls for submission
        setFormData(prevData => ({
            ...prevData,
            imgs: imgs, // Store full image objects for rendering
            secureUrls  // Store secure_url for submission later when needed
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
                    imgs={formData.imgs}
                    onImgsChange={handleImgsChange}
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
                    onPriceChange={(value, subKey) => handleInputChange('price', value, subKey)} // Use handleInputChange for price
                />
            </div>
        </form>

        <footer>
            <button className='btn-link'>Back</button>
            <button className='black' onClick={handleNext} type='submit'>Next</button>
        </footer>

    </section>
}