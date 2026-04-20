import { useState } from "react";
import { useLoaderData, useSubmit, Link, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { Typography, Paper, Button, Stack } from "@mui/material";
import { TabContent } from "../components/TabContent";
import { ConfirmDialog } from "../components/ConfirmDialog";
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
  const submit = useSubmit();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    setDialogOpen(false);
    submit(null, { method: "DELETE" });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h2">
            transcribed by {tab.author}
          </Typography>
          <Typography>
            created: {new Date(tab.createdAt).toLocaleString()}
          </Typography>
        </Stack>
        <Button variant="outlined" component={Link} to={`/tabs/${tab.id}/edit`}>
          edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setDialogOpen(true)}
        >
          delete
        </Button>
      </Stack>

      <TabContent content={tab.content} />

      <ConfirmDialog
        open={dialogOpen}
        title="delete tab"
        description="are you sure you want to delete this tab? this action cannot be undone."
        onCancel={() => setDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </Paper>
  );
}
