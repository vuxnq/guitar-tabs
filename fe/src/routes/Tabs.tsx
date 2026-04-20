import { useLoaderData } from "react-router";
import { Typography, Box } from "@mui/material";
import { Masonry } from "@mui/lab";
import { getTabs } from "../api/tabs";
import { TabCard } from "../components/cards/TabCard";

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
          <TabCard key={tab.id}
            id={tab.id}
            trackId={tab.trackId}
            trackTitle={tab.track?.title}
            artistName={tab.track?.release?.artist?.name}
            author={tab.author}
          />
        ))}
      </Masonry>
    </Box>
  );
}
