const BASE_URL = process.env.REACT_APP_BASE_URL
// http://localhost:4000/api/v1 backend url 
// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",  // router backend path auth and sendotp is controller funtion
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_BOOKED_SERVICE_API: BASE_URL + "/profile/getBookServices",
  GET_ADMIN_DATA_API: BASE_URL + "/profile/AdminDashboard",
}

// CUSTOMER ENDPOINTS
export const studentEndpoints = {
  SERVICE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  SERVICE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// SERVICE ENDPOINTS
export const serviceEndpoints = {
  GET_ALL_SERVICE_API: BASE_URL + "/service/getAllServices",
  SERVICE_DETAILS_API: BASE_URL + "/service/getServiceDetails",
  EDIT_SERVICE_API: BASE_URL + "/service/editService",
  SERVICE_CATEGORIES_API: BASE_URL + "/service/showAllCategories",
  CREATE_SERVICE_API: BASE_URL + "/service/createService",
  GET_ALL_ADMIN_SERVICES_API: BASE_URL + "/service/getAdminServices",
  DELETE_SERVICE_API: BASE_URL + "/service/deleteService",
  GET_FULL_SERVICE_DETAILS_AUTHENTICATED: BASE_URL + "/service/getFullServiceDetails",
  BOOK_COMPLETION_API: BASE_URL + "/service/updateServiceProgress",
  CREATE_RATING_API: BASE_URL + "/service/createRating",
}

// OFFER ENDPOINT
export const offerEndpoints = {
  GET_ALL_OFFER_API: BASE_URL + "/service/getAllOffers",
  OFFER_DETAILS_API: BASE_URL + "/service/getOfferDetails",
  EDIT_OFFER_API: BASE_URL + "/service/editOffer",
  CREATE_OFFER_API: BASE_URL + "/service/createOffer",
  GET_ALL_ADMIN_OFFERS_API: BASE_URL + "/service/getAdminOffer",
  DELETE_OFFER_API: BASE_URL + "/service/deleteOffer",
  GET_FULL_OFFER_DETAILS_AUTHENTICATED: BASE_URL + "/service/getFullOfferDetails",
}

// CATEGORY ENDPOINT
export const categoryEndPoints = {
  GET_ALL_CATEGORY_API: BASE_URL + "/service/showAllCategories",
  CATEGORY_DETAILS_API: BASE_URL + "/service/getCategoryPageDetails",
  EDIT_CATEGORY_API: BASE_URL + "/service/editCategory",
  CREATE_CATEGORY_API: BASE_URL + "/service/createCategory",
  GET_ALL_ADMIN_CATEGORY_API: BASE_URL + "/service/getAdminCategory",
  DELETE_CATEGORY_API: BASE_URL + "/service/deleteCategory",
  GET_FULL_CATEGORY_DETAILS_AUTHENTICATED: BASE_URL + "/service/getFullCategoryDetails",
}


// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/service/getReviews",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/service/showAllCategories",
}

// CATALOG PAGE DATA
export const cetalogData = {
  CETALOGPAGEDATA_API: BASE_URL + "/service/getCategoryPageDetails",
}
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}