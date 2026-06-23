import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send,
  Facebook, Instagram, Siren, CheckCircle,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Label, FieldError } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { clinicInfo } from '@/data/clinicInfo'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
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
    console.log(data)
    await new Promise((r) => setTimeout(r, 1500))
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
      <section className="bg-gradient-to-br from-ocean-900 to-ocean-700 text-white py-16 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium text-coral-200 mb-4">
              <MessageCircle className="h-4 w-4" />
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg text-ocean-100">
              Have a question or need to schedule a visit? We'd love to hear from you.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section bg="white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
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

                <Card className="p-5 flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-ocean-100">
                    <Mail className="h-5 w-5 text-ocean-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <a href={`mailto:${clinicInfo.email}`} className="text-sm text-slate-600 hover:text-ocean-700 transition-colors break-all">
                      {clinicInfo.email}
                    </a>
                    <p className="text-xs text-slate-400 mt-1">(Placeholder — update with real email)</p>
                  </div>
                </Card>
              </div>

              {/* Emergency Card */}
              <Card className="p-6 bg-coral-50 border-coral-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-coral-200">
                    <Siren className="h-5 w-5 text-coral-700" />
                  </div>
                  <div>
                    <h3 className="font-bold font-heading text-slate-900">24/7 Online Consultation</h3>
                    <p className="text-xs text-slate-600">Emergency online consultation available 24/7</p>
                  </div>
                </div>
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="text-xl font-bold text-coral-600 hover:text-coral-700 transition-colors block mt-2"
                >
                  {clinicInfo.phone}
                </a>
              </Card>

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
                      <div className="grid sm:grid-cols-2 gap-4">
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
                          <Label htmlFor="email">Email (optional)</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            error={!!errors.email}
                            {...register('email')}
                          />
                          <FieldError>{errors.email?.message}</FieldError>
                        </div>
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
                        className={`border-t border-slate-100 ${h.emergency ? 'bg-coral-50' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                      >
                        <td className={`px-5 py-3 ${h.emergency ? 'font-bold text-coral-700' : 'text-slate-700'}`}>
                          {h.day}
                        </td>
                        <td className={`px-5 py-3 text-right ${h.emergency ? 'font-bold text-coral-700' : 'text-slate-600'}`}>
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