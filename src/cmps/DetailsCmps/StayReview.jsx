import { useSelector } from "react-redux";
import { loadUsers } from "../../store/actions/user.actions";
import { useEffect } from "react";
import starIcon from '../../assets/imgs/icons/star.svg';
import { ReviewPreview } from './ReviewPreview.jsx'



export function StayReview({ stay }) {
    const totalReviews = stay.reviews ? stay.reviews.length : 0
    const avgRating = totalReviews > 0
        ? stay.reviews.reduce((sum, review) => sum + review.rate, 0) / totalReviews
        : 0
    console.log(stay.reviews);

    const reviewsToShow = stay.reviews.slice(0, 6);
    if (!stay.reviews) return <div>Loading...</div>


    // console.log(stay.reviews.by._id);
    return (
        <section className="reviews-stay">
            <div className="rating">
                <img src={starIcon} alt="Star Icon" className="star-icon" />
                <span>{avgRating.toFixed(1)}</span><span className="dot-big">•</span>
                <span className="reviews-number">{totalReviews} reviews</span>
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




