export const safeNewDate = (localDateTimeStr: string) => {
  const match = localDateTimeStr.match(
    /(\d{4})-(\d{2})-(\d{2})[\sT](\d{2}):(\d{2}):(\d{2})(.(\d+))?/
  );
  if (!match) throw new Error("Invalid format.");

  const [, year, month, date, hours, minutes, seconds, , millseconds] = match;

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(date),
    Number(hours),
    Number(minutes),
    Number(seconds),
    Number(millseconds) || 0
  );
};
