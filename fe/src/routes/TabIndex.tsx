import { Typography, Box, Paper } from "@mui/material";

export function TabIndex() {
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography align="center">
          select tab version on the left side
        </Typography>
      </Box>
    </Paper>
  );
}
