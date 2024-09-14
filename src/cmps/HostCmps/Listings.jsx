import { useNavigate } from "react-router-dom"
import houseIcon from '../../assets/imgs/icons/house.jpeg'

export function Listings({ listings }) {

    console.log('listings')
    const navigate = useNavigate()
    const drafts = listings.filter(listing => listing.status === 'draft')
    const published = listings.filter(listing => listing.status === 'published')

    return (
        <section className="listings">
            <div className="add-btn-cont">
                <button onClick={() => navigate(`/become-a-host`)} className="add-stay-btn">Airdnd your home</button>
            </div>
            <h2>Your Listings</h2>
            <div className="listings-main">
                {(!listings || listings.length === 0) ? (
                    <div>No listings yet</div>
                ) : (
                    <>
                        {published.map(listing => (
                            <div key={listing._id}
                                onClick={() => navigate('/stay/' + listing._id)} className="listing-item">
                                {listing.imgs ?
                                    (<img src={listing.imgs[0]} alt="" />) :
                                    (<img src={houseIcon} />)
                                }
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
            {drafts.length && <div>
                <h5>Drafts:</h5>
                <div className="listings-main">
                    {drafts.map(listing => (
                        <div key={listing._id}
                            onClick={() => navigate('/stay/' + listing._id)} className="listing-item">
                            {listing.imgs && listing.imgs.length > 0 ?
                                (<img src={listing.imgs[0]} alt="" />) :
                                (<img src={houseIcon} />)
                            }                                            <div>
                                <p>{listing.name}</p>
                                <p>{listing.location.country} {listing.location.country && <span>,</span>} {listing.location.city}</p>
                                <p>{listing.sleep.maxCapacity} guests</p>
                                <p>{listing.price.night}$ night</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </section>
    )
}
