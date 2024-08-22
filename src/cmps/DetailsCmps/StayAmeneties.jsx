import { ShowMoreCmp } from "../ShowMoreCmp.jsx";

export function StayAmeneties({ stay }) {
    return <section className="amenities">
        <h3>What this place offers</h3>
        <ShowMoreCmp content={stay.amenities} limit={10} type="amenities" />
    </section>

    // <ShowMore
    //     content={stay.amenities}
    //     limit={10}
    //     type="amenities"
    // />

}