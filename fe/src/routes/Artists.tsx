import { useLoaderData, Link } from "react-router";
import { Typography, Box, Card, CardContent, CardActionArea, CardMedia } from "@mui/material";
import { Masonry } from "@mui/lab";
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

      <Masonry columns={{ xs: 1, sm: 2, md: 4, lg: 5 }} spacing={2}>
        {artists.map((artist) => (
          <Card key={artist.id}>
            <CardActionArea component={Link} to={`/artists/${artist.id}`}>
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="h6" component="div" align="center">
                  {artist.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Masonry>
    </Box>
  );
}
