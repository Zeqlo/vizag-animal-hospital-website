import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import {
  Siren,
  Phone,
  ArrowRight,
  Calendar,
  HelpCircle,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Container } from "@/components/ui/Container"
import { Section } from "@/components/ui/Section"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Badge } from "@/components/ui/Badge"
import { ServiceCard } from "@/components/common/ServiceCard"
import { services } from "@/data/services"
import { clinicInfo } from "@/data/clinicInfo"

const emergencyFeatures = [
  "24/7 online consultation for emergencies",
  "Trauma & accident care guidance",
  "Poisoning treatment advice",
  "Critical care management for small & large animals",
]

export default function Services() {
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
              checkups to emergency surgery and everything in between.
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

      {/* Emergency Service Highlight */}
      <Section bg="slate">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-gradient-to-br from-coral-600 to-coral-500 p-8 sm:p-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-5">
                    <Siren className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-3">
                    24/7 Online Consultation
                  </h3>
                  <p className="text-coral-50 mb-6">
                    Pet emergencies don't wait for office hours. Our 24/7 online consultation
                    service ensures you can reach a veterinarian anytime for urgent guidance. If
                    your pet needs immediate help, call or WhatsApp us right away.
                  </p>
                  <div className="space-y-3 mb-6">
                    {emergencyFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-white">
                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <a href={`tel:${clinicInfo.phone}`}>
                    <Button variant="outline-white" size="lg">
                      <Phone className="h-5 w-5" />
                      {clinicInfo.phone}
                    </Button>
                  </a>
                </div>
                <div className="bg-ocean-900 p-8 sm:p-10 flex flex-col justify-center">
                  <h4 className="text-xl font-semibold font-heading text-white mb-4">
                    When to Seek Emergency Care
                  </h4>
                  <ul className="space-y-3 text-ocean-100">
                    <li className="flex items-start gap-2">
                      <span className="text-coral-400 mt-1">•</span>
                      Difficulty breathing or choking
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-coral-400 mt-1">•</span>
                      Severe bleeding or trauma from accidents
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-coral-400 mt-1">•</span>
                      Suspected poisoning or ingestion of toxic substances
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-coral-400 mt-1">•</span>
                      Sudden collapse, seizures, or paralysis
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-coral-400 mt-1">•</span>
                      Persistent vomiting or diarrhea with lethargy
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-coral-400 mt-1">•</span>
                      Difficulty urinating or straining
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
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