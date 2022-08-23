// Remove Keys from object where value == null or undefined
export default async function <T>(object: T) {
  Object.keys(object).forEach((key) => {
    if (
      object[key as keyof T] === null ||
      object[key as keyof T] === undefined
    ) {
      delete object[key as keyof T];
    }
  });
  return object;
}
