import type { ReactNode } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { ScrollToTop } from "./ScrollToTop"
import { ScrollToTopButton } from "@/components/common/ScrollToTopButton"
import { MobileBottomBar } from "@/components/common/MobileBottomBar"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen pb-[100px] sm:pb-0">
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
      <MobileBottomBar />
    </>
  )
}