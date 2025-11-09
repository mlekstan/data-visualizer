import { createFileRoute, useLoaderData, useSearch } from '@tanstack/react-router'
import { QuestionsTable } from './-components/questions-table/QuestionsTable';
import { SearchInput } from './-components/SearchInput';
import { Box } from '@mui/material';
import { columns } from './-components/questions-table/questions-table.config';
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useRef, useState } from 'react';


export const Route = createFileRoute('/tables/')({
  component: RouteComponent,
});


function RouteComponent() {
  const { data } = useLoaderData({ from: "__root__"});
  const searchParams = Route.useSearch();
  const { current: pageSizes } = useRef([10, 25, 50]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSizes[0]
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    }
  });


  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "100%",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <Box
        sx={{
          paddingBottom: 4,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <SearchInput 
          placeholder="Search..." 
          onChange={(e) => 
            table.setGlobalFilter(e.target.value.toString())
          }
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          minHeight: 0
        }}
      >
        <QuestionsTable table={table} pageSizes={pageSizes} />
      </Box>
      
    </Box>
  );
}
