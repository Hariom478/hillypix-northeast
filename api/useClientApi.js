import React from "react";
import Cookies from "js-cookie";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASEPATH_V2;

// Create an Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const useClientApi = () => {
  const getUserToken = () => Cookies.get("UserToken");

  const getToken = () => {
    return getUserToken();
  };

  const Api = async (
    url,
    method = "GET",
    data,
    customConfig,
    isAbort = false
  ) => {
    const abortController = isAbort ? new AbortController() : null;
    const signal = abortController ? abortController.signal : undefined;

    try {
      const token = getToken();

      const fullPathWithQuery = typeof window !== "undefined" ? window.location.pathname + window.location.search : "";
      if(!token )
      {
        if(fullPathWithQuery != '/login')
          {
          localStorage.setItem("full_pathurl",fullPathWithQuery);
          }
      }

      const config = {
        ...customConfig,
        headers: {
          ...customConfig?.headers,
          Authorization: `Bearer ${token}`,
        },
        signal,
      };

      if (data) {
        if (data instanceof FormData) {
          config.headers["Content-Type"] = "multipart/form-data";
        } else {
          config.headers["Content-Type"] = "application/json";
        }
      }

      let response;
      if (method === "GET") {
        response = await axiosInstance.get(url, config);
      } else if (method === "DELETE") {
        response = await axiosInstance.delete(url, config);
      } else if (method === "POST") {
        response = await axiosInstance.post(url, data, config);
      } else {
        throw new Error("Unsupported method");
      }

      return response;
    } catch (error) {
      return error.response?.data?.message || "Something went wrong";
    }
  };

  return Api;
};

export default useClientApi;
