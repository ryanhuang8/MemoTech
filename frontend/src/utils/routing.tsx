import { createBrowserRouter } from 'react-router-dom';
import Root from '../layout/RootLayout';
import Start from '../pages/Start';
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
                path: "flashcard",
                element: <Card />,
            }
        ]
    }
])