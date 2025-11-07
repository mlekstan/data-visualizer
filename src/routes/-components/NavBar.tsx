import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import pathAppLogoLight from "./../../assets/data-visualizer-logo-light.png";
import { Box, Button, IconButton, List } from '@mui/material';
import type { ExtendedLinkOptions } from '../../types';
import { useNavigate } from '@tanstack/react-router';
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
          <img src={pathAppLogoLight} height={80} />
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
                  onClick={() => navigate({ to: option.to })}
                  variant="text"
                  sx={{
                    color: "secondary.contrastText"
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
              onClick={() => setThemeMode("dark")}
              sx={{
                color: "secondary.contrastText"
              }}
            >
              <DarkModeIcon />
            </IconButton> 
            :
            <IconButton 
              onClick={() => setThemeMode("light")}
              sx={{
                color: "secondary.contrastText"
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
