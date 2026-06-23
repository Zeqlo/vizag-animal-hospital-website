export interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  description: string
  rating: number
  featured: boolean
}

export const productCategories = [
  "All",
  "Dog Food",
  "Cat Food",
  "Pet Accessories",
  "Toys",
  "Clothing",
  "Medicine",
  "Supplements",
  "Grooming Products",
  "Bird & Fish Supplies",
]

export const products: Product[] = [
  { id: "p1", name: "Pedigree Adult Dog Food (3kg)", category: "Dog Food", price: 850, originalPrice: 950, image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3e6?w=400&h=300&fit=crop", description: "Complete nutrition for adult dogs with essential vitamins and minerals.", rating: 4.5, featured: true },
  { id: "p2", name: "Drools Adult Dog Food (1.2kg)", category: "Dog Food", price: 320, image: "https://images.unsplash.com/photo-1583561656350-0c0b1f1c2c2c?w=400&h=300&fit=crop", description: "Premium dry food for adult dogs with real chicken and balanced nutrition.", rating: 4.3, featured: false },
  { id: "p3", name: "Royal Canin Cat Food (2kg)", category: "Cat Food", price: 1200, originalPrice: 1350, image: "https://images.unsplash.com/photo-1585673138392-9b7f4c8e3c8c?w=400&h=300&fit=crop", description: "Premium dry food for adult cats with balanced protein and nutrients.", rating: 4.8, featured: true },
  { id: "p4", name: "Whiskas Cat Food (1.2kg)", category: "Cat Food", price: 480, image: "https://images.unsplash.com/photo-1602351447937-745c72099f4b?w=400&h=300&fit=crop", description: "Complete and balanced nutrition for adult cats with real fish.", rating: 4.4, featured: false },
  { id: "p5", name: "Adjustable Dog Collar with Leash", category: "Pet Accessories", price: 450, image: "https://images.unsplash.com/photo-1601758228041-f3b2795255a4?w=400&h=300&fit=crop", description: "Durable nylon collar with matching leash. Adjustable and comfortable.", rating: 4.3, featured: false },
  { id: "p6", name: "Stainless Steel Food Bowl", category: "Pet Accessories", price: 250, originalPrice: 320, image: "https://images.unsplash.com/photo-1602351447937-745c72095f4b?w=400&h=300&fit=crop", description: "Non-skid, dishwasher-safe stainless steel bowl for dogs and cats.", rating: 4.6, featured: false },
  { id: "p7", name: "Interactive Chew Toy Set (3 pcs)", category: "Toys", price: 350, originalPrice: 500, image: "https://images.unsplash.com/photo-1535930891776-0c2c65c0a7e4?w=400&h=300&fit=crop", description: "Non-toxic rubber chew toys for dental health and play.", rating: 4.6, featured: true },
  { id: "p8", name: "Cat Scratching Post (60cm)", category: "Toys", price: 890, image: "https://images.unsplash.com/photo-1533731513301-3e16c2c6e7c3?w=400&h=300&fit=crop", description: "Sisal-covered scratching post with a hanging toy. Saves your furniture!", rating: 4.5, featured: false },
  { id: "p9", name: "Dog Winter Sweater (Medium)", category: "Clothing", price: 550, image: "https://images.unsplash.com/photo-1583337130417-3346a1be1684?w=400&h=300&fit=crop", description: "Warm, comfortable acrylic sweater for medium-sized dogs. Perfect for winter.", rating: 4.2, featured: false },
  { id: "p10", name: "Reflective Dog Raincoat (Large)", category: "Clothing", price: 680, originalPrice: 800, image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3e6?w=400&h=300&fit=crop", description: "Waterproof raincoat with reflective strips for safe night walks.", rating: 4.4, featured: false },
  { id: "p11", name: "Deworming Tablets (4 pack)", category: "Medicine", price: 180, image: "https://images.unsplash.com/photo-1587854690359-950c4ba62c1f?w=400&h=300&fit=crop", description: "Broad-spectrum deworming tablets for dogs and cats.", rating: 4.5, featured: false },
  { id: "p12", name: "Tick & Flea Spot-On Treatment", category: "Medicine", price: 320, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop", description: "Effective spot-on treatment for ticks and fleas. For medium dogs.", rating: 4.6, featured: false },
  { id: "p13", name: "Multivitamin Supplement Tablets (60)", category: "Supplements", price: 550, originalPrice: 650, image: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=400&h=300&fit=crop", description: "Daily multivitamin for dogs and cats. Supports immunity and joints.", rating: 4.7, featured: true },
  { id: "p14", name: "Joint Care Supplement Powder (200g)", category: "Supplements", price: 720, originalPrice: 850, image: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=400&h=300&fit=crop", description: "Glucosamine & chondroitin powder for senior dogs. Mix with food.", rating: 4.8, featured: false },
  { id: "p15", name: "Pet Shampoo & Conditioner (500ml)", category: "Grooming Products", price: 380, image: "https://images.unsplash.com/photo-1583337130417-3346a1be1684?w=400&h=300&fit=crop", description: "Anti-tick & flea shampoo with aloe vera for a shiny coat.", rating: 4.4, featured: false },
  { id: "p16", name: "Pet Grooming Brush (Self-Cleaning)", category: "Grooming Products", price: 290, originalPrice: 350, image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=300&fit=crop", description: "Self-cleaning slicker brush for easy grooming. Reduces shedding.", rating: 4.5, featured: false },
  { id: "p17", name: "Premium Bird Seed Mix (1kg)", category: "Bird & Fish Supplies", price: 220, image: "https://images.unsplash.com/photo-1591608971362-f7e0d3a4b1b9?w=400&h=300&fit=crop", description: "Nutritious seed blend for parrots, finches, and budgies.", rating: 4.2, featured: false },
  { id: "p18", name: "Aquarium Fish Flakes (200g)", category: "Bird & Fish Supplies", price: 150, image: "https://images.unsplash.com/photo-1524704654690-b56c06c063f4?w=400&h=300&fit=crop", description: "Complete nutrition flakes for tropical and goldfish.", rating: 4.0, featured: false },
]