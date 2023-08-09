import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://grip.test.gen-tec.net/",
});

export default axiosInstance;
