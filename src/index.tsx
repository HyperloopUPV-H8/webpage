import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/app.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import PartnersPage from './pages/PartnersPage';
import TimelinePage from './pages/TimelinePage';
import { DashboardPage } from './pages/DashboardPage';
import ResearchPage from './pages/ResearchPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <LandingPage />,
                index: true,
            },
            {
                element: <AboutPage />,
                path: '/about',
            },
            {
                element: <ContactPage />,
                path: '/contact',
            },
            {
                element: <TeamPage />,
                path: '/team',
            },
            {
                element: <PartnersPage />,
                path: '/partners',
            },
            {
                element: <TimelinePage />,
                path: '/timeline',
            },
            {
                element: <ResearchPage />,
                path: '/research',
            },
        ],
    },
    {
        path: '/dashboard',
        element: <DashboardPage />,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
