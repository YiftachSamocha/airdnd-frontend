import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loadStay } from "../../store/actions/stay.actions"


export function Listings({ listings }) {
    const navigate = useNavigate()

    return (
        <section className="listings">
            <button>Airdnd your home</button>
            <h2>Your Listings</h2>
            <div className="listings-main">
                {(!listings || listings.length === 0) ? (
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
                                    <p>{listing.price.night}$ night</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}
