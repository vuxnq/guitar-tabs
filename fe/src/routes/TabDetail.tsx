import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { getTab, type GetTabResponse } from '../api/tabs'

export function loader({ params }: LoaderFunctionArgs) {
    const tabId = Number.parseInt(params.tabId as string)
    return getTab({ tabId })
}

export function TabDetail() {
    const data = useLoaderData() as GetTabResponse

    return <>
        <h1>Tab Detail</h1>

        Data:
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
}
