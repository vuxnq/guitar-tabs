import { useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError() as any;
  return (
    <div>
      <h1>Oops! Something went wrong</h1>
      <pre>{error?.message || JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}
