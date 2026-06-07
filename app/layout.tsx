import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'
import { CommandMenu } from '@/components/search/CommandMenu'
import { getSearchIndex } from '@/lib/content'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME ?? 'OpsForge',
    template: `%s | OpsForge`,
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? 'Production-ready guides, templates, and infrastructure documentation.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#08090a',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchItems = getSearchIndex()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
        {/* Plausible Analytics — set NEXT_PUBLIC_PLAUSIBLE_DOMAIN in .env.local */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        {/* Umami Analytics — set NEXT_PUBLIC_UMAMI_ID in .env.local */}
        {process.env.NEXT_PUBLIC_UMAMI_ID && (
          <Script
            defer
            src="https://analytics.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <CommandMenu items={searchItems} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
