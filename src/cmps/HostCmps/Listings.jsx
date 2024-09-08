import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loadStay } from "../../store/actions/stay.actions"


export function Listings({ currUser, stays }) {
    const [listings, setListings] = useState([])
    const navigate = useNavigate()

    // Function to fetch listings using the loadStay function
    const fetchListings = async (currUser) => {
        
        if (currUser && currUser.host && currUser.host.listings) {
            const listingsArr = []

            // Iterate over each listingId and fetch the stay details using loadStay
            for (let listingId of currUser.host.listings) {
                try {
                    const stay = await loadStay(listingId) // Fetch the stay using loadStay
                    if (stay.status === 'published') {
                        listingsArr.push(stay) // Add the fetched stay to the array if it is published
                    }
                } catch (err) {
                    console.log('Error fetching stay:', err)
                }
            }

            setListings(listingsArr) // Update state with all fetched listings
        }
    }

    useEffect(() => {
        fetchListings(currUser)
    }, [currUser]) // Only runs when currUser changes


    return (
        <section className="listings">
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
