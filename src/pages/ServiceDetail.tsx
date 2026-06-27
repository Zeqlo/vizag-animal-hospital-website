import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Link, useParams } from "react-router-dom"
import {
  Stethoscope,
  Syringe,
  Scissors,
  Microscope,
  Home as HomeIcon,
  PawPrint,
  Sparkles,
  Calendar,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles as SparklesIcon,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Container } from "@/components/ui/Container"
import { Section } from "@/components/ui/Section"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Badge } from "@/components/ui/Badge"
import { ServiceCard } from "@/components/common/ServiceCard"
import { services as servicesStatic, type Service } from "@/data/services"
import { useApiData } from "@/hooks/useApiData"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  Syringe,
  Scissors,
  Microscope,
  Home: HomeIcon,
  PawPrint,
  Sparkles,
}

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemFade = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: services } = useApiData("/api/services", servicesStatic)
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return (
      <>
        <Helmet>
          <title>Service Not Found | Vizag Animal Hospital</title>
        </Helmet>
        <Section bg="white" className="min-h-[60vh] flex items-center">
          <Container>
            <div className="text-center max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mb-6">
                <Stethoscope className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold font-heading text-slate-900 mb-3">
                Service Not Found
              </h1>
              <p className="text-slate-600 mb-8">
                Sorry, we couldn't find the service you're looking for. It may have been moved or no
                longer exists.
              </p>
              <Link to="/services">
                <Button variant="primary" size="lg">
                  <ArrowLeft className="h-5 w-5" />
                  Back to All Services
                </Button>
              </Link>
            </div>
          </Container>
        </Section>
      </>
    )
  }

  const Icon = iconMap[service.icon] || Stethoscope
  const otherServices = services.filter((s) => s.slug !== service.slug)
  const relatedServices = otherServices
    .filter((s) => s.category === service.category)
    .slice(0, 3)

  // Fallback: if not enough related services in the same category, fill from others
  const related = relatedServices.length >= 3
    ? relatedServices
    : [...relatedServices, ...otherServices.filter((s) => s.category !== service.category)].slice(0, 3)

  return (
    <>
      <Helmet>
        <title>{service.title} | Vizag Animal Hospital</title>
        <meta name="description" content={service.shortDescription} />
      </Helmet>

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-ocean-900 via-ocean-700 to-coral-500 py-16 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-ocean-100 hover:text-white transition-colors mb-6 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              All Services
            </Link>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm text-white flex-shrink-0">
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="coral"
                    className="bg-white/15 text-white capitalize"
                  >
                    {service.category}
                  </Badge>
                  {service.comingSoon && (
                    <Badge variant="coral">Coming Soon</Badge>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white">
                  {service.title}
                </h1>
                <p className="mt-3 text-lg text-ocean-100 max-w-2xl">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Main Content */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">
                  About This Service
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {service.longDescription}
                </p>

                {/* Features List */}
                <h3 className="text-xl font-bold font-heading text-slate-900 mb-4">
                  What's Included
                </h3>
                <motion.div
                  variants={containerStagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
                >
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemFade}
                      className="flex items-start gap-3 bg-slate-50 rounded-xl p-4"
                    >
                      <CheckCircle className="h-5 w-5 text-ocean-700 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Book Now CTA */}
                <Card className="p-8 text-center bg-gradient-to-br from-ocean-50 to-coral-50 border-0">
                  <SparklesIcon className="h-10 w-10 text-coral-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">
                    Ready to Book This Service?
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Schedule an appointment for {service.title.toLowerCase()} and give your pet the
                    care they deserve.
                  </p>
                  <Link to="/book-appointment">
                    <Button variant="accent" size="lg">
                      <Calendar className="h-5 w-5" />
                      Book Now
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="sticky top-24"
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold font-heading text-slate-900 mb-4">
                    Other Services
                  </h3>
                  <div className="space-y-2">
                    {otherServices.map((s) => {
                      const OtherIcon = iconMap[s.icon] || Stethoscope
                      return (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
                            s.slug === slug
                              ? "bg-ocean-50 text-ocean-700"
                              : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex-shrink-0">
                            <OtherIcon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium leading-tight">
                            {s.title}
                          </span>
                          <ArrowRight className="h-4 w-4 ml-auto text-slate-400 flex-shrink-0" />
                        </Link>
                      )
                    })}
                  </div>
                </Card>

                {/* Quick CTA */}
                <Card className="p-6 mt-6 bg-ocean-900 border-0 text-center">
                  <h3 className="text-lg font-semibold font-heading text-white mb-2">
                    Have Questions?
                  </h3>
                  <p className="text-sm text-ocean-100 mb-4">
                    Our team is happy to help you with any inquiries about our services.
                  </p>
                  <Link to="/contact">
                    <Button variant="accent" size="md" className="w-full">
                      Contact Us
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Services */}
      {related.length > 0 && (
        <Section bg="slate">
          <Container>
            <SectionTitle
              eyebrow="You May Also Like"
              title="Related Services"
              subtitle="Explore other services that may be relevant to your pet's health and wellbeing."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((s: Service, index: number) => (
                <ServiceCard key={s.slug} service={s} index={index} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}