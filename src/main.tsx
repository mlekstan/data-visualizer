import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createRouter, RouterProvider, createHashHistory } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const hashHistory = createHashHistory();

export const router = createRouter({
  routeTree,
  history: hashHistory
});


const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} basepath="/data-visualizer" />
    </StrictMode>
  )
}
