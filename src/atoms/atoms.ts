import { atom } from "jotai"
import { createRxDatabase } from "rxdb"
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie"

export const envsAtom = atom<{ NODE_ENV?: string }>()

async function createClientDb() {
  return createRxDatabase({
    name: "postgen",
    storage: getRxStorageDexie(),
  })
}
