import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WeatherChance App',
  description: 'WeatherChance is an open-source application that can predict whether the tomorrows weather of particular queried location/city will be good or bad',
  icons: [{ rel: "icon", url: "/favicon.ico" }]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
