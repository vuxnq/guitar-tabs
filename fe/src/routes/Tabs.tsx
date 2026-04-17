import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { getTabs } from '../api/tabs.ts'
import type { Tab } from '../types.ts'

export async function loader({ params }: LoaderFunctionArgs) {
    return await getTabs()
}

export function Tabs() {
    const data = useLoaderData() as Tab[]
    
    return <>
        <h1>Tabs</h1>

        Data: 
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    </>
}
