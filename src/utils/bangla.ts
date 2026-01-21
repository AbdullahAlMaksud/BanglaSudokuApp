/**
 * Converts English digits to Bangla digits.
 * @param value Number or string containing English digits.
 * @returns String with Bangla digits.
 */
export const toBangla = (value: number | string): string => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return value
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
};

/**
 * Converts Bangla digits to English digits (for internal logic if needed).
 * @param value String containing Bangla digits.
 * @returns String with English digits.
 */
export const toEnglish = (value: string): string => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return value.replace(/[০-৯]/g, (digit) =>
    banglaDigits.indexOf(digit).toString(),
  );
};
