import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  const location = useLocation()

  return (
    <>
      <Header />
      <div className="page-transition" key={location.pathname}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout
