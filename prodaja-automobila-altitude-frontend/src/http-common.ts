import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("auth-access-token")
    if (accessToken != null) {
      config.headers["Auth-Access-Token"] = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "#/login"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
