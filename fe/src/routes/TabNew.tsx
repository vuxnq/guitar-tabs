import { Form, useLoaderData, type ActionFunctionArgs } from "react-router";
import { newTab } from "../api/tabs";
import type { Artist, Release, Track } from "../types";
import { getArtists } from "../api/artists";
import { useEffect, useState } from "react";
import { getReleases } from "../api/releases";
import { getTracks } from "../api/tracks";

export async function loader() {
    return await getArtists()
}

export async function action({ request }: ActionFunctionArgs) {
    console.log('tab new action')

    const formData = await request.formData()

    const artistName = formData.get('artistName')!.toString()
    const releaseTitle = formData.get('releaseTitle')!.toString()
    const trackTitle = formData.get('trackTitle')!.toString()
    const content = formData.get('content')!.toString()
    const author = formData.get('author')!.toString()

    console.log({
        artistName, 
        releaseTitle,
        trackTitle, 
        content, 
        author, 
    })

    await newTab({ 
        artistName, 
        releaseTitle,
        trackTitle, 
        content, 
        author, 
    })
}

export function TabNew() {
    const artists = useLoaderData() as Artist[]

    const [artistSearch, setArtistSearch] = useState('')
    const [releaseSearch, setReleaseSearch] = useState('')
    const [trackSearch, setTrackSearch] = useState('')

    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
    const [releases, setReleases] = useState<Release[]>([])
    const [selectedRelease, setSelectedRelease] = useState<Release | null>(null)
    const [tracks, setTracks] = useState<Track[]>([])

    useEffect(() => {
        if (!selectedArtist)
            return

        (async () => {
            setReleases(await getReleases({ artistId: selectedArtist.id }))
        })()
    }, [selectedArtist])

    useEffect(() => {
        if (!selectedRelease)
            return

        (async () => {
            setTracks(await getTracks({ releaseId: selectedRelease.id }))
        })()
    }, [selectedRelease])

    const filteredArtists = artists.filter(x => x.name.toLowerCase().includes(artistSearch.toLowerCase()))
    const filteredReleases = releases.filter(x => x.title.toLowerCase().includes(releaseSearch.toLowerCase()))
    const filteredTrack = tracks.filter(x => x.title.toLowerCase().includes(trackSearch.toLowerCase()))

    return <>
        <h1>New Tab</h1>
        data: {JSON.stringify(artists, null, 2)}

        <Form method='POST'>
            <div>
                <label>
                    Artist: 
                    <input 
                        type='text' 
                        value={artistSearch} 
                        onChange={(e) => setArtistSearch(e.target.value)} 
                    />
                    <select 
                        name='artistName' 
                        onChange={(e) => { 
                            console.log('on change artist name:', e.currentTarget.value)
                            const name = e.currentTarget.value
                            setSelectedArtist(artists.find(x => x.name === name)!)
                        }}
                    >
                        <option>-- select --</option>
                        {filteredArtists.map(x => <option key={x.id} value={x.name}>{x.name}</option>)}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Release:
                    <input 
                        type='text' 
                        value={releaseSearch} 
                        onChange={(e) => setReleaseSearch(e.target.value)}
                    />
                    <select 
                        name='releaseTitle' 
                        onChange={(e) => {
                            console.log('on change release title:', e.currentTarget.value)
                            const title = e.currentTarget.value
                            setSelectedRelease(releases.find(x => x.title === title)!)
                        }}
                    >
                        <option>-- select --</option>
                        {filteredReleases.map(x => <option key={x.id} value={x.title}>{x.title}</option>)}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Track:
                    <input 
                        type='text' 
                        value={trackSearch} 
                        onChange={(e) => setTrackSearch(e.target.value)} 
                    />
                    <select 
                        name='trackTitle'
                        onChange={(e) => {
                            console.log('on change track title:', e.currentTarget.value)
                        }}
                    >
                        <option>-- select --</option>
                        {filteredTrack.map(x => <option key={x.id} value={x.title}>{x.title}</option>)}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Author:
                    <input type='text' name='author' />
                </label>
            </div>
            <div>
                <label>
                    Content: 
                    <textarea name='content' />
                </label>
            </div>
            <button type='submit'>Submit</button>
        </Form>
    </>
}


/*

Input an artist name
fetch releases with the artistId




 */
