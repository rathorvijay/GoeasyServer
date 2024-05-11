import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({service, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(service.ratingAndReviews);
        setAvgReviewCount(count);
    },[service])


    
  return (
    <>
      <Link to={`/services/${service._id}`}>
        <div className="">
          <div className="rounded-lg">
            <img
              src={service?.thumbnail}
              alt="service thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{service?.serviceName}</p>
            <p className="text-sm text-richblack-50">
              {service?.Admin?.firstName} {service?.Admin?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {service?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs. {service?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card
