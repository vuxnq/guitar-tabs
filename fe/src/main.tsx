import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.tsx'
import './index.css'
import { Home } from './routes/Home.tsx'
import { Tabs, loader as tabsLoader } from './routes/Tabs.tsx'
import { TabDetail, loader as tabDetailLoader } from './routes/TabDetail.tsx'
import { TabEdit, loader as tabEditLoader } from './routes/TabEdit.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'tabs',
                element: <Tabs />,
                loader: tabsLoader,
            },
            {
                path: 'tabs/:tabId',
                element: <TabDetail />,
                loader: tabDetailLoader,
            },
            {
                path: 'tabs/:tabId/edit',
                element: <TabEdit />,
                loader: tabEditLoader,
            },
        ],
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} /> 
    </StrictMode>,
)
