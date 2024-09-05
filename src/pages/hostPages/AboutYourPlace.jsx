import logoBlack from '../../assets/imgs/icons/logo-black.svg'

import { useNavigate, useParams } from "react-router";
import { UploadImgs } from '../../cmps/HostCmps/UploadImgs';
import { ListingLocation } from '../../cmps/HostCmps/ListingLocation';
import { useState } from 'react';

export function AboutYourPlace() {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [formData, setFormData] = useState({
        location: '',
        images: []
    })

    function handleNext() {
        navigate(`/become-a-host/${userId}/about-your-place`); // Correct navigation
    }

    function handleInputChange(key, value) {
        setFormData({
            ...formData,
            [key]: value
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
                <ListingLocation
                    location={formData.location}
                    onLocationChange={(value) => handleInputChange('location', value)} />
                <UploadImgs
                    images={formData.images}
                    onImagesChange={(value) => handleInputChange('images', value)}
                />
            </div>
        </form>

        <footer>
            <button className='btn-link'>Back</button>
            <button className='black' type='submit'>Next</button>
        </footer>

    </section>
}