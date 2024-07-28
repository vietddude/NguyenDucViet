/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Picks the specified keys from the source object.
 * @param object - The source object
 * @param keys - The keys to pick from the source object
 * @returns An object composed of the picked object properties
 */
const pick = (object: { [key: string]: any }, keys: string[]): { [key: string]: any } => {
  return keys.reduce(
    (obj, key) => {
      if (object && Object.hasOwn(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    },
    {} as { [key: string]: any },
  );
};

export default pick;
