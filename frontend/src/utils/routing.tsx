import { createBrowserRouter } from 'react-router-dom';
import Root from '../layout/RootLayout';
import Start from '../pages/Start';
import ImportFiles from '../pages/ImportFiles';
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
                path: "import",
                element: <Start />
            },
            {
                path: "flashcard",
                element: <Card />,
            }
        ]
    }
])