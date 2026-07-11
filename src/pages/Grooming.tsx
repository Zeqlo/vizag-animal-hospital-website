import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import {
  Scissors,
  Sparkles,
  PawPrint,
  Calendar,
  CheckCircle,
  ArrowRight,
  IndianRupee,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Container } from "@/components/ui/Container"
import { Section } from "@/components/ui/Section"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Badge } from "@/components/ui/Badge"

const groomingServices = [
  {
    icon: Scissors,
    title: "Grooming & Spa",
    description: "Full-service grooming including breed-specific haircuts, medicated baths, ear cleaning, and spa treatments for a stress-free, relaxing experience.",
    features: [
      "Breed-specific haircuts",
      "Medicated & de-tick baths",
      "Ear cleaning",
      "Teeth brushing",
      "Anal gland expression",
      "Spa treatments for relaxation",
    ],
  },
  {
    icon: PawPrint,
    title: "Nail Care",
    description: "Professional nail trimming and filing to keep your pet's paws healthy and comfortable. Overgrown nails can cause pain and posture issues.",
    features: [
      "Professional nail trimming",
      "Nail filing & smoothing",
      "Paw pad inspection",
      "Cuticle care",
      "Guidance on at-home nail maintenance",
    ],
  },
  {
    icon: Sparkles,
    title: "Skin Care & Management",
    description: "Comprehensive skin care including diagnosis and treatment for allergies, infections, hot spots, and coat health. We combine medical treatment with grooming for long-term results.",
    features: [
      "Skin condition diagnosis & treatment",
      "Allergy management",
      "Hot spot treatment",
      "Fungal & bacterial infection care",
      "Coat health evaluation",
      "Medicated baths for skin conditions",
    ],
  },
]

const groomingPackages = [
  {
    name: "Hair Cut",
    icon: Scissors,
    small: 1100,
    medium: 1300,
    large: 1600,
    highlight: false,
  },
  {
    name: "Bathing",
    icon: Sparkles,
    small: 500,
    medium: 600,
    large: 900,
    highlight: false,
  },
  {
    name: "Hair Cut + Bathing (Combo)",
    icon: PawPrint,
    small: 1600,
    medium: 1900,
    large: 2500,
    highlight: false,
  },
]

