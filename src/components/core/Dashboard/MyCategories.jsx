import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchAdminCategories } from "../../../services/operations/categoryAPI"
import IconBtn from "../../common/IconBtn"
import CategoriesTable from "./InstructorCourses/CategoriesTable"

export default function MyCategories() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await fetchAdminCategories(token)
      if (result) {
        setCategories(result)
      }
    }
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Categories</h1>
        <IconBtn
          text="Add Category"
          onclick={() => navigate("/dashboard/add-category")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {categories && <CategoriesTable categories={categories} setCategories={setCategories} />}
    </div>
  )
}