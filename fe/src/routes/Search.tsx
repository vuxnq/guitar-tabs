import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { globalSearch } from "../api/search";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  return await globalSearch(q);
}

export function Search() {
  const results = useLoaderData();

  return (
    <div>
      <h1>Search Results</h1>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}
