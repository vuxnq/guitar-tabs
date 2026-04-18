import {
  useLoaderData,
  Form,
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "react-router";
import { getTab, updateTab } from "../api/tabs";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.tabId) throw new Error("Missing tabId");
  return await getTab({ tabId: Number(params.tabId) });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const payload = {
    id: Number(params.tabId),
    author: formData.get("author") as string,
    content: formData.get("content") as string,
  };

  await updateTab(payload);
  return redirect(`/tabs/${params.tabId}`);
}

export function TabEdit() {
  const tab = useLoaderData();

  return (
    <div>
      <h1>Edit Tab #{tab.id}</h1>
      <Form
        method="PUT"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <label>
          Author:
          <input type="text" name="author" defaultValue={tab.author} required />
        </label>
        <label>
          Tab Content:
          <textarea
            name="content"
            defaultValue={tab.content}
            rows={10}
            required
            style={{ fontFamily: "monospace", width: "100%" }}
          ></textarea>
        </label>
        <button type="submit">Update Tab</button>
      </Form>

      <h2>Current Data</h2>
      <pre>{JSON.stringify(tab, null, 2)}</pre>
    </div>
  );
}
