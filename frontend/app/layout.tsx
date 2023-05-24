import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from './components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Notes app',
  description: 'Manage your notes with',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col gap-4 min-h-screen w-full p-4 justify-start items-center relative bg-stone-950 text-pink-50">
        <Header />
        {children}
      </body>
    </html>
  )
}
