import { useLoaderData, type LoaderFunctionArgs } from "react-router"
import { getArtist } from "../api/artists"
import type { Artist } from "../types"

export async function loader({ params }: LoaderFunctionArgs) {
    const artistId = Number.parseInt(params.artistId!)
    return await getArtist({ artistId })
}

export function ArtistDetail() {
    const data = useLoaderData() as Artist

    return <>
        <h1>Artist Detail</h1>
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    </>
}
