import { useLoaderData, Link, type LoaderFunctionArgs } from "react-router";
import { Typography, Box, Card, CardContent, CardMedia, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import { Masonry } from "@mui/lab";
import { getArtist } from "../api/artists";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.artistId) throw new Error("Missing artistId");
  return await getArtist({ artistId: Number(params.artistId), include: true });
}

export function ArtistDetail() {
  const artist = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
        {artist.name}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        discography 
      </Typography>

      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {artist.releases.map((release) => (
          <Card key={release.id}>
            <CardContent sx={{ pb: 1 }}>
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
        ))}
      </Masonry>
    </Box>
  );
}
