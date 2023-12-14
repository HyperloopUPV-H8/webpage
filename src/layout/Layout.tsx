import { Outlet } from "react-router-dom"
import { Navbar, Footer, ScrollToTop } from "../layout"

export const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Outlet />
      
      <Footer />
    </>
  )
}
