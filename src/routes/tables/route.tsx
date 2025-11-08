import { Paper } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/tables')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Paper 
      elevation={10}
      sx={{
        padding: 5,
        maxHeight: "100%",
        display: "flex"
      }}
    >
      <Outlet />
    </Paper>
  );
}
