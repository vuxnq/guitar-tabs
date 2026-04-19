import { Form, redirect, type ActionFunctionArgs } from "react-router";
import { createTab } from "../api/tabs";

export async function loader() {
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const payload = {
    artistName: formData.get("artistName") as string,
    releaseTitle: formData.get("releaseTitle") as string,
    trackTitle: formData.get("trackTitle") as string,
    author: formData.get("author") as string,
    content: formData.get("content") as string,
  };

  const newTab = await createTab(payload);
  return redirect(`/tracks/${newTab.trackId}/tabs/${newTab.id}`);
}

export function TabNew() {
  return (
    <div>
      <h1>Create New Tab (Smart Form)</h1>
      <Form
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <label>
          Artist Name:
          <input type="text" name="artistName" required />
        </label>
        <label>
          Release Title:
          <input type="text" name="releaseTitle" required />
        </label>
        <label>
          Track Title:
          <input type="text" name="trackTitle" required />
        </label>
        <label>
          Author (Your Name):
          <input type="text" name="author" required />
        </label>
        <label>
          Tab Content:
          <textarea
            name="content"
            rows={10}
            required
            style={{ fontFamily: "monospace", width: "100%" }}
          ></textarea>
        </label>
        <button type="submit">Save Tab</button>
      </Form>
    </div>
  );
}
