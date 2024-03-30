import { Outlet } from 'react-router-dom';
import { ScrollToTop } from '../ScrollToTop';
import { Navbar } from '../Navbar';
import Footer from '../Footer';

export default function Layout() {
    return (
        <>
            <ScrollToTop />
            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
}
