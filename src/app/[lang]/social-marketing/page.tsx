import { getEnvs } from "@/atoms/hooks-server"

import SocialMarketingPage from "./SocialMarketingPage"

export default function SocialMarketingPageServer() {
  return <SocialMarketingPage envs={getEnvs()} />
}
