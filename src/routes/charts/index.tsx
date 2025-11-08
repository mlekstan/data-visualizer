import { createFileRoute } from '@tanstack/react-router'
import { Loader } from '../-components/Loader'

export const Route = createFileRoute('/charts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Loader open={true} />
  );
}
