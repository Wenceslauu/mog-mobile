export default function generateDropdownOptionsFromEnum<T extends {}>(
  enumObject: T
) {
  return Object.keys(enumObject)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: enumObject[key as keyof typeof enumObject],
    }));
}
