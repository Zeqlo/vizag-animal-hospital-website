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
      <section className="relative bg-gradient-to-br from-ocean-900 via-ocean-700 to-coral-500 py-20 sm:py-28 overflow-hidden">
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-5 text-balance">
              Grooming &amp; Spa Services
            </h1>
            <p className="text-lg sm:text-xl text-ocean-100 leading-relaxed">
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
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-4">
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
      <section className="relative bg-gradient-to-br from-ocean-900 via-ocean-700 to-coral-500 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
              Book a Grooming Appointment
            </h2>
            <p className="text-lg text-ocean-100 max-w-2xl mx-auto mb-8">
              Give your pet the pampering they deserve. Schedule a grooming
              session with our experienced team today.
            </p>
            <Link to="/book-appointment">
              <Button variant="accent" size="lg">
                <Calendar className="h-5 w-5" />
                Book an Appointment
              </Button>
            </Link>
            <Link to="/services" className="inline-block mt-4 ml-4">
              <Button variant="outline-white" size="lg">
                View All Services
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  )
}