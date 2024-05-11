import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  fetchServiceDetails,
  getFullDetailsOfService,
} from "../../../../services/operations/courseDetailsAPI"
import { setService, setEditService } from "../../../../slices/serviceSlice"
import RenderSteps from "../AddCourse/RenderSteps"

export default function EditCourse() {
  const dispatch = useDispatch()
  const { serviceId } = useParams()
  const { service } = useSelector((state) => state.service)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await getFullDetailsOfService(serviceId, token)
      if (result?.serviceDetails) {
        dispatch(setEditService(true))
        dispatch(setService(result?.serviceDetails))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Service
      </h1>
      <div className="mx-auto max-w-[600px]">
        {service ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Service not found
          </p>
        )}
      </div>
    </div>
  )
}