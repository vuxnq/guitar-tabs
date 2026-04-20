import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{ borderTop: 1, borderColor: "divider", py: 4 }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          guitar tabs.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          community-driven database for tablatures
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          <MuiLink component={Link} to="/" color="primary" underline="hover">
            home
          </MuiLink>
          <MuiLink
            component={Link}
            to="/artists"
            color="primary"
            underline="hover"
          >
            browse artists
          </MuiLink>
          <MuiLink
            href="https://github.com/vsb-vaj/2026s-project-tra0163-tra0164"
            target="_blank"
            color="primary"
            underline="hover"
          >
            source code
          </MuiLink>
        </Box>

        <Typography variant="caption">
          (c) {new Date().getFullYear()} guitar tabs. built for academic
          purposes
        </Typography>
      </Container>
    </Box>
  );
}
