import { useLoaderData, Link, NavLink, Outlet, type LoaderFunctionArgs } from "react-router";
import { Typography, Box, List, Paper, ListItem, ListItemButton, ListItemText, Button } from "@mui/material";
import { getTrack } from "../api/tracks";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.trackId) throw new Error("Missing trackId");
  return await getTrack({ trackId: Number(params.trackId), include: true });
}

export function TrackDetail() {
  const track = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        {track.title} by {track.release.artist.name} from {track.release.title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'flex-start' }}>
        <Box sx={{ width: { xs: 1, md: 1/5 }, flexShrink: 0, maxHeight: "80vh", overflow: 'auto', }}>
          <Button 
            variant="contained" 
            fullWidth 
            component={Link} 
            to="/tabs/new"
            sx={{ mb: 2 }}
          >
            new tab
          </Button>

          <Paper>
            <List disablePadding>
              {track.tabs?.map((tab, index) => (
                <ListItem key={tab.id} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={`tabs/${tab.id}`}
                    sx={{ "&.active": { bgcolor: "action.selected", borderLeft: 4, borderColor: "primary.main" } }}
                  >
                    <ListItemText primary={`#${index + 1}`} secondary={`${tab.author}`} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
