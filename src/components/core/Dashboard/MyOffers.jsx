import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchAdminOffer } from "../../../services/operations/offerAPI"
import IconBtn from "../../common/IconBtn"
import OfferTable from "./InstructorCourses/OfferTable"

export default function MyOffer() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])

  useEffect(() => {
    console.log("myoffers");
    const fetchOffers = async () => {
      const result = await fetchAdminOffer(token)
      console.log("admin offer",result);
      if (result) {
        setOffers(result)
        console.log("setoffer",offers);
      }
    }
    fetchOffers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Offers</h1>
        <IconBtn
          text="Add Offer"
          onclick={() => navigate("/dashboard/add-offer")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {offers && <OfferTable offers={offers} setOffers={setOffers} />}
    </div>
  )
}