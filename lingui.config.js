/** @type {import('@lingui/conf').LinguiConfig} */
const config  = {
  locales: ["en", "zh-Hant", "zh-Hans"],
  sourceLocale: "zh-Hant",
  fallbackLocales: {
    default: "zh-Hant",
  },
  catalogs: [
    {
      path: "src/locales/{locale}",
      include: ["src/"],
    },
  ],
}
module.exports = config
export default config