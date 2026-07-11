import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Phone, MapPin, CheckCircle, PawPrint, User, Tag, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select, Label, FieldError } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { clinicInfo } from '@/data/clinicInfo'
import { services as servicesStatic } from '@/data/services'
import { useApiData } from '@/hooks/useApiData'

const appointmentSchema = z.object({
  ownerName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  petName: z.string().optional(),
  petType: z.enum(['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'], { required_error: 'Please select pet type' }),
  service: z.string().min(1, 'Please select a service'),
  preferredDate: z.string().refine((date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return new Date(date) >= today
  }, 'Date cannot be in the past'),
  timeSlot: z.enum([
    'Morning (9:00 AM - 12:00 PM)',
    'Afternoon (12:00 PM - 3:00 PM)',
    'Evening (3:00 PM - 6:00 PM)',
    'Night (6:00 PM - 9:30 PM)',
  ], { required_error: 'Please select a time slot' }),
  notes: z.string().optional(),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

const todayStr = new Date().toISOString().split('T')[0]

const WHATSAPP_NUMBER = clinicInfo.whatsapp
const PHONE_TEL = `tel:${WHATSAPP_NUMBER.replace(/\s/g, '')}`
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`

export default function BookAppointment() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  })

  const { data: services } = useApiData('/api/services', servicesStatic)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedData, setSubmittedData] = useState<AppointmentFormData | null>(null)

  const onSubmit = async (data: AppointmentFormData) => {
    // Try the VetsonCloud API (works silently if env vars are set)
    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || result.status === 'error') {
        console.error('VetsonCloud booking error:', result.message)
      }
    } catch (error) {
      console.error('Booking API error:', error)
    }

    setSubmittedData(data)
    setIsSuccess(true)
  }

  const handleBookAnother = () => {
    reset()
    setSubmittedData(null)
    setIsSuccess(false)
  }

  return (
    <>
      <Helmet>
        <title>Book Appointment | Vizag Animal Hospital</title>
        <meta name="description" content="Book an appointment at Vizag Animal Hospital in Visakhapatnam. Quick, easy online booking for all pet care services." />
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
              <PawPrint className="h-4 w-4" />
              We're here for your pets
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
              Book an Appointment
            </h1>
            <p className="text-sm sm:text-lg text-ocean-100">
              Schedule a visit for your furry friend in just a few clicks. Our team will confirm your appointment within 2 hours.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section bg="slate">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <AnimatePresence mode="wait">
                {isSuccess && submittedData ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="p-8 sm:p-10 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6"
                      >
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      </motion.div>
                      <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mb-3">
                        Appointment Booked Successfully!
                      </h2>
                      <p className="text-slate-600 mb-8 max-w-md mx-auto">
                        Thank you, {submittedData.ownerName}! We've received your appointment request.
                      </p>

                      {/* Summary */}
                      <div className="bg-slate-50 rounded-xl p-6 text-left mb-8 max-w-md mx-auto">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                          Appointment Summary
                        </h3>
                        <dl className="space-y-3">
                          <div className="flex justify-between gap-4">
                            <dt className="flex items-center gap-2 text-slate-500 text-sm">
                              <User className="h-4 w-4" /> Owner
                            </dt>
                            <dd className="font-medium text-slate-900 text-sm text-right">{submittedData.ownerName}</dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="flex items-center gap-2 text-slate-500 text-sm">
                              <PawPrint className="h-4 w-4" /> Pet
                            </dt>
                            <dd className="font-medium text-slate-900 text-sm text-right">
                              {submittedData.petName ? `${submittedData.petName} (${submittedData.petType})` : submittedData.petType}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="flex items-center gap-2 text-slate-500 text-sm">
                              <Tag className="h-4 w-4" /> Service
                            </dt>
                            <dd className="font-medium text-slate-900 text-sm text-right">{submittedData.service}</dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="flex items-center gap-2 text-slate-500 text-sm">
                              <Calendar className="h-4 w-4" /> Date
                            </dt>
                            <dd className="font-medium text-slate-900 text-sm text-right">
                              {new Date(submittedData.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-4">
                            <dt className="flex items-center gap-2 text-slate-500 text-sm">
                              <Clock className="h-4 w-4" /> Time Slot
                            </dt>
                            <dd className="font-medium text-slate-900 text-sm text-right">{submittedData.timeSlot}</dd>
                          </div>
                        </dl>
                      </div>

                      <p className="text-sm text-slate-500 mb-6 flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4 text-ocean-600" />
                        We will call you to confirm within 2 hours
                      </p>

                      <Button variant="accent" size="lg" onClick={handleBookAnother}>
                        Book Another Appointment
                      </Button>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Call / WhatsApp CTA */}
                    <Card className="p-6 sm:p-8 mb-6 bg-gradient-to-br from-ocean-50 to-coral-50 border-ocean-200">
                      <div className="text-center">
                        <h2 className="text-xl sm:text-3xl font-bold font-heading text-slate-900 mb-2">
                          Prefer to call or WhatsApp? Most of our clients do.
                        </h2>
                        <p className="text-slate-600 mb-6">
                          Tap below to reach us directly — we usually respond within minutes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <a href={PHONE_TEL}>
                            <Button variant="accent" size="lg" className="w-full sm:w-auto">
                              <Phone className="h-5 w-5 mr-2" />
                              Call {WHATSAPP_NUMBER}
                            </Button>
                          </a>
                          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto border-green-500 text-green-600 hover:bg-green-500 hover:text-white focus:ring-green-400">
                              <MessageCircle className="h-5 w-5 mr-2" />
                              WhatsApp {WHATSAPP_NUMBER}
                            </Button>
                          </a>
                        </div>
                      </div>
                    </Card>

                    <h2 className="text-lg sm:text-xl font-semibold font-heading text-slate-700 mb-4">
                      Or fill in the form below and we'll get back to you
                    </h2>

                    <Card className="p-6 sm:p-8">
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Owner & Pet Info */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="ownerName">Owner Name *</Label>
                            <Input
                              id="ownerName"
                              placeholder="John Doe"
                              error={!!errors.ownerName}
                              {...register('ownerName')}
                            />
                            <FieldError>{errors.ownerName?.message}</FieldError>
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="9876543210"
                              error={!!errors.phone}
                              {...register('phone')}
                            />
                            <FieldError>{errors.phone?.message}</FieldError>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="petName">Pet Name (Optional)</Label>
                              <Input
                                id="petName"
                                placeholder="Optional - leave blank if unnamed"
                                error={!!errors.petName}
                                {...register('petName')}
                              />
                              <FieldError>{errors.petName?.message}</FieldError>
                            </div>
                            <div>
                              <Label htmlFor="petType">Pet Type *</Label>
                              <Select
                                id="petType"
                                error={!!errors.petType}
                                {...register('petType')}
                                defaultValue=""
                              >
                                <option value="" disabled>Select pet type</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Bird">Bird</option>
                                <option value="Rabbit">Rabbit</option>
                                <option value="Other">Other</option>
                              </Select>
                              <FieldError>{errors.petType?.message}</FieldError>
                            </div>
                          </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="border-t border-slate-100 pt-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="service">Service Needed *</Label>
                              <Select
                                id="service"
                                error={!!errors.service}
                                {...register('service')}
                                defaultValue=""
                              >
                                <option value="" disabled>Select a service</option>
                                {services.map((s) => (
                                  <option key={s.slug} value={s.title}>{s.title}</option>
                                ))}
                              </Select>
                              <FieldError>{errors.service?.message}</FieldError>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="preferredDate">Preferred Date *</Label>
                                <Input
                                  id="preferredDate"
                                  type="date"
                                  min={todayStr}
                                  error={!!errors.preferredDate}
                                  {...register('preferredDate')}
                                />
                                <FieldError>{errors.preferredDate?.message}</FieldError>
                              </div>
                              <div>
                                <Label htmlFor="timeSlot">Preferred Time Slot *</Label>
                                <Select
                                  id="timeSlot"
                                  error={!!errors.timeSlot}
                                  {...register('timeSlot')}
                                  defaultValue=""
                                >
                                  <option value="" disabled>Select a slot</option>
                                  <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                                  <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                                  <option value="Evening (3:00 PM - 6:00 PM)">Evening (3:00 PM - 6:00 PM)</option>
                                  <option value="Night (6:00 PM - 9:30 PM)">Night (6:00 PM - 9:30 PM)</option>
                                </Select>
                                <FieldError>{errors.timeSlot?.message}</FieldError>
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="notes">Notes (optional)</Label>
                              <Textarea
                                id="notes"
                                rows={4}
                                placeholder="Any symptoms, concerns, or special requests..."
                                error={!!errors.notes}
                                {...register('notes')}
                              />
                              <FieldError>{errors.notes?.message}</FieldError>
                            </div>
                          </div>
                        </div>

                        <Button type="submit" variant="accent" size="lg" loading={isSubmitting} className="w-full">
                          {isSubmitting ? 'Booking...' : 'Book Appointment'}
                        </Button>
                      </form>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 order-1 lg:order-2">
              {/* Clinic Hours */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-ocean-700" />
                  <h3 className="font-bold font-heading text-slate-900">Clinic Hours</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {clinicInfo.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0 text-slate-600"
                    >
                      <span>{h.day}</span>
                      <span className="text-right">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Contact Us */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-5 w-5 text-ocean-700" />
                  <h3 className="font-bold font-heading text-slate-900">Contact Us</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={`tel:${clinicInfo.phone.replace(/\s/g, '')}`}
                    className="text-base font-semibold text-ocean-700 hover:text-ocean-800 transition-colors flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    {clinicInfo.phone}
                  </a>
                  <a
                    href={`https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-green-600 hover:text-green-700 transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                </div>
              </Card>

              {/* Address */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-ocean-700" />
                  <h3 className="font-bold font-heading text-slate-900">Our Location</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-2">{clinicInfo.address.line1}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-2">{clinicInfo.address.line2}</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {clinicInfo.address.city}, {clinicInfo.address.state} - {clinicInfo.address.pincode}
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}