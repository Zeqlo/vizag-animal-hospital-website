import { useState } from "react"
import { Link } from "react-router-dom"
import { Facebook, Instagram, Phone, MapPin, Clock, Heart } from "lucide-react"
import { clinicInfo } from "@/data/clinicInfo"
import { services as servicesStatic } from "@/data/services"

export function Footer() {
  const services = servicesStatic
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      })
      setSubscribed(true)
      setNewsletterEmail("")
    } catch {
      // silently ignore
    }
  }
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Grooming", path: "/grooming" },
    { name: "Book Appointment", path: "/book-appointment" },
    { name: "Team", path: "/team" },
    { name: "Gallery", path: "/gallery" },
    { name: "Pet Store", path: "/store" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ]

  const activeServices = services.filter((s) => !s.comingSoon)

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white ring-1 ring-slate-700 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Vizag Animal Hospital & Store logo"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div>
                <span className="block font-heading font-bold text-white text-lg leading-none">Vizag Animal</span>
                <span className="block text-xs text-slate-400">Hospital &amp; Store</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {clinicInfo.shortDescription}
            </p>
            <div className="flex gap-3">
              <a href={clinicInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-ocean-700 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={clinicInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-ocean-700 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-400 hover:text-coral-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {activeServices.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="text-sm text-slate-400 hover:text-coral-400 transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-ocean-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">{clinicInfo.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-ocean-400 flex-shrink-0" />
                <a href={`tel:${clinicInfo.phone}`} className="text-sm text-slate-400 hover:text-coral-400 transition-colors">{clinicInfo.phone}</a>
              </li>
              {clinicInfo.secondaryPhones.map((ph) => (
                <li key={ph} className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-ocean-400 flex-shrink-0 opacity-50" />
                  <a href={`tel:${ph}`} className="text-sm text-slate-400 hover:text-coral-400 transition-colors">{ph}</a>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-ocean-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-400">
                  <p>Mon–Sat: 9 AM – 9:30 PM</p>
                  <p>Sun: 9 AM – 5 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-semibold text-lg">Stay Updated</h3>
              <p className="text-sm text-slate-400 mt-1">Subscribe to our newsletter for pet care tips and clinic updates.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => { setNewsletterEmail(e.target.value); setSubscribed(false) }}
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-2 rounded-lg bg-slate-800 text-white text-sm border border-slate-700 focus:border-ocean-500 focus:outline-none placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-ocean-700 hover:bg-ocean-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
          {subscribed && (
            <p className="text-sm text-ocean-400 mt-3 font-medium">Subscribed!</p>
          )}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Vizag Animal Hospital &amp; Store. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 text-coral-500 fill-coral-500" /> in Visakhapatnam, India
          </p>
        </div>
      </div>
    </footer>
  )
}