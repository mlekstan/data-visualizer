import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tables')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tables"!</div>
}
