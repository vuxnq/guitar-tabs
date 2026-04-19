import { Link } from "react-router";
import { AppBar, Button, Box, Typography, Container } from "@mui/material";
import { SearchBar } from "./SearchBar";

export function NavBar() {
  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ borderBottom: 1, borderColor: 'divider', py: 2, }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: 2 
          }}
        >
          {/* logo */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{ fontWeight: 800, textDecoration: 'none', color: 'text.primary' }}
          >
            guitar tabs
          </Typography>

          {/* links, button */}
          <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
            <Button color="inherit" sx={{ color: 'text.secondary' }} component={Link} to="/artists"> artists </Button>
            <Button color="inherit" sx={{ color: 'text.secondary' }} component={Link} to="/tabs"> tabs </Button>
            <Button variant="contained" component={Link} to="/tabs/new" disableElevation> new tab </Button>
          </Box>
        </Box>

        {/* search */}
        {/* TODO: only display this in smaller screen */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Box sx={{ width: '100%', maxWidth: '700px' }}>
            <SearchBar />
          </Box>
        </Box>

      </Container>
    </AppBar>
  );
}
