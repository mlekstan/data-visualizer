import { Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { flexRender, type Table } from "@tanstack/react-table";
import type { QuestionData } from "../../../../api/questions.get";

type QuestionsTableProps = {
  table: Table<QuestionData>;
  pageSizes: number[];
}


export function QuestionsTable({ table, pageSizes }: QuestionsTableProps) {
  const pagination = table.getState().pagination;

  return (
    <Paper sx={{ display: "flex", flexDirection: "column", width: "100%", flex: 1 }}>
      <TableContainer sx={{ maxHeight: "100%", flex: 1 }}>
        <MuiTable stickyHeader>
          <TableHead>
            {
              table.getHeaderGroups().map(group => (
                <TableRow key={group.id}>
                  {
                    group.headers.map(header => (
                      <TableCell key={header.id} align="center">
                        {
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        }
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableHead>
          <TableBody>
            {
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {
                    row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        }
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>

        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={pageSizes}
        component="div"
        count={table.getRowCount()}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={(_, page) => 
          table.setPageIndex(page)
        }
        onRowsPerPageChange={(e) => 
          table.setPagination({
            pageIndex: 0,
            pageSize: +e.target.value
          })
        }
      />
    </Paper>
  );
}