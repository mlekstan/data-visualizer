import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";


export function Workspace() {

  return (
    <Box
      sx={{
        height: "100%",
        padding: 10,
        gridArea: "workspace"
      }}
    >
      <Outlet />
    </Box>

  );
}