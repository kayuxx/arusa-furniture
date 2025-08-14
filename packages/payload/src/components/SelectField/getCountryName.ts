"use server";
import countries from "i18n-iso-countries";

export async function getCountryName(code: string) {
  return countries.getName(code, "en", { select: "official" });
}
