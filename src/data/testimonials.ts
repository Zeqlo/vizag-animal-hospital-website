export interface Testimonial {
  id: string
  ownerName: string
  petName: string
  petType: string
  rating: number
  text: string
  date: string
  service: string
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    ownerName: "Venkat Rao",
    petName: "Bruno",
    petType: "Dog (Labrador)",
    rating: 5,
    text: "Dr. Ramesh and his team saved my Bruno when he had a severe stomach infection. They were compassionate and professional. Bruno is back to his playful self!",
    date: "2025-04-15",
    service: "Critical Care & Management",
  },
  {
    id: "t2",
    ownerName: "Priyanka Reddy",
    petName: "Whiskers",
    petType: "Cat (Persian)",
    rating: 5,
    text: "The grooming service here is excellent! Lakshmi is so gentle with my Persian cat. Whiskers came out looking like a show cat — beautiful coat, clean ears, trimmed nails. The whole experience was stress-free for my fur baby.",
    date: "2025-03-28",
    service: "Pet Grooming & Bathing",
  },
  {
    id: "t3",
    ownerName: "Sai Krishna",
    petName: "Sheru",
    petType: "Dog (German Shepherd)",
    rating: 5,
    text: "Took Sheru for his annual vaccination and health checkup. Dr. Mounika was thorough and explained everything about his diet and exercise needs. The clinic is clean, modern, and the staff are friendly. Highly recommend Vizag Animal Hospital!",
    date: "2025-05-02",
    service: "General Consultation & Health Checkups",
  },
  {
    id: "t4",
    ownerName: "Anusha Murthy",
    petName: "Coco",
    petType: "Dog (Pomeranian)",
    rating: 4,
    text: "I left Coco at the boarding facility when we went on a family trip for a week. The staff took great care — sent me daily photos and updates. The CCTV monitoring gave me peace of mind. Coco was happy and healthy when we picked him up.",
    date: "2025-02-18",
    service: "Pet Boarding & Daycare",
  },
  {
    id: "t5",
    ownerName: "Ravi Teja",
    petName: "Tiger",
    petType: "Cat (Mixed)",
    rating: 5,
    text: "Dr. Krishna performed a surgery to remove a tumor from Tiger. The procedure went smoothly and the post-operative care was fantastic. The entire team was supportive and kept me informed. Tiger recovered fully within two weeks.",
    date: "2025-01-22",
    service: "Surgery",
  },
  {
    id: "t6",
    ownerName: "Sneha Gupta",
    petName: "Oscar",
    petType: "Dog (Beagle)",
    rating: 5,
    text: "Best veterinary clinic in Vizag! The in-house lab meant we got Oscar's blood test results within an hour. The doctor diagnosed and treated him on the same visit. Very efficient and reasonably priced compared to other clinics.",
    date: "2025-05-10",
    service: "Diagnostic Lab & Imaging",
  },
  {
    id: "t7",
    ownerName: "Mahesh Babu",
    petName: "Mango",
    petType: "Bird (African Grey Parrot)",
    rating: 5,
    text: "Not many vets in Vizag treat birds, but Dr. Ramesh has experience with exotic pets. He treated Mango's respiratory infection and also guided me on proper diet and cage setup. The pet store has great bird supplies too!",
    date: "2025-04-05",
    service: "General Consultation & Health Checkups",
  },
  {
    id: "t8",
    ownerName: "Jhansi Lakshmi",
    petName: "Luna",
    petType: "Cat (Siamese)",
    rating: 5,
    text: "Dental cleaning for Luna was done so professionally. They showed me before and after photos of her teeth. The difference was amazing! Luna is eating better and her bad breath is gone. Thank you Vizag Animal Hospital team!",
    date: "2025-03-12",
    service: "Dental Care",
  },
  {
    id: "t9",
    ownerName: "Gopala Krishna",
    petName: "Rocky",
    petType: "Dog (Rottweiler)",
    rating: 5,
    text: "I buy all of Rocky's food and supplements from the Vizag Animal Hospital pet store. They stock genuine brands at fair prices. The staff help me choose the right products based on Rocky's age and size. Very convenient to have the store right at the clinic.",
    date: "2025-05-18",
    service: "Pet Store",
  },
]