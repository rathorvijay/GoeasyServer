
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  fetchCategoryDetails,
  getFullDetailsOfCategoy,
} from "../../../../services/operations/categoryAPI"

import { setCategory, setEditCategory } from "../../../../slices/categorySlice"
import RenderStepCategory from "../AddCategory/RenderStepCategory"

export default function EditCategory() {
  const dispatch = useDispatch()
  const { categoryId } = useParams()
  const { category } = useSelector((state) => state.category)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await getFullDetailsOfCategoy(categoryId, token)
      if (result?.categoryDetails) {
        dispatch(setEditCategory(true))
        dispatch(setCategory(result?.categoryDetails))
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
        Edit Category
      </h1>
      <div className="mx-auto max-w-[600px]">
        {category ? (
          <RenderStepCategory />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Category not found
          </p>
        )}
      </div>
    </div>
  )
}