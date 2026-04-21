import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router";

export function NotFound() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 12 }}>
        <Typography
          variant="h1"
          sx={{ fontWeight: 900, color: "text.primary" }}
        >
          404.
        </Typography>

        <Typography
          variant="h4"
          color="text.secondary"
          sx={{ fontWeight: "bold" }}
        >
          page not found.
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 6 }}>
          the artist, release, track or tab you are looking for doesn't exist,
          has been deleted, or the url is incorrect.
        </Typography>

        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/"
          disableElevation
          sx={{ fontWeight: "bold", px: 4, py: 2 }}
        >
          go back home
        </Button>
      </Box>
    </Container>
  );
}
