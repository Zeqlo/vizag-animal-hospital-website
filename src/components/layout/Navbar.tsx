import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Dialog, DialogPanel } from "@headlessui/react"
import { Menu, X, PawPrint, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { clinicInfo } from "@/data/clinicInfo"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Grooming", path: "/grooming" },
  { name: "Pet Store", path: "/store" },
  { name: "Team", path: "/team" },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-3"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              scrolled ? "bg-ocean-700" : "bg-white/20 backdrop-blur-md"
            )}>
              <PawPrint className={cn("h-6 w-6", scrolled ? "text-white" : "text-white")} />
            </div>
            <div className="block">
              <span className={cn(
                "block font-heading font-bold text-base sm:text-lg leading-none",
                scrolled ? "text-slate-900" : "text-white"
              )}>
                Vizag Animal
              </span>
              <span className={cn(
                "block text-[10px] sm:text-xs",
                scrolled ? "text-slate-500" : "text-white/80"
              )}>
                Hospital &amp; Store
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  scrolled
                    ? isActive
                      ? "text-ocean-700 bg-ocean-50"
                      : "text-slate-700 hover:text-ocean-700 hover:bg-slate-50"
                    : isActive
                      ? "text-white bg-white/20"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${clinicInfo.phone}`}
              className={cn(
                "hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-colors",
                scrolled ? "text-coral-600 hover:text-coral-700" : "text-coral-300 hover:text-coral-200"
              )}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">{clinicInfo.phone}</span>
            </a>
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-coral-500 text-white text-xs sm:text-sm font-semibold hover:bg-coral-600 transition-all active:scale-95 shadow-md hover:shadow-lg"
            >
              Book
              <span className="hidden sm:inline">Appointment</span>
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <Dialog
            static
            open={mobileOpen}
            onClose={setMobileOpen}
            className="lg:hidden relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <div className="fixed inset-0 flex">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="ml-auto w-full max-w-sm h-full bg-white shadow-2xl overflow-y-auto"
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-ocean-700 flex items-center justify-center">
                      <PawPrint className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-heading font-bold text-slate-900">Vizag Animal Hospital</span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="px-3 py-4 space-y-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) => cn(
                        "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                        isActive
                          ? "text-ocean-700 bg-ocean-50"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                  <Link
                    to="/book-appointment"
                    className="mt-3 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-coral-500 text-white font-semibold hover:bg-coral-600 transition-colors"
                  >
                    Book Appointment
                  </Link>
                  <a
                    href={`tel:${clinicInfo.phone}`}
                    className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-coral-500 text-coral-600 font-semibold hover:bg-coral-50 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Call: {clinicInfo.phone}
                  </a>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}