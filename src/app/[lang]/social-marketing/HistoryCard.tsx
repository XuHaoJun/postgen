import * as React from "react"
import { dbAtom } from "@/atoms"
import { useAtomValue } from "jotai"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
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
      .find({})
      .$.subscribe((data) => {
        setPosts(data.map((x) => x.toJSON()))
      })
    return () => {
      sub?.unsubscribe()
    }
  }, [db])
  const finalPosts = React.useMemo(
    () =>
      Array.isArray(skipIds)
        ? posts.filter((x) => skipIds?.includes(x.id) === false)
        : posts,
    [posts, skipIds]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>歷史紀錄</CardTitle>
      </CardHeader>
      <CardContent className="bg-[#f3f3f3] p-[30px] md:p-[100px] max-h-[50vh] overflow-auto">
        <ScrollArea>
          <div className="flex flex-col gap-6">
            {finalPosts.map((p) => (
              <div key={p.id} className="w-full">
                <FacebookPost
                  data={p}
                  disableImageGenerator
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
