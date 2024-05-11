import { toast } from "react-hot-toast"

// import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { categoryEndPoints } from "../apis"

const {
  GET_ALL_CATEGORY_API,
  CATEGORY_DETAILS_API,
  EDIT_CATEGORY_API,
  CREATE_CATEGORY_API,
  GET_ALL_ADMIN_CATEGORY_API,
  DELETE_CATEGORY_API,
  GET_FULL_CATEGORY_DETAILS_AUTHENTICATED,
} = categoryEndPoints

export const getAllCategories = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_CATEGORY_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch  Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchCategoryDetails = async (categoryId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", CATEGORY_DETAILS_API, {
      categoryId,
    })
    console.log("CATEGORY_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("CATEGORY_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// fetching the available course categories
export const fetchCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_CATEGORY_API)
    console.log("CATEGORY_DETAILS_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("CATEGORY_DETAILS_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

// add the category details
export const addCategoryDetails = async (data, token) => {
  console.log("Data",data);
  console.log("token",token);
  let result = null
  const toastId = toast.loading("Loading...")

  try {

    const response = await apiConnector("POST",CREATE_CATEGORY_API, data, {
      "Content-Type": "multipart/form-data",
       Authorization: `Bearer ${token}`,
    })

    console.log("CREATE_CATEGORY_API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Category Details")
    }

    toast.success("Category Details Added Successfully")
    result = response?.data?.data

  } catch (error) {
    console.log("category create API ERROR............", error.message)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the category details
export const editCategoryDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_CATEGORY_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT category API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update category Details")
    }
    toast.success("categoy Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT category API ERROR............", error)
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
export const fetchAdminCategories = async (token) => {
  let result = []
  console.log("get amin details fronend",token);

  const toastId = toast.loading("Loading...")
  try {
    const res = await apiConnector(
      "GET",
      GET_ALL_ADMIN_CATEGORY_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("Admin category API RESPONSE............", res.data)
    if (!res?.data?.success) {
      throw new Error("Could Not Fetch Admin category")
    }
    result = res?.data?.data
  } catch (error) {
    console.log("Admin category API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a service
export const deleteCategory = async (data, token) => {
  console.log("delete category",data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_CATEGORY_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE CATEGORY API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete CATEGORY")
    }
    toast.success("CATEGORY Deleted")
  } catch (error) {
    console.log("DELETE CATEGORY API ERROR............", error.message)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// get full details of a course
export const getFullDetailsOfCategoy = async (categoryId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_CATEGORY_DETAILS_AUTHENTICATED,
      {
        categoryId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("CATEGORY_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("CATEGORY_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

