import { createRootRoute } from '@tanstack/react-router'
import { App } from './-components/App'
import { CssBaseline } from '@mui/material';
import { ThemeModeProvider } from '../providers/ThemeModeProvider';


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <App />
    </ThemeModeProvider>
  );
}
