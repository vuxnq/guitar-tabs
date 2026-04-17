import type { Track } from "../types"
import { apiUrl } from "./api"


export async function getTracks(
    {
        releaseId = null
    }: {
        releaseId?: number | null
    } = {}
): Promise<Track[]> {
    const res = await fetch(apiUrl('/tracks', [
        {
            include: releaseId !== null,
            key: 'releaseId',
            value: releaseId
        }
    ]))

    return await res.json() as Track[]
}
