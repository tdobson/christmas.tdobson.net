import '@mantine/core/styles.css';
import type { ReactNode } from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { Providers } from './providers';
import { LayoutClient } from '../components/Layout/LayoutClient';

export const metadata = {
  title: 'Christmas 2026 - Tim, Jen & James',
  description: 'Christmas gift lists and schedule for our family',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.webp" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Providers>
            <LayoutClient>
              {children}
            </LayoutClient>
          </Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
