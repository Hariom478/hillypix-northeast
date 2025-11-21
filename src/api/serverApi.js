const serverApi = async (endpoint, method = "GET", data, token, config) => {
  try {
    const fetchUrl = process.env.NEXT_PUBLIC_API_BASEPATH_V2 + endpoint;

    const fetchConfig = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
      ...config,
    };

    if (!!token) {
      const headers = fetchConfig.headers || {};
      headers["Authorization"] = `Bearer ${token}`;
      fetchConfig.headers = headers;
    }

    if (data && method === "POST") {
      fetchConfig.body = JSON.stringify(data);
    }

    const response = await fetch(fetchUrl, fetchConfig);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default serverApi;



