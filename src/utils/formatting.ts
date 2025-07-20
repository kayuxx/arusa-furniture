export function formatPrice(locale: string, currency: string, amount: number) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
