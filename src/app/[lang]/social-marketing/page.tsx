import { getEnvs } from "@/atoms/hooks"

import SocialMarketingPage from "./SocialMarketingPage"

export default function SocialMarketingPageServer() {
  return <SocialMarketingPage envs={getEnvs()} />
}
