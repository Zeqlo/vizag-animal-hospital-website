import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import {
  Phone,
  Calendar,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Container } from "@/components/ui/Container"
import { Section } from "@/components/ui/Section"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Badge } from "@/components/ui/Badge"
import { ServiceCard } from "@/components/common/ServiceCard"
import { services as servicesStatic } from "@/data/services"
import { clinicInfo } from "@/data/clinicInfo"
import { useApiData } from "@/hooks/useApiData"

export default function Services() {
  const { data: services } = useApiData("/api/services", servicesStatic)
  return (
    <>
      <Helmet>
        <title>Veterinary Services | Vizag Animal Hospital</title>
        <meta
          name="description"
          content="Explore the full range of veterinary services at Vizag Animal Hospital: vaccinations, critical care, all types of surgeries, grooming & spa, nail & skin care, in-house radiology & blood tests, doorstep services, and more."
        />
      </Helmet>

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-ocean-900 via-ocean-700 to-coral-500 py-20 sm:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="coral" className="mb-4 bg-white/15 text-white">
              What We Offer
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white">
              Our Veterinary Services
            </h1>
            <p className="mt-4 text-lg text-ocean-100 max-w-2xl mx-auto">
              Comprehensive, compassionate care for every stage of your pet's life — from routine
              checkups to advanced surgery and everything in between.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* All Services Grid */}
      <Section bg="white">
        <Container>
          <SectionTitle
            eyebrow="Full Service List"
            title="Complete Pet Care Under One Roof"
            subtitle="Click on any service to learn more about what's included and how to book."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Need Help Choosing CTA */}
      <Section bg="white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-ocean-50 to-coral-50 border-0">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-ocean-700 text-white mb-5">
                <HelpCircle className="h-7 w-7" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-4">
                Need Help Choosing?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto mb-8">
                Not sure which service is right for your pet? Our friendly team is here to help you
                find the best care options. Book an appointment and our vets will assess your pet's
                needs and recommend the most suitable services.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/book-appointment">
                  <Button variant="accent" size="lg">
                    <Calendar className="h-5 w-5" />
                    Book Appointment
                  </Button>
                </Link>
                <a href={`tel:${clinicInfo.phone}`}>
                  <Button variant="secondary" size="lg">
                    <Phone className="h-5 w-5" />
                    Call Us
                  </Button>
                </a>
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}