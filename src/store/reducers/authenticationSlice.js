"use client";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("UserData") ? JSON.parse(Cookies.get("UserData")) : null,
  userToken: Cookies.get("UserToken") ? Cookies.get("UserToken") : null,
  isUser: Cookies.get("UserToken") && Cookies.get("UserData") ? true : false,
  CurrentDeviceToken: Cookies.get("CurrentDeviceToken") ? Cookies.get("CurrentDeviceToken") : null,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      let tempObj = { ...action?.payload?.user };
      const token = action?.payload?.token;
      const current_device_token = action?.payload?.current_device_token;

      Cookies.set("UserToken", token, {
        expires: 1,
        path: "/",
      });

      Cookies.set("CurrentDeviceToken", current_device_token, {
        expires: 1,
        path: "/",
      });

      Cookies.set("UserData", JSON.stringify(tempObj), {
        expires: 1,
        path: "/",
      });
      state.user = tempObj;
      state.userToken = token;
      state.CurrentDeviceToken = current_device_token;
      state.isUser = !!token ? true : false;
    },
    updateAuth: (state, action) => {
      let tempObj = {
        ...state?.user,
        ...action.payload,
      };
      
      Cookies.set("UserData", JSON.stringify(tempObj), {
        expires: 1,
        path: "/",
      });
      state.user = tempObj;
    },
    removeAuth: (state) => {
      Cookies.remove("UserToken", {
        expires: new Date("May 16, 1970"),
        path: "/",
      });
      Cookies.remove("UserData", {
        expires: new Date("May 16, 1970"),
        path: "/",
      });

      Cookies.remove("CurrentDeviceToken", {
        expires: new Date("May 16, 1970"),
        path: "/",
      });

      state.user = null;
      state.userToken = null;
      state.CurrentDeviceToken = null;
      state.isUser = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, updateAuth, removeAuth } = authenticationSlice.actions;
export default authenticationSlice.reducer;
