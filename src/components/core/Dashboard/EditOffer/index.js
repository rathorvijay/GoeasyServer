
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  fetchOfferDetails,
  getFullDetailsOfOffer,
} from "../../../../services/operations/offerAPI"

import { setOffer, setEditOffer } from "../../../../slices/offerSlice"
import RenderStepOffer from "../AddOffer/RenderStepOffer"

export default function EditOffer() {
  const dispatch = useDispatch()
  const { offerId } = useParams()
  const { offer } = useSelector((state) => state.offer)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await getFullDetailsOfOffer(offerId, token);
      console.log("result",result);
      if (result?.offerDetails) {
        dispatch(setEditOffer(true))
        dispatch(setOffer(result?.offerDetails))
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
        Edit Offer
      </h1>
      <div className="mx-auto max-w-[600px]">
        {offer ? (
          <RenderStepOffer />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Offer not found
          </p>
        )}
      </div>
    </div>
  )
}