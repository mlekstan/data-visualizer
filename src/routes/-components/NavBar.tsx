import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import pathAppLogoLight from "./../../assets/data-visualizer-logo-light.png";
import { Box, Button, IconButton } from '@mui/material';
import type { ExtendedLinkOptions } from '../../types';
import { useLocation, useNavigate } from '@tanstack/react-router';
import LightModeIcon from '@mui/icons-material/LightModeSharp';
import DarkModeIcon from '@mui/icons-material/DarkModeSharp';
import { useThemeModeContext } from '../../hooks/useThemeContext';


const navOptions: ExtendedLinkOptions[] = [
  {
    name: "Tables",
    to: "/tables",
  },
  {
    name: "Charts",
    to: "/charts",
  },
]

export default function NavBar() {
  const {mode: themeMode, setMode: setThemeMode} = useThemeModeContext();
  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname
  });


  return (
    <>
      <AppBar 
        position="static"
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          gridArea: "navbar",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        <Toolbar variant="regular">
          <img 
            src={pathAppLogoLight} 
            height={80} onClick={() => navigate({ to: "/" })} 
            style={{ cursor: "pointer" }} 
          />
          <Box
            sx={{
              height: "100%",
              marginLeft: "24px"
            }}
          >
            {
              navOptions.map((option, idx) => (
                <Button
                  key={idx}
                  size="large"
                  onClick={() => navigate({ to: option.to })}
                  variant="text"
                  sx={{
                    color: "secondary.contrastText",
                    backgroundColor: (option.to === pathname) ? "primary.dark" : ""
                  }}
                >
                  { option.name }
                </Button>
              ))
            }
          </Box>
          {
            (themeMode === "light") 
            ?
            <IconButton 
              size="large"
              onClick={() => setThemeMode("dark")}
              sx={{
                color: "secondary.contrastText",
                marginLeft: 1
              }}
            >
              <DarkModeIcon />
            </IconButton> 
            :
            <IconButton
              size="large"
              onClick={() => setThemeMode("light")}
              sx={{
                color: "secondary.contrastText",
                marginLeft: 1
              }}
            >
              <LightModeIcon />
            </IconButton>
          }
        </Toolbar>
      </AppBar>
    </>
  );
}
