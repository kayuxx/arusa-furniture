// we currently support Arabic as an RTL language, but what if we added support for others
const RTL_LOCALES = [
  "ar", // Arabic
  "he", // Hebrew
  "fa", // Persian
  "ur", // Urdu
  "ps", // Pashto
  "ku", // Kurdish
  "sd", // Sindhi
  "yi", // Yiddish
];

export function isRtl(locale: string) {
  // if there's only a regional locale, we only care about the language code
  const localeCode = locale.split("-")[0];

  return RTL_LOCALES.includes(localeCode);
}

export function getLangDir(locale: string) {
  return isRtl(locale) ? "rtl" : "ltr";
}
