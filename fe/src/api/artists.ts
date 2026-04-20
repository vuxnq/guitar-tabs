import type { Artist } from "../types";
import { apiUrl } from "./api";

export async function getArtists({
  page = 1,
  limit = 25, 
}: { page?: number; limit?: number } = {}): Promise<Artist[]> {
  const res = await fetch(apiUrl("artists", { page, limit }));
  const json = await res.json();
  return json.data; 
}

export async function getArtist({
  artistId,
  include = false,
}: {
  artistId: number;
  include?: boolean;
}): Promise<Artist> {
  const res = await fetch(apiUrl(`artists/${artistId}`, { include }));
  return res.json();
}
