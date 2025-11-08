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
        height: "100%",
        display: "flex",
        minHeight: "400px"
      }}
    >
      <Outlet />
    </Paper>
  );
}
