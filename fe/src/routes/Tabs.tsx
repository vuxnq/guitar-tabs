import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Typography, Box } from "@mui/material";
import { Masonry } from "@mui/lab";
import { getTabs } from "../api/tabs";
import { TabCard } from "../components/cards/TabCard";
import { Pagination } from "../components/Pagination";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  return await getTabs({ include: true, page });
}

export function Tabs() {
  const response = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        all tabs
      </Typography>

      <Masonry columns={{ sm: 2, md: 3, lg: 4 }} spacing={2}>
        {response.data.map((tab) => (
          <TabCard
            key={tab.id}
            id={tab.id}
            trackId={tab.trackId}
            trackTitle={tab.track?.title}
            artistName={tab.track?.release?.artist?.name}
            author={tab.author}
          />
        ))}
      </Masonry>
      <Pagination
        totalPages={response.meta.totalPages}
        currentPage={response.meta.page}
      />
    </Box>
  );
}
