import { createRootRoute } from '@tanstack/react-router'
import { App } from './-components/App'
import { CssBaseline } from '@mui/material';
import { ThemeModeProvider } from '../providers/ThemeModeProvider';
import { Loader } from './-components/Loader';
import { decode, getQuestions, type QuestionData } from '../api/questions.get';



export const Route = createRootRoute({
  component: RootComponent,
  loader: async () => {
    const body = await getQuestions();
    const encodedData = body.results.map(questionData => decode(questionData));

    return { data: encodedData } as { data: QuestionData[] };
  },
  pendingComponent: () => <Loader open={true} />
})

function RootComponent() {
  
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <App />
    </ThemeModeProvider>
  );
}
