import { Backdrop, CircularProgress } from "@mui/material";


type LoaderProps = {
  open: boolean;
}

export function Loader({ open,  }: LoaderProps) {

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} 
      open={open}
    >
      <CircularProgress
        size={50}
      />
    </Backdrop>
  );
}