import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import serviceReducer from "../slices/serviceSlice"
import viewServiceReducer from "../slices/viewServiceSlice"
import offerReducer from "../slices/offerSlice"
import categoryReducer from "../slices/categorySlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    service:serviceReducer,
    viewService:viewServiceReducer,
    offer:offerReducer,
    category:categoryReducer
})

export default rootReducer