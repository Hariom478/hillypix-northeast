const BASE_URL = process.env.NEXT_PUBLIC_API_BASEPATH; // Your API base URL

const api = async (
  url,
  method = "GET",
  body = null,
  abortable = false,
  additionalOptions = {}
) => {
  let controller;
  let signal;

  if (abortable) {
    controller = new AbortController();
    signal = controller.signal;
  }

  const defaultOptions = {
    method,
    headers: {
      "Content-Type": "application/json", // Adjust as per your API requirements
      // Other headers if needed
    },
    signal,
  };

  const options = { ...defaultOptions, ...additionalOptions }; // Merge default and additional options

  // console.log(options);

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request aborted");
    } else {
      console.error("API request failed:", error);
    }
    throw error; // Re-throwing the error for handling in the calling code
  } finally {
    if (abortable) {
      controller.abort(); // Ensuring the controller is aborted after request completion
    }
  }
};

export default api;



