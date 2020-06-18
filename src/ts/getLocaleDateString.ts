export function getLocaleDateString(): string {
  const lang = "en"

  return new Date().toLocaleDateString(lang)
}

/**
 * Checks if a value is a valid date.
 *
 * @param  {*} value - The value.
 * @return {Boolean}
 */
export function validDate(value: number | string | any): boolean {

  switch (typeof value) {
    case 'number':
      return true;
    case 'string':
      return !isNaN(Date.parse(value));
    case 'object':
      if (value instanceof Date) {
        return !isNaN(value.getTime());
      }
      return false;
    default:
      return false;
  }
}