import axios from "axios"

export const axiosMainInstance = axios.create({
  adapter: "fetch",
  baseURL: "http://127.0.0.1:8000",
})

export async function createPost(body: any) {
  return axiosMainInstance
    .post("/social-marketing/posts", body)
    .then((res) => res.data)
}

export async function createImage(body: any) {
  return axiosMainInstance
    .post("/social-marketing/images", body)
    .then((res) => res.data)
}
