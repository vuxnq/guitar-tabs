import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.tsx'
import './index.css'
import { Home } from './routes/Home.tsx'
import { Tabs, loader as tabsLoader } from './routes/Tabs.tsx'
import { TabDetail, loader as tabDetailLoader } from './routes/TabDetail.tsx'
import { TabEdit, loader as tabEditLoader } from './routes/TabEdit.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { TabNew, action as tabNewAction, loader as tabNewLoader } from './routes/TabNew.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorBoundary />,
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
            {
                path: 'tabs/new',
                element: <TabNew />,
                loader: tabNewLoader,
                action: tabNewAction,
            }
        ],
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} /> 
    </StrictMode>,
)
