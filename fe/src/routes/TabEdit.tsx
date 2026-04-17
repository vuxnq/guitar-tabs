import { useLoaderData, type LoaderFunctionArgs } from 'react-router'

export function loader({ params }: LoaderFunctionArgs) {
    return { 
        id: params.tabId 
    }
}

export function TabEdit() {
    const data = useLoaderData()

    return <>
        <h1>Edit Tab</h1>
        Tab id: {data.id}
    </>
}
