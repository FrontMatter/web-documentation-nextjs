import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../locale/localization';
import { useMobileNavigationStore } from '../components/Navigation/MobileNavigation';
import { Router } from 'next/router';
import Script from 'next/script';

export const runtime = "experimental-edge";

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('hashChangeStart', onRouteChange)
Router.events.on('routeChangeComplete', onRouteChange)
Router.events.on('routeChangeError', onRouteChange)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js" />
    </>
  )
}

export default MyApp
