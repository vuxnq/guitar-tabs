import {
  useLoaderData,
  Link,
  NavLink,
  Outlet,
  type LoaderFunctionArgs,
} from "react-router";
import {
  Typography,
  Box,
  List,
  Paper,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { getTrack } from "../api/tracks";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.trackId) throw new Error("Missing trackId");
  return await getTrack({ trackId: Number(params.trackId), include: true });
}

export function TrackDetail() {
  const track = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        {track.title} by {track.release.artist?.name} from {track.release.title}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "250px 1fr" },
          gap: 2,
          alignItems: "start",
        }}
      >
        <Box sx={{ position: { md: "sticky" }, top: 80 }}>
          <Button
            variant="contained"
            fullWidth
            component={Link}
            to="/tabs/new"
            state={{
              artistName: track.release.artist?.name,
              releaseTitle: track.release.title,
              trackTitle: track.title,
            }}
            sx={{ mb: 2 }}
          >
            new tab
          </Button>

          <Paper sx={{ maxHeight: "70vh", overflow: "auto" }}>
            <List disablePadding>
              {track.tabs?.map((tab, index) => (
                <ListItem key={tab.id} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={`tabs/${tab.id}`}
                    sx={{
                      "&.active": {
                        bgcolor: "action.selected",
                        borderLeft: 4,
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <ListItemText
                      primary={`#${index + 1}`}
                      secondary={`${tab.author}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
