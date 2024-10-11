import axios from "axios"

export const axiosMainInstance = axios.create({
  adapter: "fetch",
  baseURL: "http://127.0.0.1:8000",
})

export function createPost(body: any) {
  return axiosMainInstance.post("/social-marketing/posts", body).then(res => res.data)
}