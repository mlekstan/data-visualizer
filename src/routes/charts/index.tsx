import { createFileRoute } from '@tanstack/react-router'
import { Loader } from '../-components/Loader'

export const Route = createFileRoute('/charts/')({
  component: RouteComponent,
  loader: async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=50", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Error occured while fething data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    console.log(data)
  },
  pendingComponent: () => <Loader open={true} />
})

function RouteComponent() {
  return (
    <Loader open={true} />
  );
}
