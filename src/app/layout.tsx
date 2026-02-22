export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export const metadata = {
  title: 'Secure Site',
  description: '',
  generator: '',
  applicationName: '',
  referrer: 'no-referrer',
  keywords: [],
  authors: [],
  creator: '',
  publisher: '',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no, email=no, address=no" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}