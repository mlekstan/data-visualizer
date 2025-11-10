import { Paper } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Loader } from '../-components/Loader';

export const Route = createFileRoute('/charts')({
  component: RouteComponent,
  pendingComponent: () => <Loader open={true} />
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
        minHeight: "400px",
        minWidth: "700px"
      }}
    >
      <Outlet />
    </Paper>
  );
}
