import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchAdminServices } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      const result = await fetchAdminServices(token)
      if (result) {
        setServices(result)
      }
    }
    fetchServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Services</h1>
        <IconBtn
          text="Add Service"
          onclick={() => navigate("/dashboard/add-service")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {services && <CoursesTable services={services} setServices={setServices} />}
    </div>
  )
}