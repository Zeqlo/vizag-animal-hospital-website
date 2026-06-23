export interface Service {
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  icon: string
  features: string[]
  category: "veterinary" | "grooming" | "boarding"
  featured: boolean
  comingSoon?: boolean
}

export const services: Service[] = [
  {
    slug: "vaccinations-deworming",
    title: "Vaccinations & Deworming",
    shortDescription: "Complete vaccination and deworming programs for puppies, kittens, and adult pets.",
    longDescription:
      "We follow international vaccination protocols to protect your pets against common diseases. From core vaccines like Rabies, DHPP, and FVRCP to non-core vaccines based on lifestyle and risk factors, we ensure your pet stays protected. Regular deworming is also essential to keep your pet free from internal parasites.",
    icon: "Syringe",
    features: [
      "Puppy & kitten vaccination schedules",
      "Annual booster shots",
      "Rabies vaccination (mandatory)",
      "Titre testing available",
      "Vaccination records maintained",
      "Reminder system for next dose",
      "Routine deworming protocols",
      "Parasite prevention guidance",
    ],
    category: "veterinary",
    featured: true,
  },
  {
    slug: "critical-care",
    title: "Critical Care & Management",
    shortDescription: "Expert critical care and management for both small and large animals.",
    longDescription:
      "Our critical care and management service covers urgent medical situations for both small and large animals. From trauma and poisoning to sudden illness and post-surgical monitoring, our experienced team provides timely and effective care. We also offer 24/7 online consultation for emergencies.",
    icon: "Siren",
    features: [
      "Trauma & accident care",
      "Poisoning treatment",
      "ICU monitoring",
      "Oxygen therapy",
      "Intravenous fluid therapy",
      "Small & large animal management",
      "Post-surgical critical care",
    ],
    category: "veterinary",
    featured: true,
  },
  {
    slug: "surgeries",
    title: "All Types of Surgeries",
    shortDescription: "Advanced surgical procedures including soft tissue and orthopedic surgeries.",
    longDescription:
      "Our surgical suite is equipped for all types of surgeries — from routine spay/neuter to complex soft tissue and orthopedic procedures. Our skilled surgical team ensures the highest standards of safety, using modern anesthesia monitoring and sterilization systems for every procedure.",
    icon: "Scissors",
    features: [
      "Spay & neuter surgeries",
      "Tumor & lump removal",
      "Fracture repair & orthopedic surgery",
      "Soft tissue surgery",
      "Pre-surgical blood work",
      "Post-operative care & monitoring",
      "Modern anesthesia & monitoring",
    ],
    category: "veterinary",
    featured: true,
  },
  {
    slug: "grooming-spa",
    title: "Grooming & Spa",
    shortDescription: "Professional grooming, bathing, trimming, and spa treatments for your pets.",
    longDescription:
      "Our grooming and spa service provides full-service grooming including breed-specific haircuts, medicated baths, nail trimming, ear cleaning, and anal gland expression. We use premium, pet-safe products and ensure a stress-free, relaxing experience for your pet.",
    icon: "Scissors",
    features: [
      "Breed-specific haircuts",
      "Medicated & de-tick baths",
      "Nail trimming & filing",
      "Ear cleaning",
      "Teeth brushing",
      "Anal gland expression",
      "Spa treatments for relaxation",
    ],
    category: "grooming",
    featured: true,
  },
  {
    slug: "nail-skin-care",
    title: "Nail Care, Skin Care & Management",
    shortDescription: "Comprehensive nail and skin care including treatment for skin conditions and allergies.",
    longDescription:
      "Healthy skin and nails are essential for your pet's overall wellbeing. We offer comprehensive nail care services and specialized skin care management, including treatment for allergies, infections, hot spots, and coat health. Our approach combines medical treatment with grooming for long-term results.",
    icon: "Sparkles",
    features: [
      "Professional nail trimming & filing",
      "Skin condition diagnosis & treatment",
      "Allergy management",
      "Hot spot treatment",
      "Fungal & bacterial skin infection care",
      "Coat health evaluation",
      "Medicated baths for skin conditions",
    ],
    category: "grooming",
    featured: true,
  },
  {
    slug: "puppy-adult-care",
    title: "Puppy & Adult Dog Care & Management",
    shortDescription: "Comprehensive care and management for puppies and adult dogs at every life stage.",
    longDescription:
      "From the early days of puppyhood through the senior years, we provide complete care and management for your dog. This includes growth monitoring, nutrition planning, vaccination schedules, behavior guidance, and preventive health measures tailored to your dog's age, breed, and lifestyle.",
    icon: "PawPrint",
    features: [
      "Puppy health & growth monitoring",
      "Nutrition & diet planning",
      "Vaccination schedule management",
      "Behavior & training guidance",
      "Adult dog wellness checkups",
      "Preventive health measures",
      "Breed-specific care advice",
    ],
    category: "veterinary",
    featured: true,
  },
  {
    slug: "radiology-blood-tests",
    title: "In-house Radiology & Blood Tests",
    shortDescription: "In-house diagnostic services including X-ray, ultrasound, echo, and blood tests.",
    longDescription:
      "Our in-house diagnostic facility provides quick and accurate results. With digital X-ray, ultrasound scanning, echo, blood analyzers, and microscopy, we can diagnose conditions rapidly and start treatment without delay. Having these services in-house means faster diagnosis and better outcomes for your pet.",
    icon: "Microscope",
    features: [
      "Complete blood count (CBC)",
      "Blood chemistry panel",
      "Digital X-ray imaging",
      "Ultrasound scanning",
      "Echo (Echocardiography)",
      "Urine & stool analysis",
      "Skin scraping & cytology",
    ],
    category: "veterinary",
    featured: true,
  },
  {
    slug: "doorstep-services",
    title: "Door Step Services",
    shortDescription: "Home visit and doorstep consultations for your convenience.",
    longDescription:
      "We understand that bringing your pet to the clinic isn't always easy. Our door step services bring veterinary care directly to your home. Whether it's a routine checkup, vaccination, or a consultation for a pet that's difficult to transport, our team will visit you and provide quality care in the comfort of your home.",
    icon: "Home",
    features: [
      "Home visit consultations",
      "At-home vaccinations",
      "Pet health checkups at your doorstep",
      "Convenient for senior or anxious pets",
      "Follow-up visits at home",
      "Flexible scheduling",
    ],
    category: "veterinary",
    featured: true,
  },
  {
    slug: "pet-boarding",
    title: "Pet Boarding & Daycare",
    shortDescription: "Safe, comfortable boarding and daycare for your pets — coming soon!",
    longDescription:
      "We are working on setting up a safe, clean, and loving pet boarding facility. With spacious enclosures, regular walks, playtime, and dedicated staff, your pet will feel at home. This service is coming soon — please contact us for updates.",
    icon: "Home",
    features: [
      "Spacious, clean enclosures (coming soon)",
      "Daily exercise & playtime (coming soon)",
      "Regular feeding & medication (coming soon)",
      "AC boarding rooms (coming soon)",
      "Daycare available (coming soon)",
    ],
    category: "boarding",
    featured: false,
    comingSoon: true,
  },
]

export const featuredServices = services.filter((s) => s.featured)