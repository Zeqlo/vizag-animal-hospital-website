export interface ClinicInfo {
  name: string
  tagline: string
  shortDescription: string
  phone: string
  secondaryPhones: string[]
  emergencyPhone: string
  whatsapp: string
  email: string
  address: {
    line1: string
    line2: string
    city: string
    state: string
    pincode: string
    full: string
  }
  hours: {
    day: string
    hours: string
    emergency: boolean
  }[]
  social: {
    facebook: string
    instagram: string
  }
  mapEmbedUrl: string
  established: number
  stats: {
    yearsExperience: number
    petsTreated: number
    happyClients: number
    services: number
  }
}

export const clinicInfo: ClinicInfo = {
  name: "Vizag Animal Hospital & Store",
  tagline: "Compassionate Care for Your Furry Family",
  shortDescription:
    "A full-service veterinary hospital and pet store in Visakhapatnam providing compassionate care, advanced treatment, and quality pet products.",
  phone: "+91 90141 76278",
  secondaryPhones: ["+91 89131 01472", "+91 89131 00322"],
  emergencyPhone: "+91 90141 76278",
  whatsapp: "+91 90141 76278",
  email: "vizaganimalhospital@gmail.com", // Placeholder — update with real email when available
  address: {
    line1: "D.No. 3-72, Flat No. HIG-120",
    line2: "Near Registrar Office, Midhilapuri VUDA Colony, Madhurawada",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    pincode: "530045",
    full: "D.No. 3-72, Flat No. HIG-120, Near Registrar Office, Midhilapuri VUDA Colony, Madhurawada, Visakhapatnam, Andhra Pradesh – 530 045",
  },
  hours: [
    { day: "Monday", hours: "9:00 AM – 9:30 PM", emergency: false },
    { day: "Tuesday", hours: "9:00 AM – 9:30 PM", emergency: false },
    { day: "Wednesday", hours: "9:00 AM – 9:30 PM", emergency: false },
    { day: "Thursday", hours: "9:00 AM – 9:30 PM", emergency: false },
    { day: "Friday", hours: "9:00 AM – 9:30 PM", emergency: false },
    { day: "Saturday", hours: "9:00 AM – 9:30 PM", emergency: false },
    { day: "Sunday", hours: "9:00 AM – 5:00 PM", emergency: false },
    { day: "Emergency", hours: "24/7 Online Consultation Only", emergency: true },
  ],
  social: {
    facebook: "https://facebook.com/vizaganimalhospital",
    instagram: "https://instagram.com/vizaganimalhospital",
  },
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Midhilapuri%20VUDA%20Colony%2C%20Madhurawada%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530045&t=&z=15&ie=UTF8&iwloc=&output=embed",
  established: 2015,
  stats: {
    yearsExperience: 10,
    petsTreated: 15000,
    happyClients: 8000,
    services: 9,
  },
}