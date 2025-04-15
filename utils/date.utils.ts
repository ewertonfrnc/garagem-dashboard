export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
) {
  if (typeof date === "string") date = new Date(date);

  return new Intl.DateTimeFormat("pt-BR", options).format(date);
}
