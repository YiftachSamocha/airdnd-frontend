import { useState } from 'react';
import starIcon from '../../assets/imgs/icons/star.svg';
import { formatDateYearAndMonth } from '../../services/util.service';


export function ReviewPreview({ review }) {


    const firstName = review.by.fullname ? review.by.fullname.split(' ')[0] : ''
    const starsFromRate = []
    for (let i = 0; i < review.rate; i++) {
        starsFromRate.push(
            <img key={i} src={starIcon} alt="Star Icon" className="stars" />
        )
    }
    const stayed = review.daysStayed > 1 ? 'Stayed a few nights' : 'Stayed one night'
    const date = formatDateYearAndMonth(review.date)
    // console.log(firstName);


    return (
        <article className="review-preview">
            <div className='reviewer-profile'>
                <img src={review.by.imgUrl} alt={`${firstName}'s profile`} className="reviewer-image" />
                <div className="reviewer-info">
                    <h4>{firstName}</h4>
                    <h4>{review.by.address}</h4>
                </div> </div>
            <div className="review-details">
                <div className="stars-container">
                    {starsFromRate}
                </div>
              <span className='dot'>•</span> <span>{date}</span><span className='dot'>•</span>
                <span>{stayed}</span>
            </div>
            <p className='review-txt'>{review.txt}</p>
        </article>
    )
}
