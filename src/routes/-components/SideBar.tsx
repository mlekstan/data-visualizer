import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChartsIcon from '@mui/icons-material/DataExplorationSharp';
import SettingsIcon from '@mui/icons-material/SettingsSharp';

const drawerWidth = 240;
const listItems = [
  {
    name: "Charts",
    icon: ChartsIcon,
  },
  {
    name: "Settings",
    icon: SettingsIcon,
  },
]

export function SideBar() {

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {listItems.map((item, index) => (
            <>
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
              <Divider />          
            </>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}