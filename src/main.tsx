import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppPage from './App.tsx'
import { DetailsPage, loader as detailsLoader } from './Details.tsx'
import ErrorPage from './Error.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppPage />,
    children: [
      {
        path: "details/:id",
        element: <DetailsPage />,
        loader: detailsLoader
      }
    ],
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
