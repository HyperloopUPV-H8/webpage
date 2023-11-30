import { Outlet } from "react-router-dom"
import { Navbar } from "../layout"
import { Footer } from "./Footer"

export const Layout = () => {
  return (
    <>
      <Navbar />

      <Outlet />
      
      <Footer />
    </>
  )
}
