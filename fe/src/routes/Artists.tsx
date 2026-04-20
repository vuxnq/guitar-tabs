import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Typography, Box } from "@mui/material";
import { ArtistCard } from "../components/cards/ArtistCard";
import { getArtists } from "../api/artists";
import { Pagination } from "../components/Pagination";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  return await getArtists({ page });
}

export function Artists() {
  const response = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        artists
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {response.data.map((artist) => (
          <ArtistCard key={artist.id} id={artist.id} name={artist.name} />
        ))}
      </Box>
      <Pagination 
        totalPages={response.meta.totalPages} 
        currentPage={response.meta.page} 
      />
    </Box>
  );
}
