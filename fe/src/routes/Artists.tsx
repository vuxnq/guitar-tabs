import { useLoaderData, Link } from "react-router";
import { Typography, Box, Card, CardContent, CardActionArea } from "@mui/material";
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
        {artists.map((tab) => (
          <Card key={tab.id} sx={{ display: 'flex' }}>
            <CardActionArea component={Link} to={`/artists/${tab.id}`}>
              <CardContent sx={{ pb: 1 }}>
                <Typography variant="h6" component="div" align="center">
                  {tab.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
