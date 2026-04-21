const API_URL = "http://localhost:3000/api";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

export function apiUrl(path: string, params?: QueryParams) {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const url = new URL(`${API_URL}/${cleanPath}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== false) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  console.debug("apiUrl:", url.toString());
  return url.toString();
}
