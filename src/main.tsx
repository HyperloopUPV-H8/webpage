import React from 'react'
import ReactDOM from 'react-dom/client'
import './sass/app.scss'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AboutPage, ContactPage, LandingPage, PartnersPage, TeamPage } from './pages'
import { Layout } from './layout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <LandingPage />,
        index: true,
      },
      {
        element: <AboutPage />,
        path: "/about",
      },
      {
        element: <ContactPage />,
        path: "/contact",
      },
      {
        element: <TeamPage />,
        path: "/team",
      },
      {
        element: <PartnersPage />,
        path: "/partners"
      },
      {
        element: <Navigate to="/" />,
        path: "*"
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
