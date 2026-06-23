import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, Facebook, MessageCircle, User } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { BlogCard } from '@/components/common/BlogCard'
import { blogPosts } from '@/data/blogPosts'
import { formatDate } from '@/lib/utils'

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Article Not Found | Vizag Animal Hospital</title>
        </Helmet>
        <Section bg="white">
          <Container>
            <div className="text-center py-20 max-w-md mx-auto">
              <h1 className="text-3xl font-bold font-heading text-slate-900 mb-4">
                Article Not Found
              </h1>
              <p className="text-slate-600 mb-8">
                Sorry, we couldn't find the article you're looking for. It may have been moved or removed.
              </p>
              <Link to="/blog">
                <Button variant="primary" size="md">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </Container>
        </Section>
      </>
    )
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  // Split content into blocks
  const contentBlocks = post.content.split('\n\n')
  const renderBlocks: { type: 'paragraph' | 'list'; items?: string[]; text?: string }[] = []

  let currentList: string[] = []
  contentBlocks.forEach((block) => {
    const trimmed = block.trim()
    if (/^\d+\.\s/.test(trimmed)) {
      // This block starts a numbered list — it may contain multiple items separated by \n
      const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l.trim()))
      currentList.push(...items.map((l) => l.replace(/^\d+\.\s*/, '').trim()))
    } else if (/^- /.test(trimmed)) {
      // Bullet list items
      const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- ')).map((l) => l.replace(/^- /, '').trim())
      if (currentList.length > 0) {
        renderBlocks.push({ type: 'list', items: currentList })
        currentList = []
      }
      renderBlocks.push({ type: 'list', items })
    } else {
      if (currentList.length > 0) {
        renderBlocks.push({ type: 'list', items: currentList })
        currentList = []
      }
      renderBlocks.push({ type: 'paragraph', text: trimmed })
    }
  })
  if (currentList.length > 0) {
    renderBlocks.push({ type: 'list', items: currentList })
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Vizag Animal Hospital</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Hero Image */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
      </div>

      {/* Article Header */}
      <div className="bg-white -mt-20 relative z-10">
        <Container>
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="coral">{post.category}</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-slate-900 mb-5 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Article Body */}
      <Section bg="white" className="!pt-8">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ocean-700 hover:text-ocean-800 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <motion.article
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="prose prose-slate max-w-none"
            >
              <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
                {post.excerpt}
              </p>

              <div className="space-y-5">
                {renderBlocks.map((block, i) => {
                  if (block.type === 'list' && block.items) {
                    return (
                      <ol key={i} className="space-y-3 pl-0">
                        {block.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex gap-3 text-slate-700 leading-relaxed"
                          >
                            <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-ocean-100 text-ocean-700 text-xs font-bold mt-0.5">
                              {j + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ol>
                    )
                  }
                  return (
                    <p key={i} className="text-slate-700 leading-relaxed">
                      {block.text}
                    </p>
                  )
                })}
              </div>
            </motion.article>

            {/* Share Buttons */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Share this article:</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1877F2] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      <Section bg="slate" className="!pt-12">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mb-2">
                Related Articles
              </h2>
              <p className="text-slate-600">Keep reading — your pet will thank you!</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedPosts.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}