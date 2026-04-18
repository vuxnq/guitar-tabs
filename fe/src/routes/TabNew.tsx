import { Form, redirect, useLoaderData, type ActionFunctionArgs } from 'react-router';
import { createTab } from '../api/tabs';
import type { Artist, Release, Track } from '../types';
import { getArtists } from '../api/artists';
import { useEffect, useState } from 'react';
import { getReleases } from '../api/releases';
import { getTracks } from '../api/tracks';
import { AutocompleteField } from '../components/AutocompleteField';

export async function loader() {
    return await getArtists()
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()

    const artistName = formData.get('artistName')!.toString()
    const releaseTitle = formData.get('releaseTitle')!.toString()
    const trackTitle = formData.get('trackTitle')!.toString()
    const content = formData.get('content')!.toString()
    const author = formData.get('author')!.toString()

    const tab = await createTab({
        artistName,
        releaseTitle,
        trackTitle,
        content,
        author,
    })

    throw redirect(`/tabs/${tab.id}`)
}

export function TabNew() {
    const artists = useLoaderData() as Artist[]

    const [artistName, setArtistName] = useState('')
    const [releaseTitle, setReleaseTitle] = useState('')
    const [trackTitle, setTrackTitle] = useState('')

    const [releases, setReleases] = useState<Release[]>([])
    const [tracks, setTracks] = useState<Track[]>([])

    const selectedArtist = artists.find(x => x.name === artistName) ?? null
    const selectedRelease = releases.find(x => x.title === releaseTitle) ?? null

    useEffect(() => {
        if (!selectedArtist) return
        getReleases({ artistId: selectedArtist.id }).then(setReleases)
    }, [selectedArtist])

    useEffect(() => {
        if (!selectedRelease) return
        getTracks({ releaseId: selectedRelease.id }).then(setTracks)
    }, [selectedRelease])

    const handleArtistChange = (value: string) => {
        setArtistName(value)
        setReleaseTitle('')
        setTrackTitle('')
        setReleases([])
        setTracks([])
    }

    const handleReleaseChange = (value: string) => {
        setReleaseTitle(value)
        setTrackTitle('')
        setTracks([])
    }

    return (
        <>
            <h1>New Tab</h1>

            <Form method='POST'>
                <AutocompleteField
                    label='Artist'
                    name='artistName'
                    value={artistName}
                    options={artists}
                    getLabel={(x) => x.name}
                    onChange={handleArtistChange}
                />

                <AutocompleteField
                    label='Release'
                    name='releaseTitle'
                    value={releaseTitle}
                    options={releases}
                    getLabel={(x) => x.title}
                    onChange={handleReleaseChange}
                />

                <AutocompleteField
                    label='Track'
                    name='trackTitle'
                    value={trackTitle}
                    options={tracks}
                    getLabel={(x) => x.title}
                    onChange={setTrackTitle}
                />

                <div>
                    <div>
                        <label>Author:</label>
                    </div>
                    <div>
                        <input type='text' name='author' />
                    </div>
                </div>

                <div>
                    <div>
                        <label>Content:</label>
                    </div>
                    <div>
                        <textarea name='content' />
                    </div>
                </div>

                <button type='submit'>Submit</button>
            </Form>
        </>
    )
}
