/*
 *  📌 2. 주문/회원/도서 API 요청 만들기
 */
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
