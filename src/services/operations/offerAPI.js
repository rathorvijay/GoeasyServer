import { toast } from "react-hot-toast"

// import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { offerEndpoints } from "../apis"

const {
    GET_ALL_OFFER_API,
    OFFER_DETAILS_API,
    EDIT_OFFER_API,
    CREATE_OFFER_API,
    DELETE_OFFER_API,
    GET_ALL_ADMIN_OFFERS_API,
    GET_FULL_OFFER_DETAILS_AUTHENTICATED
} = offerEndpoints

export const getAllOffers = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_OFFER_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Offer Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_OFFER_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchOfferDetails = async (offerId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  console.log("catelog deatils");
  let result = null
  try {
    const response = await apiConnector("POST", OFFER_DETAILS_API, {
      offerId,
    })
    console.log("OFFER_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("OFFER_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// fetching the available course categories
export const fetchOfferCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", OFFER_DETAILS_API)
    console.log("OFFER_DETAILS_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch offer Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("OFFER_DETAILS_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

// add the course details
export const addOfferDetails = async (data, token) => {
  console.log("addofferdatails",data);
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_OFFER_API, data, {
      "Content-Type": "multipart/form-data",
       Authorization: `Bearer ${token}`,
    })
    console.log("CREATE OFFER API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add OFFER Details")
    }
    toast.success("OFFER Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("Service create API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the course details
export const editOfferDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_OFFER_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT Offer API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update offer Details")
    }
    toast.success("offer Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT offer API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// // create a section
// export const createSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", CREATE_SECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("CREATE SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Create Section")
//     }
//     toast.success("Course Section Created")
//     result = response?.data?.updatedCourse
//   } catch (error) {
//     console.log("CREATE SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // create a subsection
// export const createSubSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("CREATE SUB-SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Add Lecture")
//     }
//     toast.success("Lecture Added")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("CREATE SUB-SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // update a section
// export const updateSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("UPDATE SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Update Section")
//     }
//     toast.success("Course Section Updated")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("UPDATE SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // update a subsection
// export const updateSubSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("UPDATE SUB-SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Update Lecture")
//     }
//     toast.success("Lecture Updated")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("UPDATE SUB-SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // delete a section
// export const deleteSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", DELETE_SECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("DELETE SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Delete Section")
//     }
//     toast.success("Course Section Deleted")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("DELETE SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }
// // delete a subsection
// export const deleteSubSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("DELETE SUB-SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Delete Lecture")
//     }
//     toast.success("Lecture Deleted")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("DELETE SUB-SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// fetching all courses under a specific instructor
export const fetchAdminOffer = async (token) => {
  let result = []
  console.log("get amin details fronend",token);

  const toastId = toast.loading("Loading...")
  try {
    const res = await apiConnector(
      "GET",
      GET_ALL_ADMIN_OFFERS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("Admin OFFER API RESPONSE............", res.data)
    if (!res?.data?.success) {
      throw new Error("Could Not Fetch Admin offer")
    }
    result = res?.data?.data
  } catch (error) {
    console.log("Admin offer API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a service
export const deleteOffer = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_OFFER_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE Offer API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Offer")
    }
    toast.success("offer Deleted")
  } catch (error) {
    console.log("DELETE Offer API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// get full details of a course
export const getFullDetailsOfOffer = async (offerId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_OFFER_DETAILS_AUTHENTICATED,
      {
        offerId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("GET_FULL_OFFER_DETAILS_AUTHENTICATED API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_FULL_OFFER_DETAILS_AUTHENTICATED API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}
