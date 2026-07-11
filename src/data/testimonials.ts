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
    ownerName: "SREELEKHA MADIRi",
    petName: "",
    petType: "",
    rating: 5,
    text: "Providing best services...good staff..Dr.Mounika is doing her best in treating pets.",
    date: "2026-06-27",
    service: "General Consultation",
  },
  {
    id: "t2",
    ownerName: "Jogesh Yadav",
    petName: "",
    petType: "",
    rating: 5,
    text: "Dr.Mounika was very polite and very friendly with pets and pet owners, and completely giving humble advises to take care about pets.",
    date: "2026-06-27",
    service: "Pet Treatment",
  },
  {
    id: "t3",
    ownerName: "Mahesh Bonigi",
    petName: "",
    petType: "",
    rating: 5,
    text: "Definitely recommend this clinic for any pet treatment. The services provided are excellent and reasonably priced. They listen and enquire to have an in depth analysis of our pet and give the best suggestion and treatment.",
    date: "2026-06-27",
    service: "Pet Treatment",
  },
]
