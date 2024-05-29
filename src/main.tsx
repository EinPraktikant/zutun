import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppPage from './App.tsx'
import DetailsPage from './Details.tsx'
import ErrorPage from './Error.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/details/:title",
    element: <DetailsPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
