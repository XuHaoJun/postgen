import { useMutation } from "@tanstack/react-query"

import * as Apis from "./index"

export const QueryKeys = {}

export function useCreatePostMutation() {
  return useMutation({
    mutationFn: Apis.createPost,
  })
}
