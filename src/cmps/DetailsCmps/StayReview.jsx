import { useSelector } from "react-redux";
import { loadUsers } from "../../store/actions/user.actions";
import { useEffect } from "react";
import starIcon from '../../assets/imgs/icons/star.svg';
import cleanliness from '../../assets/imgs/rating/cleanliness.svg';
import value from '../../assets/imgs/rating/value.svg';
import location from '../../assets/imgs/rating/location.svg';
import accuracy from '../../assets/imgs/rating/accuracy.svg';
import checkIn from '../../assets/imgs/rating/checkIn.svg';
import communication from '../../assets/imgs/rating/communication.svg';
import { ReviewPreview } from './ReviewPreview.jsx'
import { calculateCategoryAverages } from "../../services/util.service.js";

export function StayReview({ stay }) {
    const totalReviews = stay.reviews ? stay.reviews.length : 0
    const avgRating = totalReviews > 0
        ? stay.reviews.reduce((sum, review) => sum + review.rate, 0) / totalReviews
        : 0

    const reviewsToShow = stay.reviews.slice(0, 6)
    const categories = {
        cleanliness,
        accuracy,
        checkIn,
        communication,
        location,
        value,
    }
    const averages = calculateCategoryAverages(stay.reviews)
    console.log(averages);

    // const averages = {
    //     cleanliness: 4.6,
    //     accuracy: 4.4,
    //     checkIn: 4.4,
    //     communication: 4.7,
    //     location: 4.5,
    //     value: 4.5
    // };

    const total = Object.values(averages).reduce((acc, average) => acc + average, 0);
    const averageRating = total / Object.values(averages).length;
    const maxRating = 5


    console.log(total, averageRating);

    const percentage = (averageRating / maxRating) * 100;
    console.log(percentage);

    return (
        <section className="reviews-stay">
            <div className="rating">
                <img src={starIcon} alt="Star Icon" className="star-icon" />
                <span>{avgRating.toFixed(1)}</span><span className="dot-big">•</span>
                <span className="reviews-number">{totalReviews} reviews</span>
            </div>
            <div className="reviews-rating">
                <div className="overall-rating">
                    <h3>Overall rating</h3>
                    {[...Array(5)].map((_, index) => {
                        const isFull = index < Math.floor(averageRating);
                        const isPartial = index === Math.floor(averageRating);
                        const width = isFull ? 100 : (isPartial ? (averageRating % 1) * 100 : 0);

                        return (
                            <div className="rating-bar-container" key={index}>
                                <span className="rating-number">{5 - index}</span>
                                <div className="rating-bar">
                                    <span style={{ width: `${width}%` }}></span>
                                    {/* <span style={{ width: `${index < Math.floor(averageRating) ? 100 : (percentage % 100)}%` }}></span> */}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="rating-categories">
                    {/* <ul> */}
                    {Object.entries(categories).map(([category, rating]) => (
                        <div key={category} className={`rating-category ${category}`}>
                            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                            <h4>{averages[category]}</h4>
                            <img
                                src={categories[category]}
                                alt={`${category} icon`}
                                className={`icon ${category}`}
                            />
                        </div>
                    ))}
                    {/* </ul> */}
                </div>
            </div>
            <section>
                <ul className="reviews-list">
                    {reviewsToShow.map(review => {
                        return (
                            <li key={review._id}>
                                <ReviewPreview review={review} />
                            </li>
                        )
                    })}
                </ul>
            </section>
        </section>
    )
}




