import { motion } from 'framer-motion'
import { Seo } from '@/components/common/Seo'
import { Link } from 'react-router-dom'
import { HelpCircle, Phone, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Accordion } from '@/components/ui/Accordion'
import { faqs } from '@/data/faqs'
import { clinicInfo } from '@/data/clinicInfo'

export default function FAQ() {
  const accordionItems = faqs.map((f) => ({ question: f.question, answer: f.answer }))

  return (
    <>
      <Seo
        title="FAQ | Vizag Animal Hospital"
        description="Find answers to frequently asked questions about appointments, services, pet store, and billing at Vizag Animal Hospital."
        path="/faq"
      />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-ocean-900 to-ocean-700 text-white py-16 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium text-coral-200 mb-4">
              <HelpCircle className="h-4 w-4" />
              Got Questions?
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-ocean-100">
              Find quick answers to common questions about our clinic, services, and policies.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section bg="white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Accordion items={accordionItems} />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Still Have Questions CTA */}
      <Section bg="gradient">
        <Container>
          <Card className="p-8 sm:p-12 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-ocean-100 mb-5">
                <HelpCircle className="h-7 w-7 text-ocean-700" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mb-3">
                Still Have Questions?
              </h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Our friendly team is always here to help. Don't hesitate to reach out!
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <Phone className="h-6 w-6 text-ocean-700" />
                  <span className="text-xs font-medium text-slate-500">Call Us</span>
                  <span className="text-sm font-semibold text-slate-900">{clinicInfo.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  <span className="text-xs font-medium text-slate-500">WhatsApp</span>
                  <span className="text-sm font-semibold text-slate-900">{clinicInfo.whatsapp}</span>
                </a>
              </div>

              <Link to="/contact">
                <Button variant="primary" size="lg">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </Card>
        </Container>
      </Section>
    </>
  )
}