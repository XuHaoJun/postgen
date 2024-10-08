/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
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
