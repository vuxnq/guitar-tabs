import type { Artist } from "../types";
import { apiUrl } from "./api";

export async function getArtists(): Promise<Artist[]> {
    const res = await fetch(apiUrl(`artists`))
    const data = await res.json() as Artist[]
    return data
}

export async function getArtist({ artistId }: { artistId: number }): Promise<Artist> {
    const res = await fetch(apiUrl(`artists/${artistId}`))
    const data = await res.json() as Artist
    return data
}
