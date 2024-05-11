import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  offer: null,
  editOffer: false,
  paymentLoading: false,
}

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setOffer: (state, action) => {
      state.offer = action.payload
    },
    setEditOffer: (state, action) => {
      state.editOffer = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetOfferState: (state) => {
      state.step = 1
      state.offer = null
      state.editOffer = false
    },
  },
})

export const {
  setStep,
  setOffer,
  setEditOffer,
  setPaymentLoading,
  resetOfferState,
} = offerSlice.actions

export default offerSlice.reducer