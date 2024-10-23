import * as React from "react"
import { SocialMarketingPostFormSchema } from "@/domain/SocialMarketing"
import { atom, useAtom, useAtomValue } from "jotai"
import { addRxPlugin, createRxDatabase } from "rxdb"
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode"
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie"
import { firstValueFrom } from "rxjs"
import zodToJsonSchema from "zod-to-json-schema"

export const envsAtom = atom<{ NODE_ENV?: string }>({})

const inputSchema = zodToJsonSchema(SocialMarketingPostFormSchema, "schema")
  .definitions?.schema

export const socialMarketingPostSchema = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    input: inputSchema as any,
    output: {
      type: "object",
      properties: {
        text: {
          type: "string",
        },
        imageUrl: {
          type: "string",
        },
      },
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
  },
  required: ["id", "input", "output", "createdAt"],
}
export async function createClientDb() {
  return createRxDatabase({
    name: "postgen",
    storage: getRxStorageDexie(),
    ignoreDuplicate: true,
  })
}

export const dbAtom = atom<Awaited<ReturnType<typeof createClientDb>> | null>(
  null
)

export function useInitializeDb() {
  const envs = useAtomValue(envsAtom)
  const [db, setDb] = useAtom(dbAtom)
  React.useEffect(() => {
    async function run() {
      if (envs.NODE_ENV !== "production") {
        addRxPlugin(RxDBDevModePlugin)
      }
      if (!db) {
        const newDb = await createClientDb()
        await newDb.addCollections({
          "social-marketing-posts": {
            schema: socialMarketingPostSchema,
          },
        })
        setDb(newDb)
      }
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
