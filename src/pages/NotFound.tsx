import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Home, PawPrint, Search } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Vizag Animal Hospital</title>
      </Helmet>

      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-ocean-50 via-white to-coral-50 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-xl mx-auto"
          >
            {/* Floating paw prints */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-5xl sm:text-6xl mb-6"
            >
              🐾
            </motion.div>

            {/* Large 404 */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-7xl sm:text-8xl lg:text-9xl font-bold font-heading bg-gradient-to-r from-ocean-700 to-coral-500 bg-clip-text text-transparent mb-4"
            >
              404
            </motion.h1>

            {/* Lost pet emoji */}
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-4xl sm:text-5xl mb-6"
            >
              🐱
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mb-3">
              Oops! Page Not Found
            </h2>
            <p className="text-slate-600 mb-8 text-base sm:text-lg">
              This page seems to have wandered off like a curious cat. Let's help you find your way back home!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button variant="primary" size="lg">
                  <Home className="h-5 w-5" />
                  Go Home
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  <PawPrint className="h-5 w-5" />
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Helpful links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t border-slate-200"
            >
              <p className="text-sm text-slate-500 mb-4 flex items-center justify-center gap-1.5">
                <Search className="h-4 w-4" />
                Or try one of these pages:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { label: 'Services', path: '/services' },
                  { label: 'Book Appointment', path: '/book-appointment' },
                  { label: 'Blog', path: '/blog' },
                  { label: 'FAQ', path: '/faq' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:border-ocean-300 hover:text-ocean-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}