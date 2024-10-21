import { useHydrateAtoms } from "jotai/utils"

import { envsAtom } from "./atoms"

export function getEnvs() {
  return { NODE_ENV: process.env.NODE_ENV }
}

export function useHydrateEnvsAtom(envs?: ReturnType<typeof getEnvs>) {
  useHydrateAtoms([[envsAtom, envs]])
}
