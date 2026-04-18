import type { Track } from "../types";
import { apiUrl } from "./api";

export async function getTracks({
  releaseId,
}: { releaseId?: number } = {}): Promise<Track[]> {
  const res = await fetch(apiUrl("tracks", { releaseId }));
  return res.json();
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
