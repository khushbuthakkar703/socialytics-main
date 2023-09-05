export function getPathFromUrl(url: string) {
  return url.split(/[?#]/)[0];
}
