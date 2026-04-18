import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { getTabs } from '../api/tabs.ts'
import type { Tab } from '../types.ts'
import { getTrack } from '../api/tracks.ts'
import { getRelease } from '../api/releases.ts'

export async function loader({ params }: LoaderFunctionArgs) {
    const tabs = await getTabs()

    await Promise.all(
        tabs.map(async (x) => {
            x.track = await getTrack({ trackId: x.trackId })
            x.track.release = await getRelease({ releaseId: x.track.releaseId })
        })
    )

    return tabs
}

export function Tabs() {
    const data = useLoaderData() as Tab[]

    return <>
        <h1>Tabs</h1>

        <Link to='/tabs/new'>New tab</Link>

        <table>
            <thead>
                <tr>
                    <th>Track</th>
                    <th>Release</th>
                    <th>Author</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                {data.map(x => (
                    <tr key={x.id}>
                        <td>
                            <Link to={`/tabs/${x.id}`}>{x.track.title}</Link>
                        </td>
                        <td>{x.track.release.title}</td>
                        <td>{x.author}</td>
                        <td>
                            {new Date(x.createdAt).toLocaleString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

