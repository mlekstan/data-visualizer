import { Box } from "@mui/material";
import { Workspace } from "./Workspace";
import { SafeArea } from "./SafeArea";
import { Outlet } from "@tanstack/react-router";
import NavBar from "./NavBar";

export function App() {

  return (
    <Box 
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "100%",
        gridTemplateRows: "100px 1fr",
        gridTemplateAreas: `
          "navbar"
          "workspace"
        `,
        backgroundColor: "background.default"
      }}
    >
      <NavBar />
      <Workspace>
        <SafeArea>
          <Outlet />
        </SafeArea>
      </Workspace>
      {/* <SideBar /> */}
    </Box>
  );
}
