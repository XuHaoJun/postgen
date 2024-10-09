import * as React from "react"
import { MessageCircle, Share2, ThumbsUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

// TODO
// 右上角新增漢堡按鈕
export const FacebookPost = ({ text }: { text: string }) => {
  const tokens = React.useMemo(() => splitHashtags(text), [text])
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
        </p>
        {/* <img
          src="/api/placeholder/500/300"
          alt="Beach"
          className="mt-3 w-full h-64 object-cover rounded-lg"
        /> */}
        {/* <div className="w-full h-[300px] flex justify-center items-center bg-slate-50 rounded-lg">
          圖片
        </div> */}
      </div>
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center text-gray-600">
          <button className="flex items-center space-x-2 hover:text-blue-600">
            <ThumbsUp size={20} />
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-600">
            <MessageCircle size={20} />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-600">
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}
