import { z } from "zod"

function defaultNumberZod() {
  return z.number().gte(0).lte(100)
}

export const SocialMarketingPostFormSchema = z.object({
  startStyle: z.string().min(1, { message: "請選擇開頭形式" }),
  numCharacter: z.string(),
  numHashtag: z.string(),
  imageUrl: z.string(),
  userInstruction: z.string().min(1, { message: "請輸入使用者指示" }),
  autoNewline: z.boolean(),
  humorLevel: defaultNumberZod(),
  emojiLevel: defaultNumberZod(),
  showyLevel: defaultNumberZod(),
  emotionLevel: defaultNumberZod(),
  professionalLevel: defaultNumberZod(),
  topicRelatedLevel: defaultNumberZod(),
  creativeLevel: defaultNumberZod(),
  sectorLevel: defaultNumberZod(),
  punLevel: defaultNumberZod(),
})
