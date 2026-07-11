import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Users, Heart, Briefcase } from "lucide-react"
import { teamMembers as teamMembersStatic } from "@/data/team"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Container } from "@/components/ui/Container"
import { Section } from "@/components/ui/Section"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Badge } from "@/components/ui/Badge"
import { TeamMemberCard } from "@/components/common/TeamMemberCard"

export default function Team() {
  const teamMembers = teamMembersStatic
  const veterinarians = teamMembers.filter((m) => m.role === "veterinarian")
  const supportStaff = teamMembers.filter((m) => m.role === "support")

  return (
    <>
      <Helmet>
        <title>Our Veterinary Team | Vizag Animal Hospital</title>
        <meta
          name="description"
          content="Meet the dedicated veterinarians at Vizag Animal Hospital in Visakhapatnam — Dr. Vani Poosapati (DVM) and Dr. K. Mounika (BVSc. & AH, M.V.Sc). Experienced, compassionate, and ready to care for your pets."
        />
      </Helmet>

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-ocean-900 to-ocean-700 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-coral-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-ocean-400 rounded-full blur-3xl" />
        </div>
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="coral" className="mb-4">
              <Users className="h-3 w-3" /> Our Team
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-5 text-balance">
              Our Team
            </h1>
            <p className="text-lg sm:text-xl text-ocean-100 leading-relaxed">
              Dedicated professionals committed to the health and well-being of
              your beloved pets. Meet the compassionate team behind Vizag Animal
              Hospital.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Veterinarians Section */}
      <Section bg="white">
        <Container>
          <SectionTitle
            eyebrow="Expert Care"
            title="Our Veterinarians"
            subtitle="Highly qualified and experienced veterinary doctors providing the best medical care for your pets."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {veterinarians.map((member, idx) => (
              <TeamMemberCard key={member.id} member={member} index={idx} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Support Staff Section */}
      <Section bg="slate">
        <Container>
          <SectionTitle
            eyebrow="Behind the Scenes"
            title="Support Staff"
            subtitle="Our dedicated support team ensures your visit is smooth, comfortable, and stress-free for both you and your pet."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportStaff.map((member, idx) => (
              <TeamMemberCard key={member.id} member={member} index={idx} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Join Our Team CTA */}
      <Section bg="gradient">
        <Container>
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 sm:p-12">
                <Badge variant="ocean" className="mb-4">
                  <Briefcase className="h-3 w-3" /> Careers
                </Badge>
                <h3 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-4">
                  Join Our Team
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Are you passionate about animal care? We're always looking for
                  dedicated veterinarians, groomers, technicians, and animal
                  lovers to join our growing family. If you have a heart for
                  pets, we'd love to hear from you!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button variant="primary" size="lg">
                      <Heart className="h-5 w-5" />
                      Apply Now
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="secondary" size="lg">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="h-full min-h-[250px] bg-gradient-to-br from-ocean-100 to-coral-100 flex items-center justify-center p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-coral-500 mb-4">
                    <Heart className="h-12 w-12 text-white" />
                  </div>
                  <p className="text-xl font-bold text-slate-800">
                    Make a Difference
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    Every day, every pet
                  </p>
                </motion.div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  )
}