import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchAdminServices } from '../../../../services/operations/courseDetailsAPI';
import { getAdminData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=>state.profile);
    const [loading, setLoading] = useState(false);
    const [AdminData, setAdminData] = useState(null);
    const [services, setServices] = useState([]);
    console.log("services admin ",services);
    useEffect(()=> {
        const getServiceDataWithStats = async() => {
            console.log("admin data",AdminData);
            setLoading(true);
            
            const adminApiData = await getAdminData(token);
            const result = await fetchAdminServices(token);

            console.log("admin api data",adminApiData);
            console.log("result fetchadmin services",result);

            if(adminApiData)
                setAdminData(adminApiData);

            if(result) {
                setServices(result);
            }
            setLoading(false);
        }
        getServiceDataWithStats();
    },[])

    const totalAmount = AdminData?.reduce((acc,curr)=> acc + curr.totalAmountGenerated, 0);
    const totalCustomers = AdminData?.reduce((acc,curr)=>acc + curr.totalCustomersEnrolled, 0);

  return (
    <div className='text-white'>
      <div >
        <h1 className='font-bold text-2xl'>Hi {user?.firstName}</h1>
        <p>Let's start something new</p>
      </div>

      {loading ? (<div className='spinner'></div>)
      :services.length > 0 
        ? (<div>
            <div>
            <div className='flex mt-10 justify-between gap-5 h-[30%] '>
                <InstructorChart className="h-[30%]" services={AdminData}/>
                <div className='bg-richblack-500 p-4 w-3/12 flex flex-col gap-5'>
                    <p className='font-bold'>Statistics</p>
                    <div>
                        <p>Total Services</p>
                        <p className='font-bold'>{services.length}</p>
                    </div>

                    <div>
                        <p>Total Customers</p>
                        <p className='font-bold'>{totalCustomers}</p>
                    </div>

                    <div>
                        <p>Total Income</p>
                        <p className='font-bold'>{totalAmount}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='h-[50%] mt-9 bg-richblack-500 p-5'>
            {/* Render 3 courses */}
            <div className='flex justify-between mb-5'>
                <p className='font-bold'>Your Services</p>
                <Link className=' hover:text-yellow-50' to="/dashboard/my-services" >
                    <p>View all</p>
                </Link>
            </div>
            <div className='flex gap-5'>
                {
                    services.slice(0,3).map((service)=> (
                        <div>
                            <img className='w-[500px] h-[200px]'
                                src={service.thumbnail}
                            />
                            <div>
                                <p className='font-bold'>{service.serviceName}</p>
                                <div className='flex gap-5'>
                                    <p>{service.customerEnrolled.length} Customers</p>
                                    <p> | </p>
                                    <p> Rs {service.price}</p>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
        
        )
        :(<div>
            <p>You have not created any services yet</p>
            <Link to={"/dashboard/addService"}>
                Create a Service
            </Link>
        </div>)}
    </div>
  )
}

export default Instructor
