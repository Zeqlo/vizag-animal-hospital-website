import type { ReactNode } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { ScrollToTop } from "./ScrollToTop"
import { ScrollToTopButton } from "@/components/common/ScrollToTopButton"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}