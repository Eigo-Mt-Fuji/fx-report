import '../styles/globals.css'
import type { AppProps } from 'next/app';

import '../components/layout.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../components/neumorphism.css';
import {GoogleAnalytics} from '../components/gtag';
import usePageView from '../hooks/use-page-view';

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  return <>
    <GoogleAnalytics />
    <Component {...pageProps} />
  </>
}

export default MyApp;

