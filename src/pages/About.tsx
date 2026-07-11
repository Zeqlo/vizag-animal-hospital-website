import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import {
  Heart,
  Award,
  Shield,
  Sparkles,
  Users,
  HandHeart,
  Stethoscope,
  Microscope,
  Pill,
  Home as HomeIcon,
  Scissors,
  ArrowRight,
  BadgeCheck,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Container } from "@/components/ui/Container"
import { Section } from "@/components/ui/Section"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { TeamMemberCard } from "@/components/common/TeamMemberCard"
import { teamMembers as teamMembersStatic } from "@/data/team"
import { clinicInfo } from "@/data/clinicInfo"
import { useApiData } from "@/hooks/useApiData"

const coreValues = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We treat every animal with kindness, empathy, and genuine concern for their wellbeing.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in every aspect of veterinary care and service.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We are honest, transparent, and ethical in all our dealings with pets and their owners.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "We embrace new technologies and treatment methods to provide the best possible care.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Quality veterinary care should be affordable and accessible to all pet owners.",
  },
  {
    icon: HandHeart,
    title: "Teamwork",
    description: "Our collaborative approach ensures comprehensive, well-coordinated care for every pet.",
  },
]

const facilities = [
  {
    icon: Scissors,
    title: "Surgery Room",
    description: "A fully-equipped surgical suite with modern anesthesia monitoring and sterilization systems for safe procedures.",
  },
  {
    icon: Microscope,
    title: "Diagnostic Lab",
    description: "Laboratory with blood analyzers, ultrasound, and microscopy for rapid, accurate diagnostics.",
  },
  {
    icon: Pill,
    title: "Pharmacy",
    description: "A well-stocked pharmacy with genuine medicines, supplements, and prescription diets for all your pet's needs.",
  },
  {
    icon: HomeIcon,
    title: "Pet Boarding (Coming Soon)",
    description: "We are setting up clean, spacious, and comfortable boarding enclosures with CCTV monitoring and dedicated staff. Coming soon!",
  },
  {
    icon: Sparkles,
    title: "Grooming Station",
    description: "Professional grooming area with breed-specific tools, premium pet-safe products, and a stress-free environment.",
  },
]

const certifications = [
  {
    title: "VCI",
    subtitle: "Veterinary Council of India",
    description: "All our veterinarians are registered with the Veterinary Council of India.",
  },
  {
    title: "AP Pet Welfare",
    subtitle: "Andhra Pradesh Pet Welfare Board",
    description: "Certified by the AP Pet Welfare Board for ethical animal care practices.",
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

export default function About() {
  const { data: teamMembers } = useApiData("/api/team", teamMembersStatic)
  const vets = teamMembers.filter((m) => m.role === "veterinarian").slice(0, 3)

  return (
    <>
      <Helmet>
        <title>About Us | Vizag Animal Hospital</title>
        <meta
          name="description"
          content="Learn about Vizag Animal Hospital & Store in Visakhapatnam. Discover our mission, values, facilities, and our certified veterinary team led by Dr. Vani Poosapati (DVM) and Dr. K. Mounika (BVSc. & AH, M.V.Sc)."
        />
      </Helmet>

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-ocean-900 via-ocean-700 to-coral-500 py-16 sm:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-white">
              About Us
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ocean-100 max-w-2xl mx-auto">
              {clinicInfo.shortDescription}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Clinic Story */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-coral-500 mb-3">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-4">
                A Legacy of Compassionate Pet Care
              </h2>
              <p className="text-slate-600 mb-4">
                <strong>Vizag Animal Hospital &amp; Store</strong> was founded with a simple mission:
                to provide world-class veterinary care to the pets of Visakhapatnam. What started as
                a small clinic has grown into a full-service veterinary hospital and pet store
                trusted by thousands of pet parents across the city.
              </p>
              <p className="text-slate-600 mb-4">
                Led by <strong>Dr. Vani Poosapati</strong> (DVM) and <strong>Dr. K. Mounika</strong>
                (BVSc. &amp; AH, M.V.Sc), our team brings together expertise in general medicine,
                surgery, diagnostics, and animal welfare. With advanced qualifications and a deep
                love for animals, we combine modern medical technology with genuine compassion.
              </p>
              <p className="text-slate-600 mb-6">
                Today, Vizag Animal Hospital offers comprehensive services including vaccinations,
                critical care, all types of surgeries, radiology &amp; blood tests, grooming
                &amp; spa, doorstep services, and a fully stocked pet store — all under one roof.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop"
                alt="Veterinarian with a pet at Vizag Animal Hospital"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section bg="slate">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 h-full">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-ocean-50 text-ocean-700 mb-5">
                  <Stethoscope className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 mb-3">Our Mission</h3>
                <p className="text-slate-600">
                  To provide accessible, high-quality, and compassionate veterinary care to every
                  pet in Visakhapatnam. We are committed to advancing animal health through
                  expertise, modern technology, and a deep love for animals — ensuring every pet
                  lives a long, healthy, and happy life.
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Card className="p-8 h-full">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-coral-50 text-coral-500 mb-5">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 mb-3">Our Vision</h3>
                <p className="text-slate-600">
                  To be the most trusted and comprehensive veterinary care provider in Vizag and
                  the surrounding region. We envision a community where every pet has access to
                  excellent medical care, and where pet owners are empowered with knowledge to make
                  the best decisions for their furry family members.
                </p>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section bg="white">
        <Container>
          <SectionTitle
            eyebrow="What We Stand For"
            title="Our Core Values"
            subtitle="The principles that guide everything we do — from routine checkups to complex surgeries."
          />
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div key={index} variants={itemFade}>
                  <Card hover className="p-6 h-full text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-coral-50 text-coral-500 mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold font-heading text-slate-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-600">{value.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Clinic Facilities */}
      <Section bg="slate">
        <Container>
          <SectionTitle
            eyebrow="Our Facilities"
            title="State-of-the-Art Clinic Facilities"
            subtitle="Modern, well-equipped facilities designed to provide comprehensive care for your pets in a safe, comfortable environment."
          />
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {facilities.map((facility, index) => {
              const Icon = facility.icon
              return (
                <motion.div key={index} variants={itemFade}>
                  <Card hover className="p-6 h-full text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-ocean-50 text-ocean-700 mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold font-heading text-slate-900 mb-2">
                      {facility.title}
                    </h3>
                    <p className="text-sm text-slate-600">{facility.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </Section>

      {/* Certifications */}
      <Section bg="white">
        <Container>
          <SectionTitle
            eyebrow="Accreditation"
            title="Certifications & Memberships"
            subtitle="We are proud to be recognized and certified by leading veterinary authorities and animal welfare organizations."
          />
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full sm:w-80"
              >
                <Card hover className="p-6 sm:p-8 text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-100 to-coral-100 text-ocean-700 mb-5">
                    <BadgeCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-semibold text-ocean-700 mb-3">{cert.subtitle}</p>
                  <p className="text-sm text-slate-600">{cert.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team Preview */}
      <Section bg="slate">
        <Container>
          <SectionTitle
            eyebrow="Our Team"
            title="Meet the People Behind Vizag Animal Hospital"
            subtitle="A dedicated team of veterinarians and pet care professionals committed to your pet's health."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vets.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/team">
              <Button variant="secondary" size="lg">
                Meet the Full Team
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}