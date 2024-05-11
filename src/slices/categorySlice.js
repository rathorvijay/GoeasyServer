import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  category: null,
  editCategory: false,
  paymentLoading: false,
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setEditCategory: (state, action) => {
      state.editCategory = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetCategoryState: (state) => {
      state.step = 1
      state.category = null
      state.editCategory = false
    },
  },
})

export const {
  setStep,
  setCategory,
  setEditCategory,
  setPaymentLoading,
  resetCategoryState,
} = categorySlice.actions

export default categorySlice.reducer