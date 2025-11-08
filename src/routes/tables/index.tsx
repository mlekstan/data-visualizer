import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { DataTable } from './-components/DataTable';
import type { QuestionData } from '../../api/questions.get';

export const Route = createFileRoute('/tables/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useLoaderData({ from: "__root__"})

  return (
    <DataTable externalData={data as QuestionData[]} />
  );
}
