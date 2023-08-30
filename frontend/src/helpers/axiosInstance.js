import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://zabihaty.test.gen-tec.net",
});

export default axiosInstance;
