import { Header, Modals } from '@/components';
import { ReduxProvider } from '@/redux/ReduxProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider> 
      <Header />
      <Component {...pageProps} />
      <Modals />
    </ReduxProvider>
  )
  ;
}
