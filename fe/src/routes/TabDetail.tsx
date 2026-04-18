import {
  useLoaderData,
  Form,
  Link,
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "react-router";
import { getTab, deleteTab } from "../api/tabs";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.tabId) throw new Error("Missing tabId");
  return await getTab({ tabId: Number(params.tabId), include: true });
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method === "DELETE") {
    await deleteTab({ tabId: Number(params.tabId), cleanup: true });
    return redirect("/tabs");
  }
  return null;
}

export function TabDetail() {
  const tab = useLoaderData();

  return (
    <div>
      <h1>Tab Detail #{tab.id}</h1>
      <Link to={`/tabs/${tab.id}/edit`}>Edit Tab</Link>

      <Form
        method="DELETE"
        style={{ display: "inline-block", marginLeft: "1rem" }}
      >
        <button type="submit">Delete Tab</button>
      </Form>

      <h2>Content:</h2>
      <pre>{tab.content}</pre>

      <h2>Raw Data:</h2>
      <pre>{JSON.stringify(tab, null, 2)}</pre>
    </div>
  );
}
