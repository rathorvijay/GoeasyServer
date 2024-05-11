import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addOfferDetails,
  editOfferDetails,
  fetchOfferCategories,
} from "../../../../../services/operations/offerAPI"

import {
  fetchServiceCategories
} from "../../../../../services/operations/courseDetailsAPI"

import { setOffer, setStep } from "../../../../../slices/offerSlice"
import { OFFER_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../../AddCourse/Upload"
import RequirementsField from "./RequirementField"

export default function OfferInformationForm() {
  
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)
  const { offer, editOffer } = useSelector((state) => state.service)
  const [loading, setLoading] = useState(false)
  const [offerCategories, setOfferCategories] = useState([])

  useEffect(() => {
    const getOffers = async () => {
      setLoading(true)
      const offers = await fetchServiceCategories()
      if (offers.length > 0) {
        console.log("offers", offers)
        setOfferCategories(offers)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editOffer) {
      console.log("data populated", editOffer)
      setValue("offerTitle", offer.offerName)
      setValue("offerShortDesc", offer.offerDescription)
      setValue("offerDiscount", offer.discount)
      setValue("offerCategory", offer.category)
      setValue("offerRequirements", offer.instructions)
      setValue("offerImage", offer.thumbnail)
    }
    getOffers()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    console.log("changes after editing form values:", currentValues)
    if (
      currentValues.offerTitle !== offer.offerName ||
      currentValues.offerShortDesc !== offer.offerDescription ||
      currentValues.offerDiscount !== offer.discount ||
      currentValues.offerCategory._id !== offer.category._id ||
      currentValues.offerRequirements.toString() !==
      offer.instructions.toString() ||
      currentValues.offerImage !== offer.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
     console.log(data)

    if (editOffer) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("offerId", offer._id)
        if (currentValues.offerTitle !== offer.offerName) {
          formData.append("offerName", data.offerTitle)
        }
        if (currentValues.offerShortDesc !== offer.offerDescription) {
          formData.append("offerDescription", data.offerShortDesc)
        }
        if (currentValues.offerDiscount !== offer.discount) {
          formData.append("discount", data.offerDiscount)
        }
        if (currentValues.offerCategory._id !== offer.category._id) {
          formData.append("category", data.offerCategory)
        }
        if (
          currentValues.offerRequirements.toString() !==
          offer.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.offerRequirements)
          )
        }
        if (currentValues.offerImage !== offer.thumbnail) {
          formData.append("thumbnailImage", data.offerImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editOfferDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setOffer(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("offerName", data.offerTitle)
    formData.append("offerDescription", data.offerShortDesc)
    formData.append("discount", data.offerDiscount)
    formData.append("category", data.offerCategory)
    formData.append("status", OFFER_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.offerRequirements))
    formData.append("thumbnailImage", data.offerImage)
    setLoading(true)
    console.log("formdata",formData);
    const result = await addOfferDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setOffer(result))
    }
    setLoading(false)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="offerTitle">
          Offer Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="offerTitle"
          placeholder="Enter offer Title"
          {...register("offerTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.offerTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Offer title is required
          </span>
        )}
      </div>
      {/* Service Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="offerShortDesc">
        Offer Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="offerShortDesc"
          placeholder="Enter Description"
          {...register("offerShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.offerShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Offer Description is required
          </span>
        )}
      </div>
      {/* service Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="offerDiscount">
          Offer Discount <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="offerDiscount"
            placeholder="Enter offer discount"
            {...register("offerDiscount", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.offerDiscount && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Offer discount is required
          </span>
        )}
      </div>
      {/* service Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="offerCategory">
          Offer Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("offerCategory", { required: true })}
          defaultValue=""
          id="offerCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            offerCategories?.map((category, indx) => (
              <option className="flex" key={indx} value={category?._id}>
                {category?.categoryName}
              </option>
            ))}
        </select>
        {errors.offerCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            offer Category is required
          </span>
        )}
      </div>
    
      {/* Course Thumbnail Image */}
      <Upload
        name="offerImage"
        label="offer Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editOffer? offer?.thumbnail : null}
      />
     
      {/* Requirements/Instructions */}
      <RequirementsField
        name="offerRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editOffer && (
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
          text={!editOffer ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}