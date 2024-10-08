import axios from "axios"

export const axiosMainInstance = axios.create({
  adapter: "fetch",
  baseURL: "http://127.0.0.1:8000",
})