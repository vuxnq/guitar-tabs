import type { Track } from "../types";
import { apiUrl } from "./api";

export async function getTracks({
  releaseId,
  page = 1,
  limit = 25,
}: { releaseId?: number, page?: number, limit?: number } = {}): Promise<Track[]> {
  const res = await fetch(apiUrl("tracks", { releaseId, page, limit }));
  const json = await res.json();
  return json.data;
}

export async function getTrack({
  trackId,
  include = false,
}: {
  trackId: number;
  include?: boolean;
}): Promise<Track> {
  const res = await fetch(apiUrl(`tracks/${trackId}`, { include }));
  return res.json();
}
