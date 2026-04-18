import {
  Form,
  redirect,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { getTab, updateTab } from "../api/tabs";
import type { Tab } from "../types";

export function loader({ params }: LoaderFunctionArgs) {
  const tabId = Number.parseInt(params.tabId as string);
  return getTab({ tabId });
}

export async function action({ params, request }: ActionFunctionArgs) {
  console.debug("tab edit action");

  const formData = await request.formData();

  console.debug(params);

  const id = Number.parseInt(params.tabId!);
  const content = formData.get("content")!.toString();
  const author = formData.get("author")!.toString();

  console.debug("tab edit:", { id, content, author });

  const tab = await updateTab({
    id,
    content,
    author,
  });

  throw redirect(`/tabs/${tab.id}`);
}

export function TabEdit() {
  const data = useLoaderData() as Tab;

  return (
    <>
      <h1>Edit Tab</h1>

      {/*
        Tab data: 
        <pre>{JSON.stringify(data, null, 2)}</pre>
        */}

      <Form method="PUT">
        <div>
          <label>
            Content:
            <textarea name="content" defaultValue={data.content} />
          </label>
        </div>

        <div>
          <label>
            Author:
            <input type="text" name="author" defaultValue={data.author} />
          </label>
        </div>

        <button type="submit">Submit</button>
      </Form>
    </>
  );
}
