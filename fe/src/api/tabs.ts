import type { Tab } from "../types";
import { apiUrl } from "./api";

export type NewTabRequest = {
  artistName: string;
  releaseTitle: string;
  trackTitle: string;
  content: string;
  author: string;
};

export type UpdateTabRequest = {
  id: number;
  content: string;
  author: string;
};

export async function getTabs({
  trackId,
  include = false,
}: { trackId?: number; include?: boolean } = {}): Promise<Tab[]> {
  const res = await fetch(apiUrl("tabs", { trackId, include }));
  return res.json();
}

export async function getTab({
  tabId,
  include = false,
}: {
  tabId: number;
  include?: boolean;
}): Promise<Tab> {
  const res = await fetch(apiUrl(`tabs/${tabId}`, { include }));
  return res.json();
}

export async function createTab(tab: NewTabRequest): Promise<Tab> {
  const res = await fetch(apiUrl("tabs/smart"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tab),
  });
  return res.json();
}

export async function updateTab(tab: UpdateTabRequest): Promise<Tab> {
  const res = await fetch(apiUrl(`tabs/${tab.id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tab),
  });
  return res.json();
}

export async function deleteTab({
  tabId,
  cleanup = false,
}: {
  tabId: number;
  cleanup?: boolean;
}) {
  await fetch(apiUrl(`tabs/${tabId}`, { cleanup }), { method: "DELETE" });
}
