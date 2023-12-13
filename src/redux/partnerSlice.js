import { createSlice } from "@reduxjs/toolkit";

const partnerSlice = createSlice({
  name: "partner",
  initialState: {
    supplier: {
      allSuppliers: null,
      isFetching: false,
      error: false,
    },
    customer: {
      allCustomers: null,
      isFetching: false,
    },
  },
  reducers: {
    getSuppliersStart: (state) => {
      state.supplier.isFetching = true;
    },
    getSuppliersSuccess: (state, action) => {
      state.supplier.isFetching = false;
      state.supplier.allSuppliers = action.payload;
      state.supplier.error = false;
    },
    getSuppliersError: (state) => {
      state.supplier.isFetching = false;
      state.supplier.error = true;
    },
    getCustomersStart: (state) => {
      state.customer.isFetching = true;
    },
    getCustomersSuccess: (state, action) => {
      state.customer.isFetching = false;
      state.customer.allCustomers = action.payload;
      state.customer.error = false;
    },
  },
});

export const {
  getSuppliersError,
  getSuppliersStart,
  getSuppliersSuccess,
  getCustomersStart,
  getCustomersSuccess,
} = partnerSlice.actions;

export default partnerSlice.reducer;
