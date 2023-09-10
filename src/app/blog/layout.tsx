import Link from 'next/link'
import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mark Kopenga\'s blog',
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..800,0..1,0..1,0..1&display=swap" rel="stylesheet" />
            </head>
            <body style={{ maxWidth: '1500px' }}>
                <Link href="/">Home</Link>
                {children}
            </body>
        </html>
    )
}
