import React from 'react' // package imports
import NavBar from './NavBar' // local import

const Layout = ({ children }) => (
  <>
    <NavBar />
    <main>{children}</main>
  </>
)

export default Layout
