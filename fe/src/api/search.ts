import { apiUrl } from "./api";

export type SearchResult = {
  type: "artist" | "release" | "track" | "tab";
  id: number;
  parentId?: number;
  name?: string;
  title?: string;
  author?: string;
  artistName?: string;
  releaseTitle?: string;
  trackTitle?: string;
};

export async function globalSearch(
  query: string,
  limit: number = 24,
): Promise<SearchResult[]> {
  if (!query) return [];
  const res = await fetch(apiUrl("search", { q: query, limit }));
  return res.json();
}
