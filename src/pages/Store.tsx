import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { MapPin, Scissors, ShoppingBag, Star } from "lucide-react"
import { products, productCategories, type Product } from "@/data/products"
import { clinicInfo } from "@/data/clinicInfo"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Container } from "@/components/ui/Container"
import { Section } from "@/components/ui/Section"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Badge } from "@/components/ui/Badge"
import { ProductCard } from "@/components/common/ProductCard"

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p: Product) => p.category === selectedCategory)

  return (
    <>
      <Helmet>
        <title>Pet Store | Vizag Animal Hospital</title>
        <meta
          name="description"
          content="Shop quality pet food, accessories, toys, clothing, medicine, supplements, grooming products, and bird & fish supplies at the Vizag Animal Hospital pet store in Visakhapatnam."
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
              <ShoppingBag className="h-3 w-3" /> Pet Store
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-5 text-balance">
              Pet Store
            </h1>
            <p className="text-lg sm:text-xl text-ocean-100 leading-relaxed">
              Quality products for your beloved pets — premium food, fun toys,
              essential medicines, grooming supplies, and more. All available at
              our Vizag store.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Category Filter + Product Grid */}
      <Section bg="white">
        <Container>
          <SectionTitle
            eyebrow="Browse"
            title="Shop by Category"
            subtitle="Filter our full range of pet products by category to find exactly what your pet needs."
          />

          {/* Category filter buttons - horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-8 -mx-1 px-1 scrollbar-hide">
            {productCategories.map((cat) => (
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

          {/* Product grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-12">
              No products found in this category.
            </p>
          )}
        </Container>
      </Section>

      {/* Visit Our Store Banner */}
      <Section bg="slate">
        <Container>
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 sm:p-12">
                <Badge variant="coral" className="mb-4">
                  <MapPin className="h-3 w-3" /> Visit Us
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mb-4">
                  Visit our store in Vizag for the full range
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Our pet store is located right inside the Vizag Animal Hospital.
                  Browse the full selection of products in person and let our
                  friendly staff help you choose the best items for your pet.
                </p>
                <div className="flex items-start gap-3 text-slate-700 mb-6">
                  <MapPin className="h-5 w-5 text-ocean-700 mt-0.5 shrink-0" />
                  <p className="text-sm leading-relaxed">{clinicInfo.address.full}</p>
                </div>
                <Button variant="primary" size="md">
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </Button>
              </div>
              <div className="h-full min-h-[250px] bg-gradient-to-br from-ocean-100 to-coral-100 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-ocean-700 mb-4">
                    <ShoppingBag className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-lg font-semibold text-slate-800">
                    {clinicInfo.hours[0].hours}
                  </p>
                  <p className="text-sm text-slate-600">Mon – Sat Store Hours</p>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* CTA: Book Grooming */}
      <Section bg="ocean">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge variant="amber" className="mb-4">
              <Star className="h-3 w-3 fill-amber-500" /> Premium Services
            </Badge>
            <h3 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-4">
              Need more than pet supplies?
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Book professional pet grooming, spa, and skin care services for your
              furry friend. Our experienced team provides top-notch care for your
              pets.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/grooming">
                <Button variant="primary" size="lg">
                  <Scissors className="h-5 w-5" />
                  Book Grooming
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="accent" size="lg">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}