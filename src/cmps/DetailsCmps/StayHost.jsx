import securityIcon from '../../assets/imgs/icons/security.svg'
import starIcon from '../../assets/imgs/icons/star.svg'

export function StayHost({stay}){
    console.log('stay host stay', stay)
    
    return <section className="host-details">
        {/* <h3>Meet your Host</h3>
        <div className="host-stats">
            <div className="personal">
                <img src={stay.host.imgUrl}/>
                <img src={securityIcon}/>
                <h2>{stay.host.fullname}</h2>
                <span>Host</span>
            </div>
            <div className="nums">
                <div className="reviews">
                    <span>{stay.host.reviews.length}</span>
                    <span>Reviews</span>
                </div>

                <div className="rating">
                    <div>
                    <span>{stay.host.rating}</span>
                    <img src={starIcon}/>
                    </div>
                    <span>Rating</span>
                </div>

                <div className="hosting-time">
                    <span>{stay.host.yearsHosting}</span>
                    <span>Years Hosting</span>
                </div>

                

            </div>
        </div> */}
    </section>
}