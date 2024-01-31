import React from 'react'
import ReactDOM from 'react-dom/client'
import './sass/app.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AboutPage, ContactPage, ErrorPage, LandingPage, PartnersPage, TeamPage, TimelinePage } from './pages'
import { Layout } from './layout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
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
        path: "/partners",
      },
      {
        element: <TimelinePage />,
        path: "/timeline",
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
    />
  </React.StrictMode>,
)
