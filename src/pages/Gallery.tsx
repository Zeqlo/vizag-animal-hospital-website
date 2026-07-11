import { useState, useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { motion, AnimatePresence } from "framer-motion"
import { X, Camera, ImageIcon, Loader2 } from "lucide-react"
import { Dialog } from "@headlessui/react"
import { Container } from "@/components/ui/Container"
import { Section } from "@/components/ui/Section"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Badge } from "@/components/ui/Badge"
import { useApiData } from "@/hooks/useApiData"

interface GalleryItem {
  id: number
  title: string
  category: "Clinic Facilities" | "Happy Pets" | "Events" | "Grooming"
  image: string
}

// Varying heights for masonry effect — removed, using uniform grid now

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const { data: galleryItems, loading } = useApiData<GalleryItem[]>("/api/gallery", [])

  const categories = useMemo(() => {
    const cats = new Set(galleryItems.map((item) => item.category))
    return ["All", ...Array.from(cats)] as string[]
  }, [galleryItems])

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory)

  const currentImage = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  const closeLightbox = () => setLightboxIndex(null)
  const showPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
    )
  const showNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : null
    )

  return (
    <>
      <Helmet>
        <title>Gallery | Vizag Animal Hospital</title>
        <meta
          name="description"
          content="Explore photos of our clinic facilities, happy pets, events, and grooming services at Vizag Animal Hospital in Visakhapatnam."
        />
      </Helmet>

      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-ocean-900 to-ocean-700 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-coral-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-ocean-400 rounded-full blur-3xl" />
        </div>
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="coral" className="mb-4">
              <Camera className="h-3 w-3" /> Gallery
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-5 text-balance">
              Gallery
            </h1>
            <p className="text-lg sm:text-xl text-ocean-100 leading-relaxed">
              A glimpse into life at Vizag Animal Hospital — our facilities, happy
              pets, community events, and grooming transformations.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Gallery Section */}
      <Section bg="white">
        <Container>
          <SectionTitle
            eyebrow="Photo Gallery"
            title="Moments at Vizag Animal Hospital"
            subtitle="Browse through our collection of memories and see what makes our clinic special."
          />

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-8 -mx-1 px-1 scrollbar-hide justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-ocean-700 text-white shadow-md"
                    : "bg-white border border-slate-300 text-slate-700 hover:border-ocean-400 hover:text-ocean-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-style Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-ocean-600" />
            </div>
          ) : filteredItems.length === 0 ? (
            <p className="text-center text-slate-500 py-20">No gallery items yet.</p>
          ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square bg-slate-100"
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Always-visible gradient on mobile, hover on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <Badge variant="ocean" className="mb-1 text-[10px]">
                    {item.category}
                  </Badge>
                  <p className="text-white text-xs sm:text-sm font-semibold">{item.title}</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ImageIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </Container>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {currentImage && (
          <Dialog
            static
            open={lightboxIndex !== null}
            onClose={closeLightbox}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              aria-hidden="true"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="relative max-w-4xl w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Close button */}
                  <button
                    onClick={closeLightbox}
                    className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Image */}
                  <img
                    src={currentImage.image.replace("w=600&h=400", "w=1200&h=800")}
                    alt={currentImage.title}
                    className="w-full max-h-[75vh] object-contain rounded-2xl"
                  />

                  {/* Title + Category */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl">
                    <Badge variant="coral" className="mb-2">
                      {currentImage.category}
                    </Badge>
                    <p className="text-white text-lg sm:text-xl font-semibold">
                      {currentImage.title}
                    </p>
                  </div>

                  {/* Navigation buttons */}
                  <button
                    onClick={showPrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                    aria-label="Previous"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={showNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                    aria-label="Next"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}