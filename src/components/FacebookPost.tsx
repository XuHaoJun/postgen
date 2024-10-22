import * as React from "react"
import { useCreateImageMutation } from "@/api/query"
import { MessageCircle, Share2, ThumbsUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Textarea2 } from "./Textarea2"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"

function splitHashtags(input: string) {
  // Split the string into parts with hashtags and text
  const parts = input.split(/(?=#)/)

  // Map the parts to the desired structure
  return parts.map((part) => {
    if (part.startsWith("#")) {
      return { type: "hashtag", value: part }
    } else {
      return { type: "text", value: part }
    }
  })
}

export interface FacebookPostProps {
  data: {
    id: string
    text: string
  }
  isLoading?: boolean
  disableImageGenerator?: boolean
}

// TODO
// 右上角新增漢堡按鈕
export const FacebookPost = ({
  data,
  isLoading,
  disableImageGenerator,
}: FacebookPostProps) => {
  const { text } = data
  const tokens = React.useMemo(() => splitHashtags(text), [text])
  const createImageMutation = useCreateImageMutation()
  const [userInstruction, setUserInstruction] = React.useState("")
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="font-semibold text-gray-900">Username</p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>
        <p className="mt-3 text-gray-800 whitespace-pre-wrap">
          {tokens.map((token, i) => {
            if (token.type === "hashtag") {
              return (
                <span
                  key={i}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  {token.value}
                </span>
              )
            } else {
              return <span key={i}>{token.value}</span>
            }
          })}
          {isLoading && (
            <span className="flex flex-col gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </span>
          )}
        </p>
        {Boolean(createImageMutation.data) && (
          <img
            className="mt-3 w-full object-cover rounded-lg"
            src={createImageMutation.data.data[0].url}
            alt={createImageMutation.data.data[0].revised_prompt}
          />
        )}
        {!isLoading && Boolean(text) && !disableImageGenerator && (
          <div className="mt-3 w-full h-64 object-cover rounded-lg bg-slate-50 flex justify-center items-center">
            <div className="flex flex-col gap-2 w-3/4">
              <Textarea2
                placeholder="輸入使用者指示，如圖片風格、主題、場景等"
                minRows={2}
                value={userInstruction}
                onChange={(e) => setUserInstruction(e.target.value)}
              />
              <Button
                type="button"
                onClick={() =>
                  createImageMutation.mutate({ text, userInstruction })
                }
                disabled={createImageMutation.isPending}
              >
                {createImageMutation.isPending ? "產生圖片..." : "產生圖片"}
              </Button>
            </div>
          </div>
        )}
        {/* <div className="w-full h-[300px] flex justify-center items-center bg-slate-50 rounded-lg">
          圖片
        </div> */}
      </div>
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center text-gray-600">
          <button
            type="button"
            className="flex items-center space-x-2 hover:text-blue-600 active:animate-wiggle"
          >
            <ThumbsUp size={20} />
            <span>讚</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 hover:text-blue-600 active:animate-wiggle"
          >
            <MessageCircle size={20} />
            <span>留言</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 hover:text-blue-600 active:animate-wiggle"
          >
            <Share2 size={20} />
            <span>分享</span>
          </button>
        </div>
      </div>
    </div>
  )
}
