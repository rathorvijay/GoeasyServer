import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfService } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewServiceSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const {serviceId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
              const serviceData = await getFullDetailsOfService(serviceId, token);
              dispatch(setCourseSectionData(serviceData.serviceDetails.serviceContent));
              dispatch(setEntireCourseData(serviceData.serviceDetails));
              dispatch(setCompletedLectures(serviceData.completedVideos));
              let lectures = 0;
              console.log("serviceData",serviceData);
              serviceData?.serviceDetails?.serviceContent?.forEach((sec) => {
                lectures += sec.subSection.length
              })  
              dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[]);


  return (
    <>
        <div className='flex w-full gap-2 mt-2'>
            <VideoDetailsSidebar  setReviewModal={setReviewModal} />
            <div className='w-[70%] text-white mx-auto'>
                <Outlet />
            </div>
            {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
        </div>
        
    </>
  )
}

export default ViewCourse
