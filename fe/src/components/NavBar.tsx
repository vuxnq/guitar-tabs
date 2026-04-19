import { Link } from "react-router";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { SearchBar } from "./SearchBar";

export function NavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* left side */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'inherit',
              letterSpacing: 1,
              mr: 2
            }}
          >
            guitar tabs
          </Typography>

          <Button color="inherit" component={Link} to="/artists">artists</Button>
          <Button color="inherit" component={Link} to="/tabs">tabs</Button>
        </Box>

        {/* middle */}
        <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
          <SearchBar />
        </Box>

        {/* right side */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" component={Link} to="/tabs/new" disableElevation>new tab</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
