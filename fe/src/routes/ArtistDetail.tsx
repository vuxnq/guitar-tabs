import { useEffect, useState } from "react";
import { useLoaderData, Link, useLocation, type LoaderFunctionArgs } from "react-router";
import { Typography, Box, Card, CardContent, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import { Masonry } from "@mui/lab";
import { getArtist } from "../api/artists";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.artistId) throw new Error("Missing artistId");
  return await getArtist({ artistId: Number(params.artistId), include: true });
}

export function ArtistDetail() {
  const artist = useLoaderData<Awaited<ReturnType<typeof loader>>>();
  const location = useLocation();
  
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const element = document.getElementById(targetId);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setHighlightedId(targetId);
          setTimeout(() => { setHighlightedId(null); }, 2000); 
        }, 100); 
      }
    }
  }, [location.hash, artist.releases]);

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
        {artist.name}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
        discography
      </Typography>

      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {artist.releases.map((release) => {
          const cardId = `release-${release.id}`;
          const isHighlighted = highlightedId === cardId;

          return (
            <Card key={release.id} id={cardId}
              sx={{
                bgcolor: isHighlighted ? 'action.selected' : '',
                transition: 'background-color .5s ease-in-out',
              }}
            >
              <CardContent sx={{ pb: 2 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {release.title}
                </Typography>
              </CardContent>

              <Divider />

              <List disablePadding>
              {release.tracks.map((track) => (
                <ListItem key={track.id} disablePadding>
                  <ListItemButton component={Link} to={`/tracks/${track.id}`}>
                    <ListItemText primary={`${track.title}`} />
                  </ListItemButton>
                </ListItem>
              ))}
              </List>
            </Card>
          );
        })}
      </Masonry>
    </Box>
  );
}
