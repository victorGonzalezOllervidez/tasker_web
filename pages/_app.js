import '../styles/globals.css'
import Router from '../components/router';

function MyApp({ Component, pageProps }) {
  return <Router component={Component} {...pageProps} />
}

export default MyApp
