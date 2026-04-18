import { apiUrl } from "./api";

export type SearchResult = {
  type: "artist" | "release" | "track" | "tab";
  id: number;
  name?: string;
  title?: string;
  author?: string;
  artistName?: string;
  releaseTitle?: string;
  trackTitle?: string;
};

export async function globalSearch(query: string): Promise<SearchResult[]> {
  if (!query) return [];
  const res = await fetch(apiUrl("search", { q: query }));
  return res.json();
}
