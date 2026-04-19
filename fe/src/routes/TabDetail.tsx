import { useLoaderData, Form, Link, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { Typography, Box, Paper, Button, Stack } from "@mui/material";
import { TabContent } from "../components/TabContent";
import { getTab, deleteTab } from "../api/tabs";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.tabId) throw new Error("Missing tabId");
  return await getTab({ tabId: Number(params.tabId), include: true });
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method === "DELETE") {
    const status = await deleteTab({ tabId: Number(params.tabId), cleanup: true });
    
    if (status.deletedArtist) { return redirect("/") }
    if (status.deletedTrack || status.deletedRelease) {
      return redirect(`/artists/${status.artistId}`);
    }
    return redirect(".."); 
  }
  return null;
}

export function TabDetail() {
  const tab = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
          transcribed by {tab.author}
        </Typography>
        <Button variant="outlined" component={Link} to={`/tabs/${tab.id}/edit`}>
          edit
        </Button>
        <Form method="DELETE">
          <Button type="submit" variant="outlined" color="error">
            delete
          </Button>
        </Form>
      </Stack>

      <TabContent content={tab.content} />
    </Paper>
  );
}
