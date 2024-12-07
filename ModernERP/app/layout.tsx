import './globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from './components/Sidebar'
import { TopNav } from './components/TopNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Modern ERP',
  description: 'Advanced Enterprise Resource Planning for modern businesses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-accent/10 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

