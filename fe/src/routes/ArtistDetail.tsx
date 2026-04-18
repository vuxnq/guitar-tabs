import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router"
import { getArtist } from "../api/artists"
import type { Artist } from "../types"

export async function loader({ params }: LoaderFunctionArgs) {
    const artistId = Number.parseInt(params.artistId!)
    const artist = await getArtist({ artistId, include: true })
    return artist
}

export function ArtistDetail() {
    const data = useLoaderData() as Artist

    return <>
        <h1>Artist Detail</h1>

        {/*
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
        */}

        Name: {data.name}
        <div>
            Releases: 
            <ul>
                {data.releases.map(release => <li>
                    {release.title}
                    <ul>
                        {release.tracks.map(track => <li>
                            <Link to={`/tracks/${track.id}`}>
                                {track.title}
                            </Link>
                        </li>)}
                    </ul>
                </li>)}
            </ul>
        </div>
    </>
}
