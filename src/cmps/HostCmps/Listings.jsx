import { useNavigate } from "react-router-dom";
import { loadStay } from "../../store/actions/stay.actions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function Listings({ orders }) {
    const navigate = useNavigate()
    const [listings, setListings] = useState([])

    useEffect(() => {
        if (orders && orders.length > 0) {
            getStays(orders)
                .then(newListings => setListings(newListings))
        }
    }, [orders])

    async function getStays(relevantOrders) {
        let stays = []
        for (var i = 0; i < relevantOrders.length; i++) {
            const stay = await loadStay(relevantOrders[i].stay._id)
            stays.push(stay)
        }
        return stays
    }

    return (
        <section className="listings">
            <h2>Your Listings</h2>
            <div className="listings-main">
                {listings.length === 0 ? (
                    <div>No listings yet</div>
                ) : (
                    <>
                        {listings.map(listing => (
                            <div key={listing._id}
                                onClick={() => navigate('/stay/' + listing._id)} className="listing-item">
                                <img src={listing.imgs[0]} alt="" />
                                <div>
                                    <p>{listing.name}</p>
                                    <p>{listing.location.country}, {listing.location.city}</p>
                                    <p>{listing.sleep.maxCapacity} guests</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}
