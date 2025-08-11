export function getCountryFlag(countryCode: string) {
  return String.fromCodePoint(
    0x1f1e6 + countryCode.charCodeAt(0) - 65, // First letter (A-Z)
    0x1f1e6 + countryCode.charCodeAt(1) - 65, // Second letter (A-Z)
  );
}
