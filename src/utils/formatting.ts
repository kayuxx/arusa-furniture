import { currencies } from "@/constants";

export function formatPrice(currency: string, amount: number) {
  const supportedCurrencies = currencies.find((e) => e.currency === currency);
  if (!supportedCurrencies)
    throw Error(`We do not support the "${currency}" currency`);

  return new Intl.NumberFormat(supportedCurrencies.locale, {
    style: "currency",
    currency: supportedCurrencies.currency,
  }).format(amount);
}
