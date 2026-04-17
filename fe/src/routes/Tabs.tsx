import { useLoaderData, type LoaderFunctionArgs } from 'react-router'

export function loader({ params }: LoaderFunctionArgs) {
    return 'tabs data'
}

export function Tabs() {
    const data = useLoaderData()
    
    return <>
        <h1>Tabs</h1>
        <pre>{data}</pre>
    </>
}
