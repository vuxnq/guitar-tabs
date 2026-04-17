import { useRouteError } from "react-router";

export function ErrorBoundary() {
    const err = useRouteError() 
    return <> 
        <h1>App Error</h1>
        <pre>{err.message}</pre>
    </>
}
