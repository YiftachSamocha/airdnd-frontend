import logoBlack from '../../assets/imgs/icons/logo-black.svg'

import { useNavigate, useParams } from "react-router";
import { UploadImgs } from '../../cmps/HostCmps/UploadImgs';
import { ListingLocation } from '../../cmps/HostCmps/ListingLocation';
import { useEffect, useState } from 'react';
import { ListingType } from '../../cmps/HostCmps/ListingType';
import { ListingRooms } from '../../cmps/HostCmps/ListingRooms';

import { ListingAmenities } from '../../cmps/HostCmps/ListingAmenities';
import { ListingDescription } from '../../cmps/HostCmps/ListingDescription';
import { ListingTitle } from '../../cmps/HostCmps/ListingTitle';
import { ListingPrice } from '../../cmps/HostCmps/ListingPrice';
import { getRandomItems, getRandomRoomData } from '../../services/util.service';
import { cancellationPolicy, highlights, houseRules, labels, safetyProperty } from '../../services/data/stay.data';
import { loadStay, updateStay } from '../../store/actions/stay.actions';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function AboutYourPlace() {
    const navigate = useNavigate()
    const { stayId, userId, } = useParams()
    const users = useSelector(state => state.userModule.users)
    const [userExists, setUserExists] = useState(true); // Track whether the user exists

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

    const [validationStatus, setValidationStatus] = useState({
        type: false,
        location: false,
        sleep: true,
        imgs: false,
        amenities: false,
        name: false,
        description: true,
        price: true
    })


    useEffect(() => {
        // Check if the user exists in your store
        console.log(userId)
        const user = users.find(user => user._id === userId);
        if (!user) {
            setUserExists(false); // User does not exist, so we show the error
        }
    }, [userId, users])

    useEffect(() => {
        console.log('validation status', validationStatus)
    }, [validationStatus])

    const [isFormComplete, setIsFormComplete] = useState(false)

    useEffect(() => {
        setIsFormComplete(Object.values(validationStatus).every(status => status === true))
    }, [validationStatus])


    const handleValidationUpdate = (field, isValid) => {
        setValidationStatus(prevStatus => ({
            ...prevStatus,
            [field]: isValid
        }));
    };


    useEffect(() => {
        console.log('changes', formData)
    }, [formData])

    useEffect(() => {
        if (stayId) {
            loadStay(stayId).then(loadedStay => {
                console.log('load stay', loadedStay)
                setFormData(loadedStay);  // Populate the form with the loaded stay data
            }).catch(err => {
                console.error('Error loading stay:', err);
            });
        }
    }, [stayId])

    function handleBtn(event, btnType) {
        event.preventDefault()

        const rooms = Array.from({ length: formData.sleep.bedrooms }, () => getRandomRoomData());
        const status = btnType === 'next' ? 'published' : 'draft'
        formData.price.night = Number(formData.price.night)

        const updatedStay = {
            ...formData,
            sleep: {
                ...formData.sleep,
                rooms
            },
            status,
            imgs: formData.imgs,
            status,
            labels: formData.labels.length ? formData.labels : getRandomItems(labels, 3),  // Keep existing labels unless empty
            thingsToKnow: {
                houseRules: formData.thingsToKnow.houseRules.length ? formData.thingsToKnow.houseRules : getRandomItems(houseRules, 3),
                safetyProperty: formData.thingsToKnow.houseRules.length ? formData.thingsToKnow.houseRules : getRandomItems(safetyProperty, 3),
                cancellationPolicy: formData.thingsToKnow.houseRules.length ? formData.thingsToKnow.houseRules : getRandomItems(cancellationPolicy, 1)
            },
            highlights: formData.highlights.length ? formData.highlights : getRandomItems(highlights, 3)
        }
        updateStay(updatedStay)
            .then(() => {
                navigate('/host', { replace: true });
            })
            .catch(err => {
                console.error('Failed to publish stay:', err);
            })
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
        setFormData(prevData => ({
            ...prevData,
            imgs, // Store full image objects for rendering
        }));
    }

    function handleAmenityChange(amenity) {
        setFormData((prevData) => {
            const existingAmenity = prevData.amenities.find(a => a.name === amenity.name);
            let updatedAmenities;

            if (existingAmenity) {
                updatedAmenities = prevData.amenities.filter(a => a.name !== amenity.name);
            } else {
                updatedAmenities = [...prevData.amenities, amenity];
            }
            return { ...prevData, amenities: updatedAmenities };
        })
    }

    // if (!userExists) {
    //     return <div className='page-error'>Oops, something went wrong.
    //         <Link to="/">Please try again.</Link>
    //     </div>
    // }


    return <section className="add-listing about">
        <header>
            <img src={logoBlack} onClick={() => navigate('/')}></img>
            <button className="white" onClick={(ev) => handleBtn(ev, 'save')}>Save & Exit</button>
        </header>
        <form >
            <div className='main'>
                <span>Step 2</span>
                <ListingType
                    type={formData.type}
                    onPlaceTypeChange={(value) => handleInputChange('type', value)}
                    onValidate={(isValid) => handleValidationUpdate('type', isValid)}  // Pass validation callback
                />
                <ListingLocation
                    location={formData.location}
                    onLocationChange={(value) => handleInputChange('location', value)}
                    onValidate={(isValid) => handleValidationUpdate('location', isValid)}  // Pass validation callback

                />
                <ListingRooms
                    formData={formData.sleep}
                    onRoomsChange={(key, value) => handleInputChange('sleep', value, key)}
                    onValidate={(isValid) => handleValidationUpdate('sleep', isValid)}  // Pass validation callback

                />
                <UploadImgs
                    imgs={formData.imgs}
                    onImgsChange={handleImgsChange}
                    onValidate={(isValid) => handleValidationUpdate('imgs', isValid)}  // Pass validation callback

                />
                <ListingAmenities
                    amenities={formData.amenities} // Pass the current amenities object
                    onAmenityChange={handleAmenityChange} // Handle change
                    onValidate={(isValid) => handleValidationUpdate('amenities', isValid)}  // Pass validation callback

                />
                <ListingTitle
                    name={formData.name}
                    onNameChange={(value) => handleInputChange('name', value)}
                    onValidate={(isValid) => handleValidationUpdate('name', isValid)}  // Pass validation callback

                />
                <ListingDescription
                    description={formData.description}
                    onDescriptionChange={(value) => handleInputChange('description', value)}
                    onValidate={(isValid) => handleValidationUpdate('description', isValid)}  // Pass validation callback

                />
                <ListingPrice
                    price={formData.price}
                    onPriceChange={(value, subKey) => handleInputChange('price', value, subKey)} // Use handleInputChange for price
                    onValidate={(isValid) => handleValidationUpdate('price', isValid)}  // Pass validation callback

                />
            </div>
        </form>

        <footer>
            <button className='btn-link' onClick={() => navigate('/')}>Back</button>
            <button
                className={isFormComplete ? 'black' : 'disabled'}
                type='submit'
                onClick={(ev) => handleBtn(ev, 'next')}>Next</button>
        </footer>

    </section>
}