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
    name: "Dr. Vani Poosapati",
    qualifications: "DVM",
    specialization: "Veterinarian",
    bio: "Dr. Vani Poosapati is a compassionate and experienced veterinarian with over 10 years of practice in small animal medicine. She graduated from vet school in India in 2000, moved to the United States in 2001, and completed her clinical year at Purdue University in 2004. A member of AVMA and VIN, she enjoys reading, watching movies, and spending time with her family — including her son Arvin and her four-legged son Vinnie.",
    image: "https://images.unsplash.com/photo-1648302810893-c2e4a2f7d3e8?w=400&h=400&fit=crop",
    role: "veterinarian",
  },
  {
    id: "dr-mounika",
    name: "Dr. K. Mounika",
    qualifications: "BVSc. & AH, M.V.Sc",
    specialization: "Veterinarian",
    bio: "Dr. K. Mounika is a dedicated veterinarian committed to providing compassionate and comprehensive care for pets. With a strong foundation in veterinary science, she handles general consultations, vaccinations, and critical care management for both small and large animals.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    role: "veterinarian",
  },
  {
    id: "madhavi",
    name: "Madhavi",
    qualifications: "",
    specialization: "Veterinary Assistant & Front Desk",
    bio: "Madhavi is the friendly face that greets you and your pet at Vizag Animal Hospital. She manages appointments, assists the veterinarians during consultations, and ensures every visit runs smoothly. With a genuine love for animals and years of experience in pet care, she makes sure both pets and their owners feel comfortable and well cared for.",
    image: "https://images.unsplash.com/photo-1632761617501-0f1f3f647ce2?w=400&h=400&fit=crop",
    role: "support",
  },
  {
    id: "ravi",
    name: "Ravi Kumar",
    qualifications: "",
    specialization: "Groomer & Pet Care Specialist",
    bio: "Ravi is our skilled pet groomer with a gentle touch and a keen eye for detail. Specializing in breed-specific haircuts, medicated baths, and stress-free grooming sessions, he ensures every pet leaves looking and feeling their best. His calm, patient approach makes even anxious pets feel at ease.",
    image: "https://images.unsplash.com/photo-1612531386530-9b86d9d68bb2?w=400&h=400&fit=crop",
    role: "support",
  },
]