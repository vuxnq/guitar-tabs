import type { Release } from "../types";
import { apiUrl } from "./api";

export async function getReleases(
    { 
        artistId = null
    }: { 
        artistId?: number | null 
    } = {}
) {
    const res = await fetch(apiUrl('releases', [
        { 
            include: artistId !== null, 
            key: 'artistId', 
            value: artistId,
        }
    ]))

    return await res.json() as Release[]
}

export async function getRelease({ releaseId }: { releaseId: number }) {
    const res = await fetch(
        apiUrl(
            `releases/${releaseId}`,
        )
    )

    return await res.json() as Release
}
