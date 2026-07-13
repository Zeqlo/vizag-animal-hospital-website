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
  mapLink: string
  geo: {
    latitude: number
    longitude: number
  }
  url: string
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
    { day: "Sunday", hours: "9:00 AM – 2:00 PM, 5:00 PM – 9:30 PM" },
  ],
  social: {
    facebook: "https://facebook.com/vizaganimalhospital",
    instagram: "https://instagram.com/vizaganimalhospital",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30389.982864370955!2d83.32350797431637!3d17.80354339999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395b688b1fd56f%3A0x6b0d4ee62d518b3e!2sVizag%20Animal%20Hospital%20%26%20Store!5e0!3m2!1sen!2sus!4v1783853495214!5m2!1sen!2sus",
  mapLink:
    "https://maps.app.goo.gl/4TpLGbDUviYbmw9s8",
  geo: {
    latitude: 17.8035,
    longitude: 83.3506,
  },
  url: "https://vizag-animal-hospital.in",
}