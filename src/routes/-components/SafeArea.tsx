import { Box } from "@mui/material";
import type { ReactNode } from "react";


export function SafeArea({ children }: { children: ReactNode }) {
  
  return (
    <Box
      sx={{
        padding: 7,
        height: "100%",
      }}
    >
      { children }
    </Box>
  );
}