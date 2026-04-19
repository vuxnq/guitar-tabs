import { useState, useEffect } from "react";
import { Form, redirect, useLoaderData, useLocation, type ActionFunctionArgs } from "react-router";
import { Box, Typography, Paper, Button, TextField, Autocomplete, Stack } from "@mui/material";
import { createTab } from "../api/tabs";
import { getArtists } from "../api/artists";
import { getReleases } from "../api/releases";
import { getTracks } from "../api/tracks";
import type { Release, Track } from "../types";

export async function loader() {
  const artists = await getArtists();
  return { artists };
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
  const { artists } = useLoaderData<typeof loader>();

  const location = useLocation();
  const navState = location.state as { 
    artistName?: string; 
    releaseTitle?: string; 
    trackTitle?: string; 
  } | null;

  const [artistName, setArtistName] = useState(navState?.artistName || "");
  const [releaseTitle, setReleaseTitle] = useState(navState?.releaseTitle || "");
  const [trackTitle, setTrackTitle] = useState(navState?.trackTitle || "");

  const [releases, setReleases] = useState<Release[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  // artist change - fetch releases
  useEffect(() => {
    if (!artistName.trim()) { setReleases([]); return; }
    
    const matchedArtist = artists.find(
      (a) => a.name.toLowerCase() === artistName.trim().toLowerCase()
    );

    if (matchedArtist) {
      getReleases({ artistId: matchedArtist.id }).then(setReleases);
    } else {
      setReleases([]);
    }
  }, [artistName, artists]);

  // release change - fetch tracks
  useEffect(() => {
    if (!releaseTitle.trim()) { setTracks([]); return; }

    const matchedRelease = releases.find(
      (r) => r.title.toLowerCase() === releaseTitle.trim().toLowerCase()
    );

    if (matchedRelease) {
      getTracks({ releaseId: matchedRelease.id }).then(setTracks);
    } else {
      setTracks([]);
    }
  }, [releaseTitle, releases]);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        new tab
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Form method="POST">
          <Stack spacing={3}>
            <Autocomplete
              freeSolo
              options={artists.map((a) => a.name)}
              inputValue={artistName}
              onInputChange={(_, newValue) => setArtistName(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="artist name" name="artistName" required />
              )}
            />

            <Autocomplete
              freeSolo
              options={releases.map((r) => r.title)}
              inputValue={releaseTitle}
              onInputChange={(_, newValue) => setReleaseTitle(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="release title" name="releaseTitle" required />
              )}
            />

            <Autocomplete
              freeSolo
              options={tracks.map((t) => t.title)}
              inputValue={trackTitle}
              onInputChange={(_, newValue) => setTrackTitle(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="track title" name="trackTitle" required />
              )}
            />

            <TextField
              label="transcribed by (your name)"
              name="author"
              required
            />

            <TextField
              label="tab content"
              name="content"
              multiline
              rows={15}
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

            <Button 
              type="submit" 
              variant="contained" 
              size="large" 
            >
              save tab
            </Button>
          </Stack>
        </Form>
      </Paper>
    </Box>
  );
}
