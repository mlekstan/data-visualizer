import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import type { QuestionData } from "../../../api/questions.get";



const columnHelper = createColumnHelper<QuestionData>()

const columns = [
  columnHelper.accessor(row => row.question, {
    id: "question",
    header: "Question",
    cell: info => info.getValue(),
    footer: info => info.column.columnDef.id,
  }),
  columnHelper.accessor(row => row.category, {
    id: "category",
    header: "Category",
    cell: info => info.getValue(),
    footer: info => info.column.columnDef.id,
  }),
  columnHelper.accessor(row => row.difficulty, {
    id: "difficulty",
    header: "Difficulty",
    cell: info => info.getValue(),
    footer: info => info.column.columnDef.id,
  }),
  columnHelper.accessor(row => row.type, {
    id: "type",
    header: "Type",
    cell: info => info.getValue(),
    footer: info => info.column.columnDef.id,
  }),
  columnHelper.accessor(row => row.correct_answer, {
    id: "correctAnswer",
    header: "Correct answer",
    cell: info => info.getValue(),
    footer: info => info.column.columnDef.id,
  }),
  columnHelper.accessor(row => row.incorrect_answers, {
    id: "incorrectAnswers",
    header: "Incorrect answers",
    cell: info => {
      let result = "";
      const answers = info.getValue();
      answers.forEach((ans, idx) => {
        result += (idx === answers.length - 1) ? ans : `${ans}, `;
      });

      return result;
    },
    footer: info => info.column.columnDef.id,
  }),
]

export function DataTable({ externalData }: { externalData: QuestionData[] }) {
  const [data, setData] = useState(externalData)

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableContainer sx={{height: "auto", maxHeight: "100%" }}>
      <Table stickyHeader>
        <TableHead>
          {
            table.getHeaderGroups().map(group => (
              <TableRow key={group.id}>
                {
                  group.headers.map(header => (
                    <TableCell key={header.id}>
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

      </Table>
    </TableContainer>
  );
}