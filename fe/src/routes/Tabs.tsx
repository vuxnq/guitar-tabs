import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { getTabs } from '../api/tabs.ts'
import type { Tab } from '../types.ts'
import { getTrack } from '../api/tracks.ts'

export async function loader({ params }: LoaderFunctionArgs) {
    const tabs = await getTabs()
    await Promise.all(
        tabs.map(async (x) => {
            x.track = await getTrack({ trackId: x.trackId })
        })
    )
    return tabs
}

export function Tabs() {
    const data = useLoaderData() as Tab[]
    
    return <>
        <h1>Tabs</h1>

        {/*
        Data: <pre>{JSON.stringify(data, null, 2)}</pre>
        */}

        <Link to='/tabs/new'>New tab</Link>

        {data.map(x => <div>
            <Link to={`/tabs/${x.trackId}`}>
                Track: {x.track.title} | Author: {x.author} | Created At: {x.createdAt.toString()}
            </Link>
        </div>)}
    </>
}
