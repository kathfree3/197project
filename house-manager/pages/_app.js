import '../styles/globals.css'
import SSRProvider from 'react-bootstrap/SSRProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Layout >
        <Component {...pageProps} />
      </ Layout>
    </SSRProvider>
  )
}

export default MyApp
