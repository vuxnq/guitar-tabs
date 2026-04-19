import { useLoaderData, Form, Link as RouterLink, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { Typography, Box, Paper, Button, Stack } from "@mui/material";
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
    <Paper>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
          Author: {tab.author}
        </Typography>
        <Button variant="outlined" size="small" component={RouterLink} to={`/tabs/${tab.id}/edit`}>
          edit
        </Button>
        <Form method="DELETE">
          <Button type="submit" variant="outlined" color="error" size="small">
            delete
          </Button>
        </Form>
      </Stack>

      <Box component="pre" sx={{ 
        overflowX: "scroll", 
        fontFamily: "monospace", 
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1
      }}>
        {tab.content}
      </Box>
    </Paper>
  );
}
