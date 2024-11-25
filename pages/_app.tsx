import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { Layout } from '../components/Layout/Layout';
import { GuidelinesProvider } from '../contexts/GuidelinesContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <GuidelinesProvider>
      <Head>
        <title>Tim, Jen and James's Christmas 2024 Planning</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </GuidelinesProvider>
    </MantineProvider>
  );
}
