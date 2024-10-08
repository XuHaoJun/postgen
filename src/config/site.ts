import { msg } from "@lingui/macro"

export const siteConfig = {
  name: msg`PostGen`,
  links: {
    github: "https://github.com/xuhaojun/postgen",
  },
}

export type SiteConfig = typeof siteConfig
