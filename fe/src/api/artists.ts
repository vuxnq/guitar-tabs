import type { Artist } from "../types";
import { apiUrl } from "./api";

export async function getArtists(): Promise<Artist[]> {
  const res = await fetch(apiUrl("artists"));
  return res.json();
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
