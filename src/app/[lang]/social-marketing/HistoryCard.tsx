import * as React from "react"
import { dbAtom } from "@/atoms"
import { useAtomValue } from "jotai"
import { Ellipsis, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { FacebookPost } from "@/components/FacebookPost"

interface HistoryCardProps {
  skipIds?: string[]
}

export function HistoryCard({ skipIds }: HistoryCardProps) {
  const db = useAtomValue(dbAtom)
  const [posts, setPosts] = React.useState<any[]>([])
  React.useEffect(() => {
    if (!db) return
    const sub = db?.collections["social-marketing-posts"]
      .find({ id: { $nin: skipIds } } as any)
      .sort({ createdAt: "desc" })
      .$.subscribe((data) => {
        setPosts(data.map((x) => x.toJSON()))
      })
    return () => {
      sub?.unsubscribe()
    }
  }, [db, skipIds])
  const finalPosts = posts
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          歷史紀錄
          <HistoryDropdownButton />
        </CardTitle>
      </CardHeader>
      {(() => {
        if (!db) {
          return (
            <CardContent>
              <Skeleton className="w-full h-[100px] " />
            </CardContent>
          )
        }
        return (
          <CardContent className="bg-[#f3f3f3] p-[30px] md:p-[100px] max-h-[50vh] overflow-auto">
            <ScrollArea>
              <div className="flex flex-col gap-6">
                {finalPosts.map((p) => (
                  <div key={p.id} className="w-full">
                    <FacebookPost data={p} disableImageGenerator />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        )
      })()}
    </Card>
  )
}

function HistoryDropdownButton() {
  const db = useAtomValue(dbAtom)
  const handleDeleteAll = React.useCallback(() => {
    db?.collections["social-marketing-posts"].find({}).remove()
  }, [db])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-[#f3f3f3] border-none"
          type="button"
        >
          <Ellipsis className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {db && (
          <DropdownMenuItem
            className="text-red-500 flex gap-2"
            onClick={handleDeleteAll}
          >
            <Trash2 />
            <span>清除所有歷史紀錄</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
