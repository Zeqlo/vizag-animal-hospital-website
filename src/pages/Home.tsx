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
  Star,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { Section } from "@/components/ui/Section"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { ServiceCard } from "@/components/common/ServiceCard"
import { TestimonialCard } from "@/components/common/TestimonialCard"
import { ProductCard } from "@/components/common/ProductCard"
import { services as servicesStatic, type Service } from "@/data/services"
import { testimonials } from "@/data/testimonials"
import { clinicInfo } from "@/data/clinicInfo"
import { products } from "@/data/products"
import { useApiData } from "@/hooks/useApiData"

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
  const { data: services } = useApiData("/api/services", servicesStatic)
  const featuredProducts = products.slice(0, 4)
  const topTestimonials = testimonials.slice(0, 3)
  const topServices = services.filter((s) => s.featured).slice(0, 5)

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
      <section className="relative min-h-[520px] sm:min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden">
        {/* Dog + Cat split background */}
        <div className="absolute inset-0 flex flex-col sm:flex-row">
          <div className="relative w-full h-1/2 sm:w-1/2 sm:h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900&h=900&fit=crop"
              alt="Happy beagle dog at Vizag Animal Hospital"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-slate-900/40"></div>
          </div>
          <div className="relative w-full h-1/2 sm:w-1/2 sm:h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&h=900&fit=crop"
              alt="Friendly cat at Vizag Animal Hospital"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-slate-900/40"></div>
          </div>
        </div>

        {/* Centered dark overlay so text reads cleanly over both photos */}
        <div className="absolute inset-0 bg-slate-950/60 sm:bg-gradient-to-r sm:from-slate-950/80 sm:via-slate-900/60 sm:to-slate-950/80"></div>

        <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-coral-500/90 text-white rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm"
            >
              <PawPrint className="h-4 w-4" />
              {clinicInfo.tagline}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-white leading-[1.1] drop-shadow-lg break-words"
            >
              {clinicInfo.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 sm:mt-6 text-base sm:text-xl text-white/95 max-w-xl drop-shadow-md break-words"
            >
              {clinicInfo.shortDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link to="/book-appointment" className="w-full sm:w-auto">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button variant="outline-white" size="lg" className="w-full sm:w-auto">
                  Explore Services
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a href={`tel:${clinicInfo.phone.replace(/\s/g, "")}`} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <Phone className="h-5 w-5" />
                  <span className="sm:hidden">Call Now</span>
                  <span className="hidden sm:inline">Call {clinicInfo.phone}</span>
                </Button>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
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
              className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 text-white/90"
            >
              <div className="flex items-center gap-2">
                <PawPrint className="h-5 w-5" />
                <span className="text-xs sm:text-sm font-medium">Pet Store Onsite</span>
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

      {/* Google Reviews */}
      <Section bg="slate">
        <Container>
          <SectionTitle
            eyebrow="Google Reviews"
            title="What Pet Parents Say"
            subtitle="Rated 4.9 stars by 372 pet parents on Google. Here are a few of their stories."
          />
          {/* Rating summary bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-lg font-semibold text-slate-900">4.9</span>
              <span className="text-sm text-slate-500">(372 Google reviews)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTestimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="text-xs text-slate-400">Powered by</span>
            <span className="text-sm font-medium text-slate-700">
              <span className="font-semibold">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-amber-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </span>
            </span>
            <a
              href="https://www.google.com/maps/place/Vizag+Animal+Hospital+%26+Store/@17.8035434,83.3616168,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-ocean-600 hover:text-ocean-700 transition-colors"
            >
              View all reviews
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
              Book Your Pet's Appointment Today
            </h2>
            <p className="text-base sm:text-lg text-ocean-100 max-w-2xl mx-auto mb-8">
              Give your furry friend the care they deserve. Schedule a visit with our expert veterinary team.
            </p>
            <Link to="/book-appointment" className="inline-block">
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