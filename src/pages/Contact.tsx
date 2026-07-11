import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  Phone, MapPin, Clock, MessageCircle, Send,
  Facebook, Instagram, CheckCircle,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Label, FieldError } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { clinicInfo } from '@/data/clinicInfo'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const socialLinks = [
  { name: 'Facebook', icon: Facebook, url: clinicInfo.social.facebook, color: 'hover:bg-[#1877F2]' },
  { name: 'Instagram', icon: Instagram, url: clinicInfo.social.instagram, color: 'hover:bg-[#E4405F]' },
]

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok || result.status === 'error') {
        console.error('Contact form error:', result.message)
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
    }
    setIsSuccess(true)
    reset()
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | Vizag Animal Hospital</title>
        <meta name="description" content="Contact Vizag Animal Hospital in Visakhapatnam. Call, WhatsApp, or visit us for appointments, online consultation, and pet care services." />
      </Helmet>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-ocean-900 to-ocean-700 text-white py-14 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 text-sm font-medium text-coral-200 mb-4">
              <MessageCircle className="h-4 w-4" />
              Get in Touch
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
              Contact Us
            </h1>
            <p className="text-sm sm:text-lg text-ocean-100">
              Have a question or need to schedule a visit? We'd love to hear from you.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Dominant Call / WhatsApp CTA */}
      <Section bg="white" className="!pt-10 sm:!pt-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="rounded-3xl bg-gradient-to-br from-ocean-50 via-white to-coral-50 border-2 border-ocean-100 p-8 sm:p-10 shadow-sm">
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-slate-900 mb-6">
                Call or WhatsApp Us
              </h2>

              {/* Big CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-coral-500 text-white text-lg font-bold shadow-lg shadow-coral-500/30 hover:bg-coral-600 hover:shadow-xl transition-all duration-200"
                >
                  <Phone className="h-6 w-6" />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-green-500 text-white text-lg font-bold shadow-lg shadow-green-500/30 hover:bg-green-600 hover:shadow-xl transition-all duration-200"
                >
                  <MessageCircle className="h-6 w-6" />
                  WhatsApp
                </a>
              </div>

              {/* Secondary Numbers */}
              <div className="border-t border-slate-200 pt-6">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Also Available On:
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  {clinicInfo.secondaryPhones.map((ph) => (
                    <a
                      key={ph}
                      href={`tel:${ph}`}
                      className="inline-flex items-center gap-2 text-lg font-semibold text-ocean-700 hover:text-ocean-900 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      {ph}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Contact Info + Form */}
      <Section bg="white" className="!pt-10">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">Contact Information</h2>
                <p className="text-slate-600">Reach out to us through any of these channels.</p>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                <Card className="p-5 flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-ocean-100">
                    <MapPin className="h-5 w-5 text-ocean-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{clinicInfo.address.full}</p>
                  </div>
                </Card>

                {/* Primary Phone */}
                <Card className="p-5 flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-ocean-100">
                    <Phone className="h-5 w-5 text-ocean-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Call / WhatsApp</h3>
                    <a href={`tel:${clinicInfo.phone}`} className="text-sm text-slate-600 hover:text-ocean-700 transition-colors block">
                      {clinicInfo.phone}
                    </a>
                    <a
                      href={`https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 hover:text-green-700 transition-colors flex items-center gap-1 mt-1"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp Chat
                    </a>
                  </div>
                </Card>

                {/* Secondary Phones */}
                {clinicInfo.secondaryPhones.map((ph) => (
                  <Card key={ph} className="p-5 flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100">
                      <Phone className="h-5 w-5 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Secondary Phone</h3>
                      <a href={`tel:${ph}`} className="text-sm text-slate-600 hover:text-ocean-700 transition-colors">
                        {ph}
                      </a>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className={`flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 text-slate-600 hover:text-white transition-all duration-200 ${social.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">Send a Message</h2>
                <p className="text-slate-600 mb-6">Fill out the form below and we'll get back to you shortly.</p>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4"
                      >
                        <CheckCircle className="h-9 w-9 text-green-600" />
                      </motion.div>
                      <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">Message Sent!</h3>
                      <p className="text-slate-600 mb-6">Thank you for reaching out. We'll respond within 24 hours.</p>
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => setIsSuccess(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          error={!!errors.name}
                          {...register('name')}
                        />
                        <FieldError>{errors.name?.message}</FieldError>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="9876543210"
                          error={!!errors.phone}
                          {...register('phone')}
                        />
                        <FieldError>{errors.phone?.message}</FieldError>
                      </div>
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          rows={5}
                          placeholder="How can we help you?"
                          error={!!errors.message}
                          {...register('message')}
                        />
                        <FieldError>{errors.message?.message}</FieldError>
                      </div>
                      <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && <Send className="h-4 w-4" />}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Map Embed */}
      <Section bg="slate" className="!pt-0">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6 text-center">Find Us on the Map</h2>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative w-full">
              <iframe
                src={clinicInfo.mapEmbedUrl}
                className="w-full h-[300px] sm:h-[400px] lg:h-[450px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location Map"
              />
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Clinic Hours Table */}
      <Section bg="white" className="!pt-0">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="h-6 w-6 text-ocean-700" />
                <h2 className="text-2xl font-bold font-heading text-slate-900">Clinic Hours</h2>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-ocean-50 text-left">
                      <th className="px-5 py-3 font-semibold text-slate-700">Day</th>
                      <th className="px-5 py-3 font-semibold text-slate-700 text-right">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clinicInfo.hours.map((h, i) => (
                      <tr
                        key={h.day}
                        className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                      >
                        <td className="px-5 py-3 text-slate-700">
                          {h.day}
                        </td>
                        <td className="px-5 py-3 text-right text-slate-600">
                          {h.hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-4 text-center">
                Walk-ins welcome, but appointments are given priority.
              </p>
            </Card>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}