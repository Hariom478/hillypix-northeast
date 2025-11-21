"use client";
import Api from "@/api/serverApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// userstatus = 1 = No Plan
// userstatus = 2 = Active user with Subscription
// userstatus = 3 = Subscription Expired
// userstatus = 4 = Account Deleted/ Inactive User

const initialState = {
  isSubscribe: 6,
  subscriptionDetails: null,
  loading: false,
  error: null,
};

// Async thunk to check subscription status
export const fetchSubscription = createAsyncThunk(
  "subscription/fetchSubscription",
  async (user_id, { rejectWithValue }) => {
    try {
      const res = await Api("/get-subscription-data", "POST", { user_id });
      const data = await res.json();    
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const commonSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscription.fulfilled, (state, action) => {       
        // console.log('action?.payload?.data?.UserDetails',action?.payload?.data?.UserDetails);
        state.loading = false;
        state.isSubscribe = action?.payload?.data?.UserDetails?.userstatus; // assuming this field exists
        state.subscriptionDetails = action?.payload?.data?.UserDetails?.subscript;
        state.loginDevices = action?.payload?.login_devices;
      })
      .addCase(fetchSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commonSlice.reducer;
