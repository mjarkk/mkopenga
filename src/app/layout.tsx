import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mark Kopenga\'s website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Handlee&family=Lato&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
