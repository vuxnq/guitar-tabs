import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { Box, Typography, Button, Paper, Container, ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({ palette: { mode: "dark" } });

export function ErrorBoundary() {
  const error = useRouteError();
  
  let title = "oops! something broke.";
  let message = "an unexpected error occurred while trying to load this page.";
  let technicalDetails = "";

  if (isRouteErrorResponse(error)) {
    title = `${error.status}. ${error.statusText}`;
    message = error.data?.message || message;
  } else if (error instanceof Error) {
    technicalDetails = error.stack || error.message;
  } else {
    technicalDetails = JSON.stringify(error, null, 2);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 900, mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            {message}
          </Typography>
          <Box sx={{ mb: 6 }}>
            <Button variant="contained" size="large" component={Link} to="/" disableElevation sx={{ fontWeight: 'bold', px: 4, py: 2 }}>
              go back home
            </Button>
          </Box>
          {technicalDetails && (
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>technical details:</Typography>
              <Box component="pre" sx={{ m: 0, p: 2, bgcolor: 'action.hover', overflowX: 'auto', fontSize: '0.85rem', color: 'text.secondary' }}>
                {technicalDetails}
              </Box>
            </Paper>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
