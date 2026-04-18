import { Outlet } from "react-router";
import { NavBar } from "./components/NavBar";
import { CssBaseline, Container, ThemeProvider, createTheme } from "@mui/material";

export default function App() {
  const theme = createTheme({ palette: { mode: "dark" } });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <NavBar />
        <Container>
          <Outlet />
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}
