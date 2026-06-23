export interface FAQItem {
  question: string
  answer: string
  category: string
}

export const faqCategories = [
  "Appointments",
  "Services & Treatment",
  "Pet Store",
  "Billing & Insurance",
]

export const faqs: FAQItem[] = [
  {
    category: "Appointments",
    question: "How do I book an appointment at Vizag Animal Hospital?",
    answer: "You can book an appointment in three ways: 1) Use our online booking form on the Book Appointment page. 2) Call us at +91 90141 76278 during clinic hours. 3) Walk in and our reception desk will schedule the next available slot. We recommend booking in advance for non-emergency visits.",
  },
  {
    category: "Appointments",
    question: "Do I need to bring anything for my first visit?",
    answer: "For your first visit, please bring: your pet's previous vaccination records (if any), any medical history from other vets, a list of current medications, and a fresh stool sample if your pet has digestive issues. For dogs, please bring them on a leash. For cats, a carrier is mandatory.",
  },
  {
    category: "Appointments",
    question: "How long is a typical appointment?",
    answer: "A general consultation takes about 15-30 minutes. Vaccinations and routine checkups take 15-20 minutes. Surgical procedures and dental cleaning require half-day to full-day stays. Diagnostic procedures like X-ray or ultrasound take 30-60 minutes including preparation.",
  },
  {
    category: "Appointments",
    question: "Can I cancel or reschedule my appointment?",
    answer: "Yes, you can cancel or reschedule by calling us at least 4 hours before your appointment time. There is no cancellation fee. For surgical appointments, we request 24 hours notice so we can offer the slot to another pet in need.",
  },
  {
    category: "Appointments",
    question: "Do you accept walk-ins?",
    answer: "Yes, we accept walk-ins, but appointment holders are given priority. Walk-in wait times vary — expect 30-60 minutes during busy hours. For emergencies, no appointment is needed. Call us at +91 90141 76278 for 24/7 online consultation.",
  },
  {
    category: "Services & Treatment",
    question: "Do you provide 24/7 emergency services?",
    answer: "We provide 24/7 online consultation for emergencies. Our phone line +91 90141 76278 is available round the clock for urgent guidance. For life-threatening emergencies (accidents, poisoning, difficulty breathing), call us immediately and we will guide you on the next steps.",
  },
  {
    category: "Services & Treatment",
    question: "What vaccinations does my pet need?",
    answer: "Core vaccinations for dogs include DHPP (Distemper, Hepatitis, Parainfluenza, Parvovirus) and Rabies. For cats: FVRCP and Rabies. Puppies and kittens need a series of vaccines starting at 6-8 weeks. We provide a personalized vaccination schedule during your first visit. Annual boosters are required for ongoing protection.",
  },
  {
    category: "Services & Treatment",
    question: "Is pet boarding available? What are the requirements?",
    answer: "Pet boarding is coming soon! We are currently setting up our boarding facility. Once available, requirements will include: up-to-date vaccinations, freedom from contagious conditions, and preferably spayed/neutered. We'll announce when boarding is ready. Please contact us for updates.",
  },
  {
    category: "Services & Treatment",
    question: "How often should my pet visit the vet?",
    answer: "Healthy adult pets should visit the vet at least once a year for a wellness checkup. Puppies and kittens need multiple visits for vaccinations (every 3-4 weeks until 16 weeks). Senior pets (7+ years) should visit twice a year. Pets with chronic conditions may need more frequent visits as recommended by the vet.",
  },
  {
    category: "Services & Treatment",
    question: "Do you treat exotic pets like birds and rabbits?",
    answer: "Yes, our veterinarians have experience treating birds (parrots, finches, poultry), rabbits, guinea pigs, and reptiles. We provide general consultations, vaccinations (where applicable), and basic surgical procedures for exotic pets. For specialized exotic pet surgery, we can refer you to partner specialists.",
  },
  {
    category: "Services & Treatment",
    question: "Do you offer pet grooming services?",
    answer: "Yes, we offer full grooming services including breed-specific haircuts, medicated baths, nail trimming, ear cleaning, teeth brushing, and anal gland expression. We also offer specialized skin care and management. Grooming is by appointment only. Book through our website or call us.",
  },
  {
    category: "Pet Store",
    question: "What products are available at your pet store?",
    answer: "Our pet store stocks: dog and cat food (Pedigree, Royal Canin, Hills, Drools, and more), pet accessories (collars, leashes, bowls, beds), toys, grooming products (shampoos, brushes), supplements (vitamins, joint care), medicines (dewormers, tick/flea treatments), and bird & fish supplies. Visit our store for the full range.",
  },
  {
    category: "Pet Store",
    question: "Can I order pet food online from your store?",
    answer: "Currently, online ordering is not available. However, you can call us at +91 90141 76278 to check availability and reserve products for pickup. We offer home delivery within Vizag city limits for orders above ₹1,000 (delivery charge ₹50). This service is available Monday-Saturday.",
  },
  {
    category: "Pet Store",
    question: "Do you stock prescription diets?",
    answer: "Yes, we stock prescription diets from Royal Canin and Hills for various health conditions: kidney disease, liver problems, diabetes, food allergies, urinary tract issues, and weight management. These are sold only with a veterinarian's prescription. We can also order specific diets on request.",
  },
  {
    category: "Billing & Insurance",
    question: "What payment methods do you accept?",
    answer: "We accept cash, UPI (Google Pay, PhonePe, Paytm), debit cards, credit cards, and bank transfers. For surgical procedures costing above ₹5,000, we offer EMI options through selected banks. Please ask at the reception for details.",
  },
  {
    category: "Billing & Insurance",
    question: "Do you offer any discounts?",
    answer: "Yes! We offer: 10% senior citizen discount (60+), 10% discount for multi-pet households, 15% off on annual wellness packages, 20% off dental cleaning during February (Dental Health Month), and special monsoon grooming discounts. Follow our social media for seasonal offers.",
  },
  {
    category: "Billing & Insurance",
    question: "Do you accept pet insurance?",
    answer: "We work with most major pet insurance providers in India (Bajaj Allianz, Future Generali, New India Assurance). We provide detailed invoices and medical records for insurance claims. Please note: payment is required at the time of service, and you file the claim with your insurer for reimbursement.",
  },
  {
    category: "Billing & Insurance",
    question: "Are there any packages for routine care?",
    answer: "Yes, we offer annual wellness packages: Puppy/Kitten Package (₹3,500 — includes all vaccinations, 4 consultations, deworming), Adult Wellness Package (₹2,000 — annual checkup, vaccination, blood test, dental check), and Senior Care Package (₹4,000 — twice-yearly checkups, blood work, urinalysis). Package holders get 15% off additional services.",
  },
]