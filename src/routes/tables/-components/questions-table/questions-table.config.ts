import { createColumnHelper } from "@tanstack/react-table";
import type { QuestionData } from "../../../../api/questions.get";

const columnHelper = createColumnHelper<QuestionData>()

export const columns = [
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
    filterFn: "equalsString",
  }),
  columnHelper.accessor(row => row.difficulty, {
    id: "difficulty",
    header: "Difficulty",
    cell: info => info.getValue(),
    footer: info => info.column.columnDef.id,
    filterFn: "equalsString",
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