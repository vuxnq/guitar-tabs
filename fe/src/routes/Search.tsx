import { useLoaderData, Link, type LoaderFunctionArgs } from "react-router";
import { Typography, Box, Card, CardContent, CardActionArea, Divider } from "@mui/material";
import { Masonry } from "@mui/lab";
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
            {artists.map((tab) => (
              <Card key={tab.id} sx={{ display: 'flex' }}>
                <CardActionArea component={Link} to={`/artists/${tab.id}`}>
                  <CardContent sx={{ pb: 2 }}>
                    <Typography variant="h6" component="div" align="center">
                      {tab.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
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
              <Card key={`release-${release.id}`}>
                <CardActionArea component={Link} to={`/artists/${release.parentId}#release-${release.id}`}>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {release.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      by {release.artistName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
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
              <Card key={`track-${track.id}`}>
                <CardActionArea component={Link} to={`/tracks/${track.id}`}>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {track.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      from {track.releaseTitle}
                    </Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ display: 'block' }}>
                      by {track.artistName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
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
              <Card key={`tab-${tab.id}`}>
                <CardActionArea component={Link} to={`/tracks/${tab.parentId}/tabs/${tab.id}`}>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {tab.trackTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      by {tab.artistName}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block' }}>
                      transcribed by {tab.author}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Masonry>
        </Box>
      )}

    </Box>
  );
}
