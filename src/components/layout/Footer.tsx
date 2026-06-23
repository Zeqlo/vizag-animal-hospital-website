import { Link } from "react-router-dom"
import { PawPrint, Facebook, Instagram, Phone, Mail, MapPin, Clock, Heart } from "lucide-react"
import { clinicInfo } from "@/data/clinicInfo"
import { services } from "@/data/services"

export function Footer() {
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
              <div className="w-10 h-10 rounded-xl bg-ocean-700 flex items-center justify-center">
                <PawPrint className="h-6 w-6 text-white" />
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
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-ocean-400 flex-shrink-0" />
                <a href={`mailto:${clinicInfo.email}`} className="text-sm text-slate-400 hover:text-coral-400 transition-colors">{clinicInfo.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-ocean-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-400">
                  <p>Mon–Sat: 9 AM – 9:30 PM</p>
                  <p>Sun: 9 AM – 5 PM</p>
                  <p className="text-coral-400 font-semibold mt-1">Emergency: 24/7 Online Consultation</p>
                </div>
              </li>
            </ul>
          </div>
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