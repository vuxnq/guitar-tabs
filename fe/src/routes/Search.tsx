import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Typography, Box } from "@mui/material";
import { Masonry } from "@mui/lab";
import { ArtistCard } from "../components/cards/ArtistCard";
import { ReleaseCard } from "../components/cards/ReleaseCard";
import { TrackCard } from "../components/cards/TrackCard";
import { TabCard } from "../components/cards/TabCard";
import { globalSearch } from "../api/search";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const results = await globalSearch(q);
  return { q, results };
}

export function Search() {
  const { q, results } = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  const artists = results.filter((r) => r.type === "artist");
  const releases = results.filter((r) => r.type === "release");
  const tracks = results.filter((r) => r.type === "track");
  const tabs = results.filter((r) => r.type === "tab");

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        search results {q && `for "${q}"`}
      </Typography>

      {results.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          no results found. try searching for a different artist, track, or tab.
        </Typography>
      )}

      {/* artists */}
      {artists.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            artists
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {artists.map((artist) => (
              <ArtistCard id={artist.id} name={artist.name!} />
            ))}
          </Box>
        </Box>
      )}

      {/* releases */}
      {releases.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            releases
          </Typography>
          <Masonry columns={{ sm: 2, md: 3, lg: 4 }} spacing={2}>
            {releases.map((release) => (
              <ReleaseCard key={`release-${release.id}`}
                id={release.id}
                artistId={release.parentId!}
                title={release.title!}
                artistName={release.artistName!}
              />
            ))}
          </Masonry>
        </Box>
      )}

      {/* tracks */}
      {tracks.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            tracks
          </Typography>
          <Masonry columns={{ sm: 2, md: 3, lg: 4 }} spacing={2}>
            {tracks.map((track) => (
              <TrackCard key={`track-${track.id}`}
                id={track.id}
                title={track.title!}
                releaseTitle={track.releaseTitle!}
                artistName={track.artistName!}
              />
            ))}
          </Masonry>
        </Box>
      )}

      {/* tabs */}
      {tabs.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            tabs
          </Typography>
          <Masonry columns={{ sm: 2, md: 3, lg: 4 }} spacing={2}>
            {tabs.map((tab) => (
              <TabCard key={`tab-${tab.id}`}
                id={tab.id}
                trackId={tab.parentId!}
                trackTitle={tab.trackTitle!}
                artistName={tab.artistName!}
                author={tab.author!}
              />
            ))}
          </Masonry>
        </Box>
      )}

    </Box>
  );
}
