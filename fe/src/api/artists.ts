import type { Artist } from "../types";
import { apiUrl } from "./api";

export async function getArtists(): Promise<Artist[]> {
  const res = await fetch(apiUrl(`artists`));
  const data = (await res.json()) as Artist[];
  return data;
}

export async function getArtist({
  artistId,
  include = false,
}: {
  artistId: number;
  include?: boolean;
}): Promise<Artist> {
  const res = await fetch(
    apiUrl(`artists/${artistId}`, [
      {
        include: include,
        key: "include",
        value: include,
      },
    ]),
  );

  const data = (await res.json()) as Artist;
  return data;
}
