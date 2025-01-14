export const getFormattedDate = (
  timeStamp: number,
  format: Intl.DateTimeFormatOptions
) => {
  return new Date(timeStamp).toLocaleString("en-IN", format);
};
