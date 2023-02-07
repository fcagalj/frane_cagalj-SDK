// https://stackoverflow.com/a/62969380
export function buildQueryString(query: Record<string, string>): string {
  return Object.entries(query)
    .map(([key, value]) =>
      key && value
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : '',
    )
    .join('&');
}
