"use client"

import * as React from "react"
import { useCreatePostMutation } from "@/api/query"
import { useInitializeDb } from "@/atoms"
import { useDb, useHydrateEnvsAtom, type getEnvs } from "@/atoms/hooks"
import { SocialMarketingPostFormSchema } from "@/domain/SocialMarketing"
import { formatResponseError } from "@/utils/formatResponseError"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trans } from "@lingui/macro"
import { useForm } from "react-hook-form"
import * as R from "remeda"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { OneThumbSlider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { FacebookPost } from "@/components/FacebookPost"
import { Textarea2 } from "@/components/Textarea2"

import { HistoryCard } from "./HistoryCard"

const FormSchema = SocialMarketingPostFormSchema

export default function SocialMarketingPage({
  envs,
}: {
  envs: ReturnType<typeof getEnvs>
}) {
  useHydrateEnvsAtom(envs)
  useInitializeDb()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startStyle: "預設開頭",
      numCharacter: "30~80字",
      userInstruction: "",
      imageUrl: "",
      numHashtag: "3",
      autoNewline: true,
      humorLevel: 50,
      emojiLevel: 50,
      showyLevel: 10,
      emotionLevel: 50,
      professionalLevel: 50,
      topicRelatedLevel: 50,
      creativeLevel: 50,
      sectorLevel: 10,
      punLevel: 0,
    },
  })

  const createPostMutation = useCreatePostMutation()
  const db = useDb()

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const body = R.clone(data)
    if (body.humorLevel < 90 || body.creativeLevel < 90) {
      body.punLevel = 0
    }
    const resp = await createPostMutation.mutateAsync(body)
    db?.collections["social-marketing-posts"].upsert(resp)
  }

  const skipIds = React.useMemo(() => {
    if (createPostMutation.data) {
      return [createPostMutation.data.id]
    } else {
      return []
    }
  }, [createPostMutation.data])

  const levels: Array<{
    name: keyof Pick<
      z.infer<typeof FormSchema>,
      | "humorLevel"
      | "emojiLevel"
      | "showyLevel"
      | "emotionLevel"
      | "professionalLevel"
      | "topicRelatedLevel"
      | "creativeLevel"
      | "sectorLevel"
      | "punLevel"
    >
    label: string
    description?: string[]
    step?: number
  }> = React.useMemo(
    () => [
      { name: "humorLevel", label: "幽默程度" },
      { name: "emojiLevel", label: "Emoji 程度😋" },
      { name: "creativeLevel", label: "創意程度" },
      {
        name: "emotionLevel",
        label: "生活化程度",
      },
      { name: "professionalLevel", label: "專業性程度" },
      { name: "topicRelatedLevel", label: "主題相關性程度" },
      { name: "showyLevel", label: "浮誇程度" },
      { name: "sectorLevel", label: "業配程度" },
      {
        name: "punLevel",
        label: "諧音程度",
        description: ["僅在幽默程度與創意程度>=90時生效"],
      },
    ],
    []
  )

  const startStyles = React.useMemo(
    () => [
      { value: "預設開頭" },
      { value: "重點條列開頭" },
      { value: "動作開頭" },
      { value: "提問式開頭" },
      { value: "數據式開頭" },
      { value: "背景開頭" },
      { value: "懸念開頭" },
    ],
    []
  )

  return (
    <div className="md:container py-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="w-full md:w-1/2 order-1 md:order-2 flex flex-col gap-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Trans>寫作風格</Trans>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="startStyle"
                  render={({ field }) => (
                    <RadioGroup
                      className="grid grid-cols-12 gap-6 md:gap-3"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {startStyles.map((x) => (
                        <div
                          key={x.value}
                          className="flex items-center space-x-1 col-span-6 md:col-span-3"
                        >
                          <RadioGroupItem value={x.value} id={x.value} />
                          <Label htmlFor={x.value} className="cursor-pointer">
                            {x.value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-2">
                  {levels.map((level) => (
                    <FormField
                      key={level.name}
                      control={form.control}
                      name={level.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {level.label}: {field.value}
                          </FormLabel>
                          <FormControl>
                            <OneThumbSlider
                              min={0}
                              max={100}
                              step={level.step ?? 10}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            <span className="flex justify-between">
                              {(level.description || ["無", "中", "高"])?.map(
                                (d, i) => <span key={i}>{d}</span>
                              )}
                            </span>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>設定</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-12 gap-4">
                <FormField
                  control={form.control}
                  name="numCharacter"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6">
                      <FormLabel>字數</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>可改為無限制</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numHashtag"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6">
                      <FormLabel>Hashtag 數量</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>可改為無限制</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="autoNewline"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 flex gap-2 items-end">
                      <FormLabel className="text-base">自動斷句</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>相關圖片網址</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        可填入既有產品介紹圖片或活動DM
                        {field.value && (
                          <img src={field.value} className="w-[150px]" />
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userInstruction"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel required>使用者指示</FormLabel>
                      <FormControl>
                        <Textarea2 {...field} minRows={4} />
                      </FormControl>
                      <FormDescription>
                        可輸入產品介紹(若已填入產品介紹圖片，可省略)，和你的需求，如&quot;配合國慶日&quot;、
                        &quot;秋季&quot;、&quot;重寫既有文宣&quot;等
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="flex flex-1-1 w-full col-span-12 md:sticky md:bottom-0"
                  disabled={createPostMutation.isPending}
                >
                  {createPostMutation.isPending ? (
                    <Trans>產生AI貼文...</Trans>
                  ) : (
                    <Trans>產生AI貼文</Trans>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col gap-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Trans>結果</Trans>
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-[#f3f3f3] p-[30px] md:p-[100px]">
                {createPostMutation.error ? (
                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <p className="text-red-500">
                      {formatResponseError(createPostMutation.error)}
                    </p>
                  </div>
                ) : (
                  <FacebookPost
                    data={{ id: "", text: createPostMutation.data?.text || "" }}
                    isLoading={createPostMutation.isPending}
                  />
                )}
              </CardContent>
            </Card>
            <HistoryCard skipIds={skipIds} />
          </div>
        </form>
      </Form>
    </div>
  )
}
