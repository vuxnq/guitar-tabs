import { useLoaderData } from "react-router";
import { Typography, Box } from "@mui/material";
import { ArtistCard } from "../components/cards/ArtistCard";
import { getArtists } from "../api/artists";

export async function loader() {
  return await getArtists();
}

export function Artists() {
  const artists = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        artists
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {artists.map((artist) => (
          <ArtistCard id={artist.id} name={artist.name} />
        ))}
      </Box>
    </Box>
  );
}
