import securityIcon from '../../assets/imgs/icons/security.svg'
import starIcon from '../../assets/imgs/icons/star.svg'
import securityAlert from '../../assets/imgs/icons/security-alert.svg'

export function StayHost({ stay }) {
    return (
        <section className="host-details">
            <h3>Meet your Host</h3>
            <div className="host">
                <div className="host-stats">
                    <div className="personal">
                        <div className="host-img-container">
                            <img src={stay.host.imgUrl} className="host-img" />
                            <div className="icon-container">
                                <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" style={{ stopColor: "#e00b41", stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: "#c21c54", stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="50" cy="50" r="35" fill="url(#redGradient)" />
                                </svg>
                                <img src={securityIcon} className="security-icon" />
                            </div>
                        </div>
                        <div className='host-name'>
                            <h2>{stay.host.fullname}</h2>
                            <span>Host</span>
                        </div>

                    </div>
                    <div className="stats">
                        <div className="reviews">
                            <span>{stay.host.reviews}</span>
                            <span>Reviews</span>
                        </div>
                        <hr className="details-seperation-line"></hr>

                        <div className="rating">
                            <div>
                                <span>{stay.host.rating}</span>
                                <img src={starIcon} />
                            </div>
                            <span>Rating</span>
                        </div>
                        <hr className="details-seperation-line"></hr>

                        <div className="hosting-time">
                            <span>{stay.host.yearsHosting}</span>
                            <span>Years Hosting</span>
                        </div>
                    </div>
                </div>

                <div className="details">
                    <h4>Host Details</h4>
                    <div>
                        <p>Response Rate: {stay.host.responseRate}%</p>
                        <p>Responds within a few hours</p>
                    </div>
                    <div className='alert'>
                        <img src={securityAlert} />
                        <p className="note">To protect your payment, never transfer money or communicate outside of the Airdnd website or app.</p>

                    </div>
                </div>
            </div>
        </section>
    );
}