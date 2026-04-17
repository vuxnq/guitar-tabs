import { useLoaderData, type LoaderFunctionArgs } from 'react-router'

export function loader({ params }: LoaderFunctionArgs) {
    return 'tab detail data for ' + params.tabId
}

export function TabDetail() {
    const data = useLoaderData()

    return <>
        <h1>Tab Detail</h1>
        <pre>{data}</pre>
    </>
}
