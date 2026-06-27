export interface ClinicInfo {
  name: string
  tagline: string
  shortDescription: string
  phone: string
  secondaryPhones: string[]
  whatsapp: string
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
  }[]
  social: {
    facebook: string
    instagram: string
  }
  mapEmbedUrl: string
}

export const clinicInfo: ClinicInfo = {
  name: "Vizag Animal Hospital & Store",
  tagline: "Compassionate Care for Your Furry Family",
  shortDescription:
    "A full-service veterinary hospital and pet store in Visakhapatnam providing compassionate care, advanced treatment, and quality pet products.",
  phone: "+91 90141 76278",
  secondaryPhones: ["+91 89131 01472", "+91 89131 00322"],
  whatsapp: "+91 90141 76278",
  address: {
    line1: "D.No: 3-72, HIG-120",
    line2: "Near Registrar Office, Chandrampalem, Midhilapuri VUDA Colony, Madhurawada",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    pincode: "530041",
    full: "D.No: 3-72, HIG-120, Near Registrar Office, Chandrampalem, Midhilapuri VUDA Colony, Madhurawada, Visakhapatnam, Andhra Pradesh 530041",
  },
  hours: [
    { day: "Monday", hours: "9:00 AM – 9:30 PM" },
    { day: "Tuesday", hours: "9:00 AM – 9:30 PM" },
    { day: "Wednesday", hours: "9:00 AM – 9:30 PM" },
    { day: "Thursday", hours: "9:00 AM – 9:30 PM" },
    { day: "Friday", hours: "9:00 AM – 9:30 PM" },
    { day: "Saturday", hours: "9:00 AM – 9:30 PM" },
    { day: "Sunday", hours: "9:00 AM – 5:00 PM" },
  ],
  social: {
    facebook: "https://facebook.com/vizaganimalhospital",
    instagram: "https://instagram.com/vizaganimalhospital",
  },
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Vizag+Animal+Hospital+%26+Store&center=17.8035434,83.3616168&z=14&output=embed",
}