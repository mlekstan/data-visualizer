import { Box } from "@mui/material";
import ClippedDrawer from "./NavBar";
import { Workspace } from "./Workspace";

export function App() {

  return (
    <Box 
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "100px auto",
        gridTemplateAreas: `
          "navbar"
          "workspace"
        `,
        backgroundColor: "background.default"
      }}
    >
      <ClippedDrawer />
      <Workspace />
      {/* <SideBar /> */}
    </Box>
  );
}
