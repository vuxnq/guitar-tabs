import { Typography, Box, Paper } from "@mui/material";

export function TabIndex() {
  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography align="center">select tab version from the menu</Typography>
      </Box>
    </Paper>
  );
}
