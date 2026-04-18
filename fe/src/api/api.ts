const API_URL = "http://localhost:3000/api";

type Filter = {
  include: boolean | null;
  key: string;
  value: string | number | boolean | null;
};

export function apiUrl(path: string, filters: Filter[] = []) {
  // if the path doesn't start with slash, then add the slash
  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  const urlFilters = filters
    .filter((x) => x.include && x.value !== null)
    .map((x) => `${x.key}=${x.value}`)
    .join("&");

  const url = `${API_URL}/${path}?${urlFilters}`;
  console.debug("apiUrl:", url);
  return url;
}
