import { Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"

import Home from "@/pages/Home"
import About from "@/pages/About"
import Services from "@/pages/Services"
import ServiceDetail from "@/pages/ServiceDetail"
import Store from "@/pages/Store"
import Grooming from "@/pages/Grooming"
import BookAppointment from "@/pages/BookAppointment"
import Team from "@/pages/Team"
import Gallery from "@/pages/Gallery"
import Testimonials from "@/pages/Testimonials"
import Blog from "@/pages/Blog"
import BlogDetail from "@/pages/BlogDetail"
import FAQ from "@/pages/FAQ"
import Contact from "@/pages/Contact"
import NotFound from "@/pages/NotFound"
import Admin from "@/pages/Admin"

function App() {
  const location = useLocation()

  return (
      <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/store" element={<Store />} />
          <Route path="/grooming" element={<Grooming />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App