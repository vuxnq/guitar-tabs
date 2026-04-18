import { useLoaderData, Link } from "react-router";
import { getTabs } from "../api/tabs";

export async function loader() {
  return await getTabs();
}

export function Tabs() {
  const tabs = useLoaderData();

  return (
    <div>
      <h1>All Tabs</h1>
      <Link to="/tabs/new">Create New Tab (Smart Form)</Link>
      <ul>
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link to={`/tabs/${tab.id}`}>
              Tab #{tab.id} by {tab.author}
            </Link>
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(tabs, null, 2)}</pre>
    </div>
  );
}
