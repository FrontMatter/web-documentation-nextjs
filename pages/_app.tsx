import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../locale/localization';
import { useMobileNavigationStore } from '../components/Navigation/MobileNavigation';
import { Router } from 'next/router';

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('hashChangeStart', onRouteChange)
Router.events.on('routeChangeComplete', onRouteChange)
Router.events.on('routeChangeError', onRouteChange)

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
