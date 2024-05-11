import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCategoryDetails,
  editCategoryDetails,
  fetchCategories,
} from "../../../../../services/operations/categoryAPI"

import { setCategory, setStep } from "../../../../../slices/categorySlice"
import { CATEGORY_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import RequirementField from "./RequirementField"

export default function CategoryInfomation() {
  
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)
  const { category, editCategory } = useSelector((state) => state.category)
  const [loading, setLoading] = useState(false)
  //const [categories, setCategory] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCategories()
      if (categories.length > 0) {
        console.log("categories", categories)
        setCategory(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCategory) {
      console.log("data populated", editCategory)
      setValue("categoryTitle", category.categoryName)
      setValue("categoryShortDesc", category.categoryDescription)
      setValue("categoryRequirements", category.instructions)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    console.log("changes after editing form values:", currentValues)
    if (
      currentValues.categoryTitle !== category.categoryName ||
      currentValues.categoryShortDesc !== category.categoryDescription ||
      currentValues.categoryRequirements.toString() !==
      category.instructions.toString() 
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
     console.log(data)

    if (editCategory) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("categoryId", category._id)
        if (currentValues.categoryTitle !== category.categoryName) {
          formData.append("categoryName", data.categoryTitle)
        }
        if (currentValues.categoryShortDesc !== category.categoryDescription) {
          formData.append("categoryDescription", data.categoryShortDesc)
        }
        if (
          currentValues.categoryRequirements.toString() !==
          category.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.categoryRequirements)
          )
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editCategoryDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCategory(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("categoryName", data.categoryTitle)
    formData.append("categoryDescription", data.categoryShortDesc)
    formData.append("status", CATEGORY_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.categoryRequirements))
    setLoading(true)

    //console.log("formdata",formData);

    const result = await addCategoryDetails(formData, token)
    console.log("result create category",result);
    if (result) {
      dispatch(setStep(2))
      dispatch(setCategory(result))
    }
    setLoading(false)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="categoryTitle">
          Category Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="categoryTitle"
          placeholder="Enter Category Title"
          {...register("categoryTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.categoryTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Category title is required
          </span>
        )}
      </div>
      {/* Service Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="categoryShortDesc">
          Category Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="categoryShortDesc"
          placeholder="Enter Description"
          {...register("categoryShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.categoryShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Category Description is required
          </span>
        )}
      </div>
     
     
    
      {/* Course Thumbnail Image */}
      {/* <Upload
        name="serviceImage"
        label="Service Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editService ? service?.thumbnail : null}
      /> */}
     
      {/* Requirements/Instructions */}
      <RequirementField
        name="categoryRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCategory && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCategory ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
