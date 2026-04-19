import { useLoaderData, Link } from "react-router";
import { Typography, Box, Card, CardContent, CardActionArea } from "@mui/material";
import { Masonry } from "@mui/lab";
import { getTabs } from "../api/tabs";

export async function loader() {
  return await getTabs({ include: true });
}

export function Tabs() {
  const tabs = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        all tabs
      </Typography>

      <Masonry columns={{ sm: 2, md: 3, lg: 4 }} spacing={2}>
        {tabs.map((tab) => (
          <Card key={tab.id}>
            <CardActionArea component={Link} to={`/tracks/${tab.trackId}/tabs/${tab.id}`}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', lineHeight: 1.2, mb: 0.5 }}>
                  {tab.track?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  by {tab.track?.release?.artist?.name}
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block' }}>
                  transcribed by {tab.author}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Masonry>
    </Box>
  );
}
