export const getHeadingLink = (value: string) => {
  return value
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "");
};
