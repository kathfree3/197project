// package imports
import React from 'react'
import SSRProvider from 'react-bootstrap/SSRProvider'

// local imports
import Layout from '../components/layout'

// style
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// put the nav bar at the top of every page using layout component
function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  )
}

export default MyApp
