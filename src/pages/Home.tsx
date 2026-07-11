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
      <section className="relative overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center py-10 sm:py-16 lg:py-20 pb-36 sm:pb-16 lg:pb-20">
            {/* Text content */}
            <div className="order-2 lg:order-1">
              <div className="sm:bg-white/95 sm:backdrop-blur-sm sm:rounded-3xl sm:p-8 lg:p-10 sm:shadow-xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-coral-500 text-white rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm"
                >
                  <PawPrint className="h-4 w-4" />
                  {clinicInfo.tagline}
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-slate-900 leading-[1.1] break-words"
                >
                  {clinicInfo.name}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 max-w-xl break-words"
                >
                  {clinicInfo.shortDescription}
                </motion.p>

                {/* Desktop CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="hidden sm:flex mt-6 sm:mt-8 flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <Link to="/book-appointment" className="w-full sm:w-auto">
                    <Button variant="accent" size="lg" className="w-full sm:w-auto">
                      <Calendar className="h-5 w-5" />
                      Book Appointment
                    </Button>
                  </Link>
                  <Link to="/services" className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      Our Services
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="hidden sm:flex mt-3 sm:mt-4 flex-row gap-3"
                >
                  <a href={`tel:${clinicInfo.phone.replace(/\s/g, "")}`} className="flex-1 sm:flex-none">
                    <Button variant="primary" size="md" className="w-full">
                      <Phone className="h-4 w-4" />
                      Call {clinicInfo.phone}
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none"
                  >
                    <Button
                      variant="outline-white"
                      size="md"
                      className="w-full !border-green-600 !text-green-700 hover:!bg-green-600 hover:!text-white"
                    >
                      <MessageCircle className="h-4 w-4 !text-green-600 hover:!text-white" />
                      WhatsApp Us
                    </Button>
                  </a>
                </motion.div>

                {/* Mobile CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex sm:hidden mt-6 flex-col gap-3"
                >
                  <Link to="/book-appointment" className="w-full">
                    <Button variant="accent" size="lg" className="w-full shadow-lg">
                      <Calendar className="h-5 w-5" />
                      Book Now
                    </Button>
                  </Link>

                  <Link to="/services" className="w-full">
                    <Button variant="ghost" size="md" className="w-full text-slate-600 hover:text-ocean-700 hover:bg-slate-100">
                      Explore Our Services
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-6 sm:mt-8 mb-8 sm:mb-0 flex flex-wrap items-center gap-3 sm:gap-6 text-slate-500"
                >
                  <div className="flex items-center gap-1.5">
                    <PawPrint className="h-4 w-4 text-coral-500" />
                    <span className="text-xs font-medium">Pet Store Onsite</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium">4.9 Google Rating</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Desktop collage */}
            <div className="hidden lg:flex order-2 items-center justify-center">
              <div className="relative w-full max-w-2xl aspect-[4/3]">
                <img
                  src="/dog-hero.jpg"
                  alt="Happy beagle dog"
                  className="absolute top-0 left-0 w-[58%] h-[75%] object-cover rounded-3xl shadow-2xl border-4 border-white"
                />
                <img
                  src="/cat-hero.jpg"
                  alt="Friendly cat"
                  className="absolute bottom-0 right-0 w-[55%] h-[70%] object-cover rounded-3xl shadow-2xl border-4 border-white"
                />
              </div>
            </div>

            {/* Mobile collage */}
            <div className="order-1 lg:hidden">
              <div className="relative">
                <div className="absolute inset-x-0 -top-6 bottom-6 bg-gradient-to-tr from-coral-200 via-ocean-100 to-green-100 rounded-[2.5rem] -rotate-2 scale-105 -z-10" />
                <div className="flex gap-3 items-end justify-center">
                  <img
                    src="/dog-hero.jpg"
                    alt="Happy beagle dog"
                    className="w-[48%] h-56 object-cover rounded-3xl shadow-xl border-4 border-white"
                  />
                  <img
                    src="/cat-hero.jpg"
                    alt="Friendly cat"
                    className="w-[48%] h-56 object-cover rounded-3xl shadow-xl border-4 border-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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