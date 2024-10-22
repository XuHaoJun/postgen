import { useHydrateAtoms } from "jotai/utils"

import { envsAtom } from "./atoms"

let ENVS: { NODE_ENV?: string } | undefined

export function getEnvs() {
  if (!ENVS) {
    ENVS = { NODE_ENV: process.env.NODE_ENV }
  }
  return ENVS
}

export function useHydrateEnvsAtom(envs: ReturnType<typeof getEnvs>) {
  useHydrateAtoms([[envsAtom, envs]])
}
