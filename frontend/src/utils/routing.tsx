import { createBrowserRouter } from 'react-router-dom';
import Root from '../layout/RootLayout';
import CreateFlashcards from '../pages/CreateFlashcards';
import StartPage from '../pages/StartPage';
import Card from '../pages/Card';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <StartPage />,
            },
            {
                path: "create-flashcards",
                element: <CreateFlashcards />
            },
            {
                path: "flashcard",
                element: <Card />,
            }
        ]
    }
])