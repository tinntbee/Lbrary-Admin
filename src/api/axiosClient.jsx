import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_MY_SERVER,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  (e) => {
    //handle error
    throw e;
  }
);

export default axiosClient;
