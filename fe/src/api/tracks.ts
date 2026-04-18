import type { Track } from "../types";
import { apiUrl } from "./api";

export async function getTracks({
  releaseId = null,
}: {
  releaseId?: number | null;
} = {}): Promise<Track[]> {
  const res = await fetch(
    apiUrl("/tracks", [
      {
        include: releaseId !== null,
        key: "releaseId",
        value: releaseId,
      },
    ]),
  );

  return (await res.json()) as Track[];
}

export async function getTrack({
  trackId,
  include = false,
}: {
  trackId: number;
  include?: boolean;
}): Promise<Track> {
  const res = await fetch(
    apiUrl(`/tracks/${trackId}`, [
      {
        include,
        key: "include",
        value: include,
      },
    ]),
  );
  const data = (await res.json()) as Track;
  return data;
}
