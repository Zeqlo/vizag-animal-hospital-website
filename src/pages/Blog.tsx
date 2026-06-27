import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Bell, Newspaper } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { BlogCard } from '@/components/common/BlogCard'
import { blogPosts as blogPostsStatic } from '@/data/blogPosts'
import { useApiData } from '@/hooks/useApiData'

export default function Blog() {
  const { data: blogPosts } = useApiData('/api/blog-posts', blogPostsStatic)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const blogCategories = useMemo(() => {
    const unique = Array.from(new Set(blogPosts.map((p) => p.category)))
    return ['All', ...unique]
  }, [blogPosts])

  const filteredPosts =
    selectedCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === selectedCategory)

  return (
    <>
      <Helmet>
        <title>Pet Care Blog | Vizag Animal Hospital</title>
        <meta name="description" content="Expert pet care tips, veterinary advice, and health guides from the team at Vizag Animal Hospital, Visakhapatnam." />
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
              <Newspaper className="h-4 w-4" />
              Pet Care Blog
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
              Pet Care Blog
            </h1>
            <p className="text-base sm:text-lg text-ocean-100">
              Expert tips, advice, and stories to keep your furry friends healthy and happy.
            </p>
          </motion.div>
        </Container>
      </section>

      <Section bg="white">
        <Container>
          {/* Category Filter */}
          <div className="mb-10">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-ocean-700 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {filteredPosts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredPosts.map((post, index) => (
                    <BlogCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-slate-500">No articles found in this category yet.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section bg="gradient">
        <Container>
          <Card className="p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-coral-100 mb-5">
                <Bell className="h-7 w-7 text-coral-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mb-3">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-slate-600 mb-6">
                Get the latest pet care tips and clinic updates delivered straight to your inbox.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
                <Button type="submit" variant="accent" size="md" className="flex-shrink-0">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-slate-400 mt-4">No spam, ever. Unsubscribe anytime.</p>
            </motion.div>
          </Card>
        </Container>
      </Section>
    </>
  )
}