import { useState } from "react";
import { ShowMoreCmp } from "../ShowMoreCmp.jsx";

export function StayAmenities({ stay }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    function toggleModal() {
        setIsModalOpen(prevState => !prevState)
    }

    return <section className={`amenities ${isModalOpen ? 'modal-open' : 'modal-closed'}`}>
        <h3>What this place offers</h3>
        <ShowMoreCmp
            content={stay.amenities}
            limit={10}
            type="amenities"
            stay={stay}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
        />
    </section>
}