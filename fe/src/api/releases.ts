import type { Release } from "../types";
import { apiUrl } from "./api";

export async function getReleases({
  artistId,
  page = 1,
  limit = 25,
}: { artistId?: number, page?: number, limit?: number } = {}): Promise<Release[]> {
  const res = await fetch(apiUrl("releases", { artistId, page, limit }));
  const json = await res.json();
  return json.data;
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
