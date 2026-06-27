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
    ownerName: "Ajay Reddy",
    petName: "",
    petType: "",
    rating: 5,
    text: "Recently my puppy is affected with parvo virus and I reach out to the vizag animal hospital and my pet is fully healthy now thanks to Dr.poojitha and dr.mounika for saving my dog's life.",
    date: "2026-06-27",
    service: "Critical Care",
  },
  {
    id: "t2",
    ownerName: "Naumene Suraparaj Karlapalem",
    petName: "",
    petType: "",
    rating: 5,
    text: "Dr Kannayya Naidu is the best Vet I've ever found. I've left Visakhapatnam in the year 2014. It's been a decade. But, if I ever have an issue with my pet, it's Dr Naidu who's the first person to go to. You'll never regret going to him.",
    date: "2026-06-27",
    service: "General Consultation",
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