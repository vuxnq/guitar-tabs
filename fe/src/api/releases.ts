import type { Release } from "../types";
import { apiUrl } from "./api";

export async function getReleases({
  artistId,
}: { artistId?: number } = {}): Promise<Release[]> {
  const res = await fetch(apiUrl("releases", { artistId }));
  return res.json();
}

export async function getRelease({
  releaseId,
  include = false,
}: {
  releaseId: number;
  include?: boolean;
}): Promise<Release> {
  const res = await fetch(apiUrl(`releases/${releaseId}`, { include }));
  return res.json();
}
