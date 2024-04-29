import "~/styles/globals.css"

import { Lexend_Deca, Gaegu } from "next/font/google"

import { TRPCReactProvider } from "~/trpc/react"
import Head from "next/head"

const gaegu = Gaegu({
  subsets: ["latin"],
  variable: "--font-comic",
  weight: ["400", "700"],
})
const lexend = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: {
    default: "spidey.ai - enjoyable learning",
    template: "%s - spidey.ai",
  },
  description: "enjoyable learning",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e23a3a" />
        <meta name="apple-mobile-web-app-title" content="spidey.ai" />
        <meta name="application-name" content="spidey.ai" />
        <meta name="msapplication-TileColor" content="#e23a3a" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className={`font-sans ${lexend.variable} ${gaegu.variable}`}>
        <nav className="fixed flex w-full flex-row items-center justify-center border-b-2 border-dashed border-black p-4">
          <img src="/logo.svg" width={256} height={256} alt="spidey logo" />
        </nav>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  )
}
