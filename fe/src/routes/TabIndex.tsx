import { Typography, Box, Paper, Button, Stack } from "@mui/material";

export function TabIndex() {
  return (
    <Paper sx={{ p: 2 }}>
      <Box minHeight={200} spacing={2} alignItems="center">
        <Typography align="center" variant="body" component="h3">
          select tab version on the left side
        </Typography>
      </Box>
    </Paper>
  );
}
