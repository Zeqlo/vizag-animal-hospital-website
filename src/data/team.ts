export interface TeamMember {
  id: string
  name: string
  qualifications: string
  specialization: string
  bio: string
  image: string
  role: "veterinarian" | "support"
}

export const teamMembers: TeamMember[] = [
  {
    id: "dr-vani",
    name: "Dr. P. Vani",
    qualifications: "B.V.Sc & AH, DVM",
    specialization: "Veterinarian",
    bio: "Dr. P. Vani is a compassionate and experienced veterinarian dedicated to small animal medicine. With a strong educational background in veterinary science and clinical training, she provides thorough diagnostics, preventive care, and personalized treatment plans for every pet that walks through the door.",
    image: "/team/dr-vani.jpg",
    role: "veterinarian",
  },
  {
    id: "dr-mounika",
    name: "Dr. K. Mounika",
    qualifications: "BVSc. & AH, M.V.Sc",
    specialization: "Veterinarian",
    bio: "Dr. K. Mounika is a dedicated veterinarian committed to providing compassionate and comprehensive care for pets. With a strong foundation in veterinary science, she handles general consultations, vaccinations, and critical care management for both small and large animals.",
    image: "/team/dr-mounika.jpg",
    role: "veterinarian",
  },
  {
    id: "hembabu",
    name: "Hembabu Singha",
    qualifications: "Veterinary Polytechnic",
    specialization: "Groomer",
    bio: "Hembabu is our skilled pet groomer with a gentle touch and a keen eye for detail. He specializes in puppy cuts, breed-specific grooming, medicated baths, and stress-free grooming sessions, ensuring every pet leaves looking and feeling their best.",
    image: "/team/hembabu.jpg",
    role: "support",
  },
  {
    id: "swetha",
    name: "Swetha",
    qualifications: "Veterinary Polytechnic",
    specialization: "Veterinary Assistant",
    bio: "Swetha assists the veterinarians during consultations, procedures, and daily care routines. Her calm demeanor and genuine love for animals help keep pets relaxed and well looked after at Vizag Animal Hospital.",
    image: "/team/swetha.jpg",
    role: "support",
  },
  {
    id: "swathi",
    name: "Swathi",
    qualifications: "Veterinary Polytechnic",
    specialization: "Veterinary Assistant",
    bio: "Swathi supports the clinical team with examinations, treatment preparation, and pet handling. She is attentive, caring, and always ready to make every pet's visit as comfortable as possible.",
    image: "/team/swathi.jpg",
    role: "support",
  },
  {
    id: "madhavi",
    name: "Madhavi",
    qualifications: "Veterinary Polytechnic",
    specialization: "Veterinary Assistant & Front Desk",
    bio: "Madhavi is the friendly face that greets you and your pet at Vizag Animal Hospital. She manages appointments, assists the veterinarians during consultations, and ensures every visit runs smoothly.",
    image: "/team/placeholder.svg",
    role: "support",
  },
]
