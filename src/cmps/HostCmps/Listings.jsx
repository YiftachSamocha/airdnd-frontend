import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export function Listings({ listings }) {
    const navigate = useNavigate()
    const drafts = listings.filter(listing => listing.status === 'draft')
    const published = listings.filter(listing => listing.status === 'published')
    const currUser = useSelector(state => state.userModule.currUser)

    return (
        <section className="listings">
            <button onClick={() => navigate(`/become-a-host`)}>Airdnd your home</button>
            <h2>Your Listings</h2>
            <div className="listings-main">
                {(!listings || listings.length === 0) ? (
                    <div>No listings yet</div>
                ) : (
                    <>
                        {published.map(listing => (
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
                        {drafts.length && <div>
                            <h5>Drafts:</h5>
                            {drafts.map(listing => (
                                <div key={listing._id}
                                    onClick={() => navigate(`/become-a-host/${currUser._id}/about-your-place/${listing._id}`)}
                                    className="listing-item">
                                    <img src={listing.imgs[0]} alt="" />
                                    <div>
                                        <p>{listing.name}</p>
                                        <p>{listing.location.country}, {listing.location.city}</p>
                                        <p>{listing.sleep.maxCapacity} guests</p>
                                        <p>{listing.price.night}$ night</p>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </>

                )}
            </div>
        </section>
    )
}
