import { Outlet } from "react-router";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { CssBaseline, Container, Box, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({ palette: { mode: "dark" } });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
