import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import { Link } from "react-router";

export function Home() {
  return (
    <Box sx={{ my: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          textAlign: "center",
          mb: 6,
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 900, mb: 2 }}>
          guitar tabs.
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: "600px", fontWeight: 400 }}
        >
          community-driven database for your favorite guitar tablatures
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/tabs/new"
            disableElevation
            sx={{ fontWeight: "bold", px: 4, py: 2 }}
          >
            contribute a tab
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/artists"
            sx={{ fontWeight: "bold", px: 4, py: 2 }}
          >
            browse artists
          </Button>
        </Stack>
      </Box>

      <Stack spacing={3}>
        <Paper sx={{ p: 4 }} variant="outlined">
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            smart organization
          </Typography>
          <Typography>
            to keep the data clean and avoid the duplicate mess, we categorize
            everything logically in our database.
          </Typography>
        </Paper>

        <Paper sx={{ p: 4 }} variant="outlined">
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            painless contributions
          </Typography>
          <Typography sx={{ mb: 2 }}>
            instead of forcing you to click through multiple pages to add an
            artist, then an album, then a track, our smart form handles it all
            in one go.
          </Typography>
          <Typography>
            just start typing. we use cascading autocomplete to instantly link
            your tab to existing metadata, or seamlessly create missing entities
            in the background.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
}
