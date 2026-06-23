export interface TeamMember {
  id: string
  name: string
  qualifications: string
  specialization: string
  experience: number
  bio: string
  image: string
  role: "veterinarian" | "support"
  social?: {
    email?: string
    linkedin?: string
  }
}

export const teamMembers: TeamMember[] = [
  {
    id: "dr-mounika",
    name: "Dr. K. Mounika",
    qualifications: "BVSc. & AH",
    specialization: "Veterinarian",
    experience: 8,
    bio: "Dr. K. Mounika is a dedicated veterinarian committed to providing compassionate and comprehensive care for pets. With a strong foundation in veterinary science, she handles general consultations, vaccinations, and critical care management for both small and large animals.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    role: "veterinarian",
  },
  {
    id: "dr-santosh",
    name: "Dr. B. Santosh Kumar",
    qualifications: "BVSc. & AH, PG DLAS & DAW",
    specialization: "Veterinarian",
    experience: 12,
    bio: "Dr. B. Santosh Kumar brings advanced expertise with postgraduate diplomas in Laboratory Animal Science (DLAS) and Animal Welfare (DAW). He specializes in surgeries — both soft tissue and orthopedic — as well as in-house diagnostics and critical care management.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a510a9?w=400&h=400&fit=crop",
    role: "veterinarian",
  },
  {
    id: "coming-soon-1",
    name: "Coming Soon",
    qualifications: "",
    specialization: "Support Staff",
    experience: 0,
    bio: "We are expanding our team. Stay tuned for updates as we welcome new members to the Vizag Animal Hospital family.",
    image: "",
    role: "support",
  },
  {
    id: "coming-soon-2",
    name: "Coming Soon",
    qualifications: "",
    specialization: "Support Staff",
    experience: 0,
    bio: "We are expanding our team. Stay tuned for updates as we welcome new members to the Vizag Animal Hospital family.",
    image: "",
    role: "support",
  },
]