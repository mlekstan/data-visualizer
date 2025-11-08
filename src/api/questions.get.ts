export type QuestionData = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

type ResponseBody = {
  response_code: number,
  results: QuestionData[],
}

export async function getQuestions(): Promise<ResponseBody> {

  const response = await fetch("https://opentdb.com/api.php?amount=50&encode=base64", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      `Error occured while fething data: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();

}



export function decode(data: Record<string, unknown>): Record<string, unknown> {
  const decodedData: Record<string, unknown> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "string") {
      decodedData[key] = atob(value);
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      decodedData[key] = decode(value as Record<string, unknown>);
    } else if (
      Array.isArray(value)
    ){
      // in case of table
      decodedData[key] = value.map((item) => atob(item));
    }
  });

  return decodedData;
}