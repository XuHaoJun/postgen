import { redirect, RedirectType } from "next/navigation"
import { withLinguiPage } from "@/withLingui"

export default withLinguiPage(function Home({ lang }: any) {
  redirect(`/${lang}/marketing`, RedirectType.replace)
})
