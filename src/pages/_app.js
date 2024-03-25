import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../components/Layout'
import '../styles/globals.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from 'next-auth/react'
import wrapper from '../store';

const queryClient = new QueryClient()

export function App({ Component, pageProps }) {
  const { session } = pageProps
  return (

    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </SessionProvider>
    </QueryClientProvider>

  )
}

export default wrapper.withRedux(App);
