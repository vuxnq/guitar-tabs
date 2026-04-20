import { useLoaderData, Form, redirect, type LoaderFunctionArgs, type ActionFunctionArgs, } from "react-router";
import { Box, Typography, Paper, Button, TextField, Stack } from "@mui/material";
import { getTab, updateTab } from "../api/tabs";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.tabId) throw new Error("Missing tabId");
  return await getTab({ tabId: Number(params.tabId), include: true });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const payload = {
    id: Number(params.tabId),
    author: formData.get("author") as string,
    content: formData.get("content") as string,
  };

  await updateTab(payload);
  
  const trackId = formData.get("trackId") as string;
  return redirect(`/tracks/${trackId}/tabs/${params.tabId}`);
}

export function TabEdit() {
  const tab = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        edit tab
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Form method="PUT">
          {/* hidden field to pass trackId to the action for the redirect */}
          <input type="hidden" name="trackId" value={tab.trackId} />

          <Stack spacing={3}>
            {/* readonly context fields */}
            <TextField
              label="artist name"
              defaultValue={tab.track?.release?.artist?.name || ""}
              disabled
            />

            <TextField
              label="release title"
              defaultValue={tab.track?.release?.title || ""}
              disabled
            />

            <TextField
              label="track title"
              defaultValue={tab.track?.title || ""}
              disabled
            />

            {/* editable fields */}
            <TextField
              label="transcribed by"
              name="author"
              defaultValue={tab.author}
              required
            />

            <TextField
              label="tab content"
              name="content"
              defaultValue={tab.content}
              multiline
              minRows={15}
              required
              sx={{
                "& .MuiInputBase-input": {
                  whiteSpace: "pre", 
                  overflowX: "auto !important",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                }
              }}
            />

            <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => window.history.back()}
              >
                cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                size="large" 
              >
                update tab
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Paper>
    </Box>
  );
}
