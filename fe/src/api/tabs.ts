import type { Tab } from "../types";
import { apiUrl } from "./api";

export async function getTabs(): Promise<Tab[]> {
    const res = await fetch(apiUrl('/tabs'))
    const data = await res.json() as Tab[]
    return data
}

export async function getTab({ tabId }: {
    tabId: number,
}): Promise<Tab> {
    const res = await fetch(apiUrl(`/tabs/${tabId}`))
    const data = await res.json() as Tab
    return data
}

export async function editTab({ tab }: { tab: Tab }) {
    const res = await fetch(apiUrl(`/tabs/${tab.id}/edit`), {
        method: 'PUT',
        body: JSON.stringify(tab),
    })

    return res
}

export type NewTabRequest = {
    artistName: string,
    releaseTitle: string,
    trackTitle: string,
    content: string,
    author: string,
}

export async function newTab(tab: NewTabRequest) {
    console.log('new tab:', JSON.stringify(tab))

    const res = await fetch(apiUrl(`/tabs/smart`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tab),
    })

    return res
}