const addOnServices = [
  { name: "Nail Cut", icon: PawPrint, price: 200 },
  { name: "Nail Cut + Trimming", icon: Scissors, price: 300 },
  { name: "Ear Cleaning", icon: Sparkles, price: 200 },
  { name: "Infection Ear Cleaning", icon: Sparkles, price: 300 },
]

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Grooming() {
  return (
    <>
      <Helmet>
        <title>Grooming & Spa | Vizag Animal Hospital</title>
        <meta
          name="description"
          content="Professional pet grooming, spa, nail care, and skin care management at Vizag Animal Hospital in Visakhapatnam. Breed-specific haircuts, medicated baths, and skin treatments."
        />
      </Helmet>

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-ocean-900 via-ocean-700 to-coral-500 py-16 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-coral-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-ocean-400 rounded-full blur-3xl" />
        </div>
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="coral" className="mb-4 bg-white/15 text-white">
              <Scissors className="h-3 w-3" /> Pamper Your Pet
            </Badge>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-5 text-balance">
              Grooming &amp; Spa Services
            </h1>
            <p className="text-base sm:text-xl text-ocean-100 leading-relaxed">
              Professional grooming, nail care, and skin care management to keep
              your pet looking and feeling their best. Gentle, stress-free, and
              tailored to your pet's needs.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Grooming Services */}
      <Section bg="white">
        <Container>
          <SectionTitle
            eyebrow="Our Grooming Services"
            title="Complete Care for Skin, Nails & Coat"
            subtitle="From breed-specific haircuts to specialized skin treatments, we offer a full range of grooming services for your beloved pet."
          />
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {groomingServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div key={index} variants={itemFade}>
                  <Card hover className="p-6 h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-coral-50 text-coral-500 mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold font-heading text-slate-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle className="h-4 w-4 text-ocean-700 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Grooming Pricing */}
      <Section bg="white">
        <Container>
          <SectionTitle
            eyebrow="Grooming Pricing"
            title="Service Packages & Pricing"
            subtitle="Transparent pricing for all grooming services. Package prices vary by breed size — small, medium, or large. All prices in Indian Rupees (Rs)."
          />

          {/* Package Pricing Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile: card layout */}
            <div className="sm:hidden space-y-4">
              {groomingPackages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border border-slate-200 p-4 ${pkg.highlight ? "bg-coral-50/40 border-coral-200" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 ${pkg.highlight ? "bg-coral-100 text-coral-600" : "bg-ocean-50 text-ocean-700"}`}>
                      <pkg.icon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{pkg.name}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-50 rounded-lg py-2">
                      <p className="text-[10px] text-slate-500 uppercase">Small</p>
                      <p className="text-sm font-bold text-slate-900">Rs {pkg.small}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg py-2">
                      <p className="text-[10px] text-slate-500 uppercase">Medium</p>
                      <p className="text-sm font-bold text-slate-900">Rs {pkg.medium}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg py-2">
                      <p className="text-[10px] text-slate-500 uppercase">Large</p>
                      <p className="text-sm font-bold text-slate-900">Rs {pkg.large}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: table layout */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-4 px-4 text-sm font-bold font-heading text-slate-900">
                      Package
                    </th>
                    <th className="py-4 px-4 text-center text-sm font-bold font-heading text-ocean-700">
                      Small Breed
                    </th>
                    <th className="py-4 px-4 text-center text-sm font-bold font-heading text-ocean-700">
                      Medium Breed
                    </th>
                    <th className="py-4 px-4 text-center text-sm font-bold font-heading text-ocean-700">
                      Large Breed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groomingPackages.map((pkg, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-slate-100 transition-colors hover:bg-ocean-50/50 ${
                        pkg.highlight ? "bg-coral-50/40" : ""
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                            pkg.highlight ? "bg-coral-100 text-coral-600" : "bg-ocean-50 text-ocean-700"
                          }`}>
                            <pkg.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{pkg.name}</p>
                            {pkg.highlight && (
                              <span className="text-xs font-medium text-coral-600">Best Value</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-bold text-slate-900">Rs {pkg.small}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-bold text-slate-900">Rs {pkg.medium}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-bold text-slate-900">Rs {pkg.large}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              * Prices may vary based on coat condition, matting, and specific breed requirements.
            </p>
          </motion.div>

          {/* Add-On Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-coral-50 text-coral-500">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900">Add-On Services</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Optional add-ons available with any grooming package. Flat rate for all breed sizes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {addOnServices.map((addon, idx) => (
                <Card key={idx} hover className="p-5 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-ocean-50 text-ocean-700 mb-3">
                    <addon.icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">{addon.name}</h4>
                  <div className="flex items-center justify-center gap-1">
                    <IndianRupee className="h-4 w-4 text-coral-500" />
                    <span className="text-xl font-bold text-slate-900">{addon.price}</span>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Why Grooming Matters */}
      <Section bg="slate">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-coral-500 mb-3">
                Why It Matters
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-slate-900 mb-4">
                Grooming Is Essential for Your Pet's Health
              </h2>
              <p className="text-slate-600 mb-4">
                Regular grooming is more than just making your pet look good — it's
                an essential part of their overall health and wellbeing. Grooming
                helps detect skin issues, parasites, lumps, and infections early,
                before they become serious problems.
              </p>
              <p className="text-slate-600 mb-6">
                Our grooming services are performed by experienced professionals
                who understand pet behavior and use premium, pet-safe products.
                We ensure a calm, stress-free environment so your pet enjoys the
                experience as much as the results.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-ocean-700" />
                  <span className="text-sm font-medium">Pet-safe products</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-ocean-700" />
                  <span className="text-sm font-medium">Stress-free environment</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle className="h-5 w-5 text-ocean-700" />
                  <span className="text-sm font-medium">Experienced groomers</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1591946614720-90b49d81f3bd?w=600&h=400&fit=crop"
                alt="Pet grooming at Vizag Animal Hospital"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* CTA: Book an Appointment */}
      <section className="relative bg-gradient-to-br from-ocean-900 via-ocean-700 to-coral-500 py-16 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
              Book a Grooming Appointment
            </h2>
            <p className="text-base sm:text-lg text-ocean-100 max-w-2xl mx-auto mb-8">
              Give your pet the pampering they deserve. Schedule a grooming
              session with our experienced team today.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link to="/book-appointment" className="w-full sm:w-auto">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  <Calendar className="h-5 w-5" />
                  Book an Appointment
                </Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button variant="outline-white" size="lg" className="w-full sm:w-auto">
                  View All Services
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}