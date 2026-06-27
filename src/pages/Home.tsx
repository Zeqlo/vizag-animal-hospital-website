import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import {
  Award,
  Activity,
  PawPrint,
  Shield,
  Heart,
  ArrowRight,
  Calendar,
  Stethoscope,
  Phone,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { Section } from "@/components/ui/Section"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { ServiceCard } from "@/components/common/ServiceCard"
import { TestimonialCard } from "@/components/common/TestimonialCard"
import { GoogleReviews } from "@/components/common/GoogleReviews"
import { ProductCard } from "@/components/common/ProductCard"
import { featuredServices } from "@/data/services"
import { testimonials } from "@/data/testimonials"
import { clinicInfo } from "@/data/clinicInfo"
import { products } from "@/data/products"

const whyChooseUs = [
  {
    icon: Award,
    title: "Experienced Vets",
    description: "Our team has over a decade of experience treating all kinds of pets and conditions.",
  },
  {
    icon: Activity,
    title: "Modern Equipment",
    description: "State-of-the-art diagnostic and surgical equipment for accurate, effective treatment.",
  },
  {
    icon: Stethoscope,
    title: "Modern Facility",
    description: "A clean, well-equipped clinic with modern examination rooms, surgical suites, and diagnostics for the best care.",
  },
  {
    icon: PawPrint,
    title: "Pet Store",
    description: "A fully stocked pet store with premium food, accessories, toys, and supplements.",
  },
  {
    icon: Shield,
    title: "Affordable Pricing",
    description: "Quality veterinary care at fair, transparent prices with no hidden charges.",
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We treat every pet as if they were our own — with love, patience, and empathy.",
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

// WhatsApp number digits only for wa.me link
const whatsappNumber = "919014176278"

export default function Home() {
  const featuredProducts = products.slice(0, 4)
  const topTestimonials = testimonials.slice(0, 3)
  const topServices = featuredServices.slice(0, 5)

  return (
    <>
      <Helmet>
        <title>Vizag Animal Hospital & Store | Visakhapatnam</title>
        <meta
          name="description"
          content="Vizag Animal Hospital & Store is a full-service veterinary hospital and pet store in Visakhapatnam (Vizag) offering expert pet care, surgery, diagnostics, grooming, and quality pet products."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-ocean-900 via-ocean-700 to-coral-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1576201836106-db1758fd1c3e?w=1200&h=800&fit=crop"
            alt="Veterinarian caring for a pet"
            className="w-full h-full object-cover"
          />
        </div>
        <Container className="relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-semibold mb-6"
            >
              <PawPrint className="h-4 w-4" />
              {clinicInfo.tagline}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight"
            >
              {clinicInfo.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-ocean-100 max-w-2xl"
            >
              {clinicInfo.shortDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link to="/book-appointment">
                <Button variant="accent" size="lg">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline-white" size="lg">
                  Explore Services
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Phone + WhatsApp CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 flex flex-col sm:flex-row gap-4"
            >
              <a href={`tel:${clinicInfo.phone.replace(/\s/g, "")}`}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <Phone className="h-5 w-5" />
                  Call {clinicInfo.phone}
                </Button>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline-white"
                  size="lg"
                  className="w-full sm:w-auto !border-green-500 !text-green-50 hover:!bg-green-500 hover:!text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center gap-6 text-white/90"
            >
              <div className="flex items-center gap-2">
                <PawPrint className="h-5 w-5" />
                <span className="text-sm font-medium">Pet Store Onsite</span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Featured Services */}
      <Section bg="white">
        <Container>
          <SectionTitle
            eyebrow="Our Services"
            title="Featured Veterinary Services"
            subtitle="From routine checkups to advanced surgery, we provide comprehensive care for your beloved pets."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topServices.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="secondary" size="lg">
                View All Services
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section bg="slate">
        <Container>
          <SectionTitle
            eyebrow="Why Choose Us"
            title="Committed to Excellence in Pet Care"
            subtitle="We combine expertise, modern technology, and genuine compassion to give your pets the best possible care."
          />
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  variants={itemFade}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-ocean-50 text-ocean-700 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section bg="slate">
        <Container>
          <SectionTitle
            eyebrow="Testimonials"
            title="What Pet Parents Say"
            subtitle="Real stories from real clients who trust us with their furry family members."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTestimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Google Reviews */}
      <Section bg="slate">
        <Container>
          <SectionTitle
            eyebrow="Reviews"
            title="What People Say"
            subtitle="See what clients are saying about Vizag Animal Hospital on Google."
          />
          <GoogleReviews />
        </Container>
      </Section>

      {/* Pet Store Highlight */}
      <Section bg="white">
        <Container>
          <SectionTitle
            eyebrow="Pet Store"
            title="Shop Quality Pet Products"
            subtitle="Premium pet food, accessories, toys, and supplements — all available at our in-house pet store."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/store">
              <Button variant="primary" size="lg">
                Visit Pet Store
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
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
              Book Your Pet's Appointment Today
            </h2>
            <p className="text-lg text-ocean-100 max-w-2xl mx-auto mb-8">
              Give your furry friend the care they deserve. Schedule a visit with our expert veterinary team.
            </p>
            <Link to="/book-appointment">
              <Button variant="accent" size="lg">
                <Calendar className="h-5 w-5" />
                Book Appointment
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  )
}