import { Seo } from "@/components/common/Seo"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Star, Quote, MessageSquare, TrendingUp } from "lucide-react"
import { testimonials } from "@/data/testimonials"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Container } from "@/components/ui/Container"
import { Section } from "@/components/ui/Section"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Badge } from "@/components/ui/Badge"
import { TestimonialCard } from "@/components/common/TestimonialCard"

export default function Testimonials() {
  const totalReviews = testimonials.length
  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews

  // Rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: testimonials.filter((t) => t.rating === star).length,
  }))

  return (
    <>
      <Seo
        title="Client Testimonials | Vizag Animal Hospital"
        description="Read what pet owners in Visakhapatnam say about Vizag Animal Hospital. Real reviews from happy clients about our veterinary care, grooming, boarding, and more."
        path="/testimonials"
      />

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
              <Quote className="h-3 w-3" /> Testimonials
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-5 text-balance">
              Testimonials
            </h1>
            <p className="text-lg sm:text-xl text-ocean-100 leading-relaxed">
              Don't just take our word for it — hear from the pet owners who
              trust us with their furry family members every day.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Rating Summary */}
      <Section bg="gradient">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <Card hover className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-8 p-8 sm:p-12 items-center">
                {/* Average rating */}
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-7 w-7 ${
                          i < Math.round(averageRating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-baseline justify-center md:justify-start gap-2">
                    <span className="text-4xl sm:text-5xl font-bold font-heading text-slate-900">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-lg text-slate-500">/ 5.0</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2 flex items-center justify-center md:justify-start gap-1.5">
                    <TrendingUp className="h-4 w-4 text-ocean-700" />
                    Based on {totalReviews} verified reviews
                  </p>
                </div>

                {/* Rating distribution */}
                <div className="md:col-span-2 space-y-2">
                  {ratingCounts.map(({ star, count }) => {
                    const percentage = (count / totalReviews) * 100
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-16 shrink-0">
                          <span className="text-sm font-medium text-slate-700">{star}</span>
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        </div>
                        <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-amber-400 to-coral-500 rounded-full"
                          />
                        </div>
                        <span className="text-sm text-slate-500 w-8 text-right shrink-0">
                          {count}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          </motion.div>
        </Container>
      </Section>

      {/* All Testimonials Grid */}
      <Section bg="white">
        <Container>
          <SectionTitle
            eyebrow="Client Stories"
            title="What Our Clients Say"
            subtitle="Real experiences from pet owners across Visakhapatnam who trust Vizag Animal Hospital with their beloved companions."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={idx}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Share Your Experience CTA */}
      <Section bg="ocean">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coral-500 mb-6">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-4">
              Share Your Experience
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Visited Vizag Animal Hospital recently? We'd love to hear from you!
              Share your story and help other pet owners discover quality
              veterinary care in Vizag.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button variant="accent" size="lg">
                  <MessageSquare className="h-5 w-5" />
                  Share Your Story
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Leave a Review
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}