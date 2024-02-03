import { createBrowserRouter } from 'react-router-dom';
import Root from '../layout/RootLayout';
import Start from '../pages/Start';
import ImportFiles from '../pages/ImportFiles';
import Card from '../pages/Card';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Start />,
            },
            {
                path: "import_files",
                element: <ImportFiles />,
            },
            {
                path: "flashcard",
                element: <Card />,
            }
        ]
    }
])