import { Form, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { getTab } from '../api/tabs'
import type { Tab } from '../types'

export function loader({ params }: LoaderFunctionArgs) {
    const tabId = Number.parseInt(params.tabId as string)
    return getTab({ tabId })
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    formData.get('content')
    formData.get('author')
}

export function TabEdit() {
    const data = useLoaderData() as Tab

    return <>
        <h1>Edit Tab</h1>

        Tab data: 
        <pre>{JSON.stringify(data, null, 2)}</pre>

        <Form method='PUT'>
            <div>
                <label>
                    Content:
                    <textarea name='content' value={data.content} />
                </label>
            </div>

            <div>
                <label>
                    Author:
                    <input type='text' name='author' value={data.author} />
                </label>
            </div>

            <button type='submit'>Submit</button>
        </Form>
    </>
}
